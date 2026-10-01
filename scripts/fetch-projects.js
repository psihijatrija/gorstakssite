#!/usr/bin/env node
/**
 * Fetches GitHub repos and release info, writes projects.json.
 * Uses GITHUB_TOKEN for authenticated requests (higher rate limit).
 * Reads config from repos.json.
 */

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', 'repos.json');
const OUT_PATH = path.join(__dirname, '..', 'projects.json');

async function fetchJson(url, token) {
  const headers = { 'Accept': 'application/vnd.github.v3+json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function main() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (!token) {
    console.error('GITHUB_TOKEN or GH_TOKEN env var required');
    process.exit(1);
  }

  let config = { users: ['CroatiaSecurity'], onlyRepos: null, excludeRepos: null };
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
    const data = JSON.parse(raw);
    if (Array.isArray(data.users) && data.users.length) config.users = data.users;
    if (data.onlyRepos != null) config.onlyRepos = Array.isArray(data.onlyRepos) ? data.onlyRepos : null;
    if (data.excludeRepos != null) config.excludeRepos = Array.isArray(data.excludeRepos) ? data.excludeRepos : null;
  } catch (e) {
    console.warn('Using default config:', e.message);
  }

  const all = [];
  for (const user of config.users) {
    let page = 1;
    let repos;
    do {
      const url = `https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&sort=updated&page=${page}`;
      repos = await fetchJson(url, token);
      repos.filter(r => !r.fork).forEach(r => all.push(r));
      page++;
    } while (repos.length === 100);
  }

  const byFullName = {};
  all.forEach(r => { byFullName[r.full_name] = r; });
  let repos = Object.values(byFullName);

  if (config.onlyRepos?.length) {
    const set = new Set(config.onlyRepos.map(s => s.toLowerCase()));
    repos = repos.filter(r => set.has(r.full_name.toLowerCase()));
  }
  if (config.excludeRepos?.length) {
    const set = new Set(config.excludeRepos.map(s => s.toLowerCase()));
    repos = repos.filter(r => !set.has(r.full_name.toLowerCase()));
  }

  repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  // Fetch release info in batches
  const batch = 8;
  for (let i = 0; i < repos.length; i += batch) {
    const chunk = repos.slice(i, i + batch);
    await Promise.all(chunk.map(async (r) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${r.full_name}/releases/latest`, {
          headers: { 'Accept': 'application/vnd.github.v3+json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) }
        });
        if (res.ok) {
          const rel = await res.json();
          r.latestReleaseUrl = rel.html_url || null;
        } else {
          r.latestReleaseUrl = null;
        }
      } catch (_) {
        r.latestReleaseUrl = null;
      }
    }));
  }

  const output = repos.map(r => ({
    full_name: r.full_name,
    name: r.name,
    description: r.description,
    language: r.language,
    updated_at: r.updated_at,
    size: r.size,
    default_branch: r.default_branch,
    latestReleaseUrl: r.latestReleaseUrl
  }));

  fs.writeFileSync(OUT_PATH, JSON.stringify(output, null, 2), 'utf8');
  console.log(`Wrote ${output.length} projects to ${OUT_PATH}`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
