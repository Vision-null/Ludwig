import * as vscode from 'vscode';

export class SidebarWebviewProvider {
  public static readonly viewType = 'ludwigPrimaryWebview';

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public updateErrors(webview: vscode.Webview, errorCount: number) {
    webview.postMessage({ command: 'updateErrors', errorCount });
  }

  public getWebviewContent(webview: vscode.Webview): string {
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'assets', 'style.css')
    );
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'dist', 'dashboard', 'dashboard.js')
    );

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${styleUri}" rel="stylesheet">
        <title>Ludwig Dashboard</title>
      </head>
      <body>
        <h2>Ludwig Dashboard</h2>
        <canvas id="myChart"></canvas>
        <script src="${scriptUri}"></script>
      </body>
      </html>
    `;
  }
}
