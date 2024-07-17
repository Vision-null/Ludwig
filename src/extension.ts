import * as vscode from 'vscode';
import { initializeEslintDiagnostics } from './eslint/eslintDiagnostics';
import { registerScanAllDocsCommand } from './commands/scanAllDocsCommand';
import { registerScanDocCommand } from './commands/scanDocCommand';
import { SidebarWebviewProvider } from './views/SidebarWebviewProvider';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "ludwig" is now active!');

  const primarySidebarWebview = new SidebarWebviewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.commands.registerCommand('ludwig.showDashboard', () => {
      const panel = vscode.window.createWebviewPanel(
        SidebarWebviewProvider.viewType,
        'Ludwig Dashboard',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [context.extensionUri],
        }
      );

      panel.webview.html = primarySidebarWebview.getWebviewContent(panel.webview);

      // Handle messages from the webview
      panel.webview.onDidReceiveMessage((message) => {
        switch (message.command) {
          case 'scanDoc':
            vscode.commands.executeCommand('ludwig.scanDoc');
            return;
          case 'scanAllDocs':
            vscode.commands.executeCommand('ludwig.scanAllDocs');
            return;
        }
      });
    })
  );

  registerScanDocCommand(context);
  registerScanAllDocsCommand(context);
  initializeEslintDiagnostics(context, primarySidebarWebview);
}

export function deactivate() {
  vscode.window.showInformationMessage('Goodbye');
}
