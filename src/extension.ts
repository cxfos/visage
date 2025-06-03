import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage('✅ Visage extension activated');
  const command = vscode.commands.registerCommand('visage.openPreview', () => {
    const panel = vscode.window.createWebviewPanel(
      'visagePreview',
      'Visage: Live Preview',
      vscode.ViewColumn.Two,
      {
        enableScripts: true
      }
    );

    // Get the URL from config or use default
    getPreviewUrlFromConfig().then(previewUrl => {
      panel.webview.html = getWebviewContent(previewUrl);
    });
  });

  context.subscriptions.push(command);
}

async function getPreviewUrlFromConfig(): Promise<string> {
  // Default URL
  const defaultUrl = 'http://localhost:3000';
  
  // Get the workspace folder
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    return defaultUrl;
  }
  
  const rootFolder = workspaceFolders[0];
  const configFileNames = ['visage.config.json', '.visagerc.json'];
  
  // Try to find and read the config file
  for (const fileName of configFileNames) {
    try {
      // Create a URI for the config file
      const fileUri = vscode.Uri.parse(rootFolder.uri.toString() + '/' + fileName);
      
      // Read the file using workspace.openTextDocument
      const document = await vscode.workspace.openTextDocument(fileUri);
      const content = document.getText();
      const config = JSON.parse(content);
      
      if (config.previewUrl) {
        return config.previewUrl;
      }
    } catch (error) {
      // File doesn't exist or can't be read, continue to the next one
      continue;
    }
  }
  
  // If no config found or invalid, return default
  return defaultUrl;
}

function getWebviewContent(previewUrl: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Visage Preview</title>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
        }
        .container {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
        h3 {
          margin: 10px;
        }
        iframe {
          flex: 1;
          border: none;
          width: 100%;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h3>🔧 Visage Extension</h3>
        <iframe
          src="${previewUrl}"
          sandbox="allow-scripts allow-same-origin allow-forms"
          allow="clipboard-read; clipboard-write"
        ></iframe>
      </div>
    </body>
    </html>
  `;
}

export function deactivate() {}