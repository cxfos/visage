# Visage: Visual Element Inspector for VS Code

**Visage** is a VS Code extension that enables developers to visually inspect and interact with frontend elements, mapping them back to source files and enhancing workflows with AI tools or manual editing.

---

## ✨ Features

- **Live Frontend Preview**  
  Embed a live preview of your React or Next.js app inside VS Code.

- **Element Selection Tool**  
  Click on any UI element to highlight and inspect its source.

- **Source Code Mapping**  
  Automatically locate the file and line range that generated the selected DOM element.

- **Prompt Integration**  
  Seamlessly send selected code to AI tools or use it to inform refactoring.

- **Framework-Aware**  
  Designed for projects using React, Next.js, or similar virtual DOM libraries.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/cxfos/visage.git
cd visage
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Open in VS Code

Launch VS Code and open the extension folder.

### 4. Run the Extension

Press `F5` to open a new Extension Development Host window.

---

## 🔍 Usage Workflow

1. Use the command palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) and run:  
   **"Visage: Open Preview"**

2. Your live app preview will appear in a new tab (e.g., via `localhost:3000`).

3. Click the "element selector" button and choose an element in the preview.

4. Visage will map the clicked element to its source file and highlight the line range.

5. Optionally use the selection as input for AI tools or refactor manually.

---

## 🧱 Project Architecture

```mermaid
graph TD
    A[Webview Panel in VS Code] --> B[Loads frontend preview (localhost)]
    B --> C[User clicks "Select Element"]
    C --> D[DOM metadata extracted (data-source)]
    D --> E[PostMessage sent to extension]
    E --> F[Extension maps source code]
    F --> G[Opens file and selects lines]
    G --> H[Optional AI integration]
```

---

## 🛠 Development Notes

### Requirements

- Node.js
- npm
- VS Code
- A running dev server (e.g. `npm run dev` from a Next.js app)

### Build

```bash
npm run build
```

### Package (optional)

```bash
npm run package
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch
3. Submit a pull request describing your changes

---

## 📄 License

MIT License – see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by [V0.dev](https://v0.dev), [Bolt.new](https://bolt.new), and [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- Built using the VS Code Extension API
