# GIDE v1.0.0
**Gorstak's IDE** - a free, fully local AI coding assistant for Windows, built on .NET 4.8.

GIDE runs entirely on your machine using [llama.cpp](https://github.com/ggml-org/llama.cpp) and Qwen3 models. No cloud, no API keys, no usage limits. Point it at a project folder, describe what you want, and it writes code directly into your files.

---

## Features

- **100% local** - no API keys, no internet required after setup, no data leaves your machine.
- **Auto-downloads llama.cpp** - always fetches the latest release from GitHub automatically.
- **GPU acceleration** - CUDA (NVIDIA), Vulkan (AMD/Intel), or CPU-only - detected and configured automatically.
- **Qwen3 model support** - choose from 4B, 8B, 14B, or 30B A3B models depending on your hardware.
- **Hardware-aware** - detects RAM, CPU cores, and GPU (NVIDIA/AMD/Intel) to pick the optimal model and backend.
- **Smart GPU offloading** - calculates optimal layer count based on VRAM vs model size for partial offload.
- **Auto port selection** - finds a free port automatically, no manual configuration needed.
- **Writes code directly** - model outputs are parsed and executed as file writes, not just displayed.
- **Confirmation before writing** - shows exactly what files will be created/modified/deleted before applying.
- **Partial edits (PATCH)** - small changes don't require rewriting entire files, saving tokens and time.
- **Auto-nudge** - if the model shows code without writing it, GIDE automatically asks it to write to disk.
- **Project-aware** - reads all source and documentation files in your project for full context.
- **Conversation memory** - full chat history is sent to the model and persisted to disk.
- **Bottom-docked prompt** - input stays at the bottom, giving AI responses maximum vertical space.
- **Chrome-dark theme** - clean dark UI with Mica backdrop (Win11) and region-clipped rounded buttons.
- **Project browser** - open a folder and GIDE will scan and provide context about your codebase.
- **Context menu integration** - right-click any folder in Explorer and choose "Run GIDE here".
- **Self-healing dependencies** - auto-detects and installs missing VC++ Redistributable at runtime.
- **Live status feedback** - status bar shows real-time progress during engine downloads and model loading.

---

## Requirements

- Windows 10 or later (64-bit)
- [.NET Framework 4.8](https://dotnet.microsoft.com/en-us/download/dotnet-framework/net48) (pre-installed on Windows 10/11)
- Free disk space for models:
  - Qwen3 4B: ~2.5 GB
  - Qwen3 8B: ~5 GB
  - Qwen3 14B: ~9 GB *(recommended)*
  - Qwen3 30B A3B: ~18.6 GB
- RAM: 4 GB minimum, 16 GB recommended for 14B model
- Internet connection on first launch (to download llama.cpp and chosen model)

---

## Installation

### Option A - Installer (recommended)
Download `GIDE-Setup-1.0.0.exe` from the [releases page](https://github.com/psihijatrija/GIDE/releases) and run it.

The installer:
- Installs GIDE to `Program Files\GIDE`
- Downloads and installs the Visual C++ Redistributable if missing (required by llama.cpp)
- Adds "Run GIDE here" to the folder right-click context menu
- Creates Start Menu and optional desktop shortcuts

### Option B - Build from source
```
git clone https://github.com/psihijatrija/GIDE
cd GIDE
build.cmd
```
The compiled binary lands at `dist\GIDE.exe`.

Requires the .NET Framework 4.8 SDK / `csc.exe` (included with Visual Studio or the [.NET 4.8 Developer Pack](https://dotnet.microsoft.com/en-us/download/dotnet-framework/net48)).

---

## First Launch

On first launch GIDE will automatically:
1. Detect your GPU (NVIDIA -> CUDA, AMD/Intel -> Vulkan, none -> CPU)
2. Download the matching llama.cpp build from GitHub (~30-400 MB depending on backend)
3. Check and install the Visual C++ Redistributable if missing
4. Prompt you to select and download a Qwen3 model
5. Start the local inference server and begin responding

Progress is shown in the status bar throughout. This is a one-time setup - subsequent launches start instantly with no internet needed.

---

## Model Selection

Use the dropdown in the top-right corner to select a model. The recommended model for your hardware is pre-selected.

| Model | Size | RAM Required |
|---|---|---|
| Qwen3 4B | ~2.5 GB | 4 GB |
| Qwen3 8B | ~5 GB | 8 GB |
| Qwen3 14B *(recommended)* | ~9 GB | 16 GB |
| Qwen3 30B A3B | ~18.6 GB | 32 GB / 12 GB VRAM |

Click **Download** to download a model. Progress is shown in the status bar.

---

## How it works

1. GIDE starts a local `llama-server` process (llama.cpp) with your selected model.
2. Your messages are sent to the local server via the OpenAI-compatible `/v1/chat/completions` API.
3. The model generates a response locally (timeout: 30 minutes for large contexts).
4. Tool calls (`<<<TOOL:WRITE>>>`, `<<<TOOL:PATCH>>>`, `<<<TOOL:DELETE>>>`, `<<<TOOL:RENAME>>>`, `<<<TOOL:RUN>>>`) are parsed from the response.
5. If the model used markdown instead of tool markers, GIDE auto-converts or nudges the model to reformat.
6. A confirmation dialog shows proposed changes - user approves or rejects.
7. Approved changes are written to disk atomically (temp file + rename).
8. Qwen3 `<think>` blocks are automatically stripped from the output.

---

## Tool Reference

| Tool | Purpose | Format |
|------|---------|--------|
| `WRITE` | Create new file or overwrite existing | Path + full content |
| `PATCH` | Edit part of an existing file | Path + OLD text + NEW text |
| `READ` | View file contents | Path |
| `DELETE` | Remove a file or directory | Path |
| `RENAME` | Move or rename a file | Old path + new path |
| `RUN` | Execute a shell command | Command string |
| `LIST` | List directory contents | Path |

The model chooses the right tool automatically. PATCH is used for small edits (saves tokens), WRITE for new files or major rewrites.

---

## Project Context

When you open a folder, GIDE automatically:
- Scans all files recursively (skipping `bin`, `obj`, `node_modules`, `.git`, etc.)
- Reads source and documentation files (blacklist-based: skips binaries, media, archives)
- Includes file contents in the system prompt so the model understands your codebase
- Sends conversation history for multi-turn context

---

## Data & Privacy

- All inference runs locally on your hardware.
- No telemetry, no analytics, no remote logging.
- Models are stored in `%USERPROFILE%\.gide\models\`.
- llama.cpp binaries are stored in `%USERPROFILE%\.gide\bin\`.
- Chat history is saved to `.gide_history.json` in the project folder.

---

## Building the installer

Requires [Inno Setup 6 or 7](https://jrsoftware.org/isinfo.php).

```
build.cmd
```

Output: `releases\1.0.0\GIDE-Setup-1.0.0.exe`

---

## Changelog

### v1.0.0
- **GPU acceleration for all vendors**: NVIDIA (CUDA), AMD (Vulkan), and Intel Arc (Vulkan) GPUs are now auto-detected and used for inference. Previously only NVIDIA CUDA was supported.
- **Smart GPU offloading**: Layer count is calculated proportionally based on available VRAM vs model size instead of blindly offloading everything.
- **Runtime dependency management**: VC++ Redistributable is detected and auto-installed at runtime if missing - no more "Bad Image" DLL errors.
- **PATH sanitization**: Python, Anaconda, and other installations with conflicting `vcruntime140.dll` copies are excluded from the server process PATH.
- **Backend auto-upgrade**: If a CPU-only llama.cpp build is detected on a system with a discrete GPU, GIDE automatically re-downloads the correct GPU build (CUDA or Vulkan).
- **Live status feedback**: GUI status bar now shows real-time progress during engine download, dependency checks, and model loading (with elapsed time).
- **Increased startup timeout**: Model loading timeout increased from 30s to 90s to accommodate large models on partial GPU offload.
- **Installer improvements**: VC++ Redistributable detection uses 5 fallback methods. Download uses 3 fallback methods (curl -> PowerShell -> certutil). Post-install verification with actionable error messages.
- **GUI DLL error dialog**: When llama-server fails with a DLL error, a dialog offers to auto-install the fix or shows manual instructions.
- **Fixed path crash**: "The path is not of a legal form" error when launching from shortcuts or without a project folder is resolved.
- **Context menu in GUI mode**: `--dir` argument is now handled in GUI mode (previously only worked in console mode).
- **Inno Setup 7 support**: Build script auto-detects Inno Setup 6 or 7.

### v0.9.0
- **Confirmation dialog**: All file operations (write, patch, delete, rename) now show a confirmation dialog before executing. Lists each file with [CREATE], [MODIFY], [PATCH], [DELETE], or [RENAME] labels.
- **PATCH tool**: New partial-edit tool for modifying sections of existing files without rewriting the entire file. Three-tier matching: exact -> normalized line endings -> fuzzy (trimmed whitespace). Saves tokens and reduces errors on large files.
- **DELETE tool**: Model can now delete files and directories. Path-escape protection prevents deletion outside the project folder.
- **RENAME tool**: Model can move/rename files. Creates destination directories automatically.
- **Auto-nudge**: When the model shows code in markdown but doesn't write it to disk, GIDE automatically sends a follow-up prompt asking it to emit proper tool markers. No user intervention needed.
- **Improved system prompt**: Stronger instructions with concrete examples. Model is told to NEVER use markdown for code that should be written, to use PATCH for small edits and WRITE for new files, and to figure out filenames from the project structure without user input.
- **Better markdown-to-tool conversion**: Now searches the entire response for mentioned filenames (not just 300 chars before each code block). Falls back to matching code blocks with file paths mentioned anywhere in the response.
- **HasUnwrittenCode detection**: Detects when the model dumped 5+ line code blocks in markdown without writing them, triggering the auto-nudge flow.
- **Fuzzy PATCH matching**: Handles indentation mismatches (model outputs spaces, file has tabs) by comparing trimmed lines.

### v0.8.0
- **Context Window Fix**: Stopped injecting entire project file contents into the prompt, preventing context overflow and improving speed. Added support for `<<<TOOL:READ>>>` instead.
- **Port Assignment Fix**: Resolved port exhaustion by dynamically letting the OS assign ephemeral ports.
- **Markdown Inference Fix**: Fixed ambiguous file overwrites when inferring tool commands from markdown.

### v0.7.0
- **Tool execution in GUI**: Model responses with `<<<TOOL:WRITE>>>` markers or markdown code blocks are now parsed and executed automatically (file creation/editing).
- **Full project context**: System prompt includes actual file contents from the project (not just filenames), with blacklist-based filtering to skip binaries.
- **Conversation memory**: Full chat history is sent to the model for multi-turn context, with smart trimming to fit the context window.
- **History persistence**: Chat is saved to `.gide_history.json` in the project folder, reloaded on next session.
- **30-minute timeout**: HTTP timeout increased to 30 minutes for large context generation on CPU.
- **Better error reporting**: 400/timeout errors from llama-server now show the server's response body for debugging.
- **Recursive file scanning**: Reads all source files in subdirectories (skipping build/binary folders).
- **VC++ Redistributable**: Installer now downloads and installs the Visual C++ Runtime automatically via curl.

### v0.6.0
- **New layout**: Prompt/input moved to the bottom of the window, giving AI responses the full vertical space above.
- **Chrome-dark theme**: Switched from purple/creamy-black to a flat dark palette matching GBrowser.
- **Mica backdrop**: DWM Mica effect with subtle gradient glow for visual depth (Win11 22H2+).
- **Region-clipped buttons**: Rounded buttons use Region clipping, eliminating corner artifacts.
- **Download progress**: Real-time percentage, MB downloaded, and speed shown in status bar text.
- **Fixed model URLs**: All download URLs now point to official Qwen GGUF repos (4B, 8B, 14B, 30B-A3B).

### v0.5.0
- **Tool execution**: GIDE can create, edit, and delete files via `<<<TOOL:WRITE>>>` / `<<<TOOL:RUN>>>` markers in model output.
- **Markdown-to-tool conversion**: Responses with code blocks are auto-converted to file-write operations when a path can be inferred.
- **Model download progress**: Status bar shows percentage + speed during model downloads.
- **Settings form**: Added Tools > Model Manager dialog for managing downloaded models.
- **History manager**: Chat history is persisted across sessions.
- **Improved error reporting**: Model engine failures show detailed diagnostics inline in chat.
- **Context menu installer**: "Run GIDE here" added to Windows Explorer folder context menu.

---

## License

See [LICENSE](LICENSE).
