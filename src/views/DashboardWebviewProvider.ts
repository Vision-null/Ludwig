import * as vscode from 'vscode';

export class DashboardWebviewProvider {
  public static readonly viewType = 'ludwigDashboard';
  private _panel?: vscode.WebviewPanel | undefined;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public show(context: vscode.ExtensionContext) {
    if (this._panel) {
      this._panel.reveal(vscode.ViewColumn.Two);
    } else {
        //this creates a new panel if it doesnt exist
      this._panel = vscode.window.createWebviewPanel(
        DashboardWebviewProvider.viewType,
        'Ludwig Dashboard',
        vscode.ViewColumn.Two,
        {
          enableScripts: true,
          localResourceRoots: [this._extensionUri],
        }
      );

      this._panel.webview.html = this.getWebviewContent(this._panel.webview);

      this._panel.onDidDispose(() => {
        this._panel = undefined;
      }, null, context.subscriptions);
    }
  }
  //send errors to chart
  public updateErrors(errorCount: number) {
    if (this._panel) {
      this._panel.webview.postMessage({ command: 'updateErrors', errorCount });
    }
  }
  //need this to make html for webview
  private getWebviewContent(webview: vscode.Webview): string {
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
        <canvas id="progressionChart"></canvas>
        <script src="${scriptUri}"></script>
      </body>
      </html>
    `;
  }
}
