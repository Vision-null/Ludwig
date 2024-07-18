import * as vscode from 'vscode';
import { initializeEslintDiagnostics } from './eslint/eslintDiagnostics';
import { registerScanAllDocsCommand } from './commands/scanAllDocsCommand';
import { registerScanDocCommand } from './commands/scanDocCommand';
import { registerHighlightElementsCommand, registerToggleOffCommand } from './commands/highlightElementsCommand';
import { registerDocumentEvents } from './commands/documentEvents';
import { registerHoverProvider } from './commands/hoverProvider';
import { SidebarWebviewProvider } from './views/SidebarWebviewProvider';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "ludwig" is now active!');

  const primarySidebarWebview = new SidebarWebviewProvider(context.extensionUri);
  const sidebarWebviewDisposable = vscode.window.registerWebviewViewProvider(
    SidebarWebviewProvider.viewType,
    primarySidebarWebview
  );
  registerScanDocCommand(context);
  registerScanAllDocsCommand(context);
  initializeEslintDiagnostics(context);
  registerHighlightElementsCommand(context);
  registerToggleOffCommand(context);
  //   registerDocumentEvents(context);
  registerHoverProvider(context);

  context.subscriptions.push(sidebarWebviewDisposable);
}

export function deactivate() {
  vscode.window.showInformationMessage('Goodbye');
}