import * as vscode from 'vscode';
import { initializeEslintDiagnostics } from './eslint/eslintDiagnostics';
import { registerScanAllDocsCommand } from './commands/scanAllDocsCommand';
import { registerScanDocCommand } from './commands/scanDocCommand';
// import { SidebarWebviewProvider } from './views/SidebarWebviewProvider';
import { DashboardWebviewProvider } from './views/DashboardWebviewProvider';
import { registerHighlightElementsCommand, registerToggleOffCommand  } from './commands/highlightElementsCommand';
import { registerHoverProvider } from './commands/hoverProvider';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "ludwig" is now active!');

  // const primarySidebarWebview = new SidebarWebviewProvider(context.extensionUri);
  const dashboardWebviewProvider = new DashboardWebviewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.commands.registerCommand('ludwig.showDashboard', () => {
        dashboardWebviewProvider.show(context);
        })
      );

  // context.subscriptions.push(
  //     vscode.window.registerWebviewViewProvider(
  //       SidebarWebviewProvider.viewType,
  //       primarySidebarWebview
  //     )
  // );
  //     panel.webview.html = SidebarWebviewProvider.getWebviewContent(panel.webview);

  //     // Handle messages from the webview
  //     panel.webview.onDidReceiveMessage((message) => {
  //       switch (message.command) {
  //         case 'scanDoc':
  //           vscode.commands.executeCommand('ludwig.scanDoc');
  //           return;
  //         case 'scanAllDocs':
  //           vscode.commands.executeCommand('ludwig.scanAllDocs');
  //           return;
  //       }
  //     });
  //   })
  // );

  registerScanDocCommand(context);
  registerScanAllDocsCommand(context);
  initializeEslintDiagnostics(context, dashboardWebviewProvider);
  registerHighlightElementsCommand(context);
  registerToggleOffCommand(context);
  //   registerDocumentEvents(context);
  registerHoverProvider(context);

  // context.subscriptions.push(sidebarWebviewDisposable);
}

export function deactivate() {
  vscode.window.showInformationMessage('Goodbye');
}
