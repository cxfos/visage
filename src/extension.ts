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

    panel.webview.html = getWebviewContent();
  });

  context.subscriptions.push(command);
}

function getWebviewContent(): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Visage Preview</title>
    </head>
    <body>
      <h3>🔧 Visage Extension</h3>
      <p>This is a placeholder. Later, this iframe will load your frontend (e.g. http://localhost:3000).</p>
    </body>
    </html>
  `;
}

export function deactivate() {}
