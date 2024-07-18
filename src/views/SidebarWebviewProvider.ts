import * as vscode from 'vscode';

export class SidebarWebviewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'ludwigPrimaryWebview';

  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ): void {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this.getWebviewContent(webviewView.webview);

    webviewView.webview.onDidReceiveMessage((message) => {
      switch (message.command) {
        case 'scanDoc':
          vscode.commands.executeCommand('ludwig.scanDoc');
          return;
        case 'scanAllDocs':
          vscode.commands.executeCommand('ludwig.scanAllDocs');
          return;
      }
    }, undefined);
  }

  public updateErrors(errorCount: number) {
    if (this._view) {
      this._view.webview.postMessage({ command: 'updateErrors', errorCount });
    }
  }

  private getWebviewContent(webview: vscode.Webview): string {
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'assets', 'style.css')
    );

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${styleUri}" rel="stylesheet">
        <title>Ludwig Sidebar</title>
      </head>
      <body>
        <h2>Welcome to the Ludwig Sidebar!</h2>
        <h3>Improve the accessibility of your website!</h3>
        <p>Click the button below to scan the current HTML document and generate a report to enhance your code:</p>
        <button class="scan-button" onclick="handleScanDocClick()">Scan Document</button>
        <button class="scan-button" onclick="handleScanAllDocsClick()">Scan Project</button>
        <script>
          const vscode = acquireVsCodeApi();
          function handleScanDocClick() {
            vscode.postMessage({ command: 'scanDoc' });
          }
          function handleScanAllDocsClick() {
            vscode.postMessage({ command: 'scanAllDocs' });
          }
        </script>
      </body>
      </html>
    `;
  }
}
