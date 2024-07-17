import * as vscode from 'vscode';
import * as path from 'path';
import { ESLint } from 'eslint';
import { SidebarWebviewProvider } from '../views/SidebarWebviewProvider';

let extensionContext: vscode.ExtensionContext;
let sidebarProvider: SidebarWebviewProvider;
let diagnosticCollection: vscode.DiagnosticCollection = vscode.languages.createDiagnosticCollection('jsx_eslint');
let panel: vscode.WebviewPanel | undefined = undefined;

export function initializeEslintDiagnostics(context: vscode.ExtensionContext, sidebarWebviewProvider: SidebarWebviewProvider, webviewPanel?: vscode.WebviewPanel) {
  extensionContext = context;
  sidebarProvider = sidebarWebviewProvider;
  panel = webviewPanel; // Assign the webview panel to be used later
  context.subscriptions.push(diagnosticCollection);
  registerGetResultsCommand(context);
  registerClearFileDiagnostics(context);
}


export async function runESLint(document: vscode.TextDocument): Promise<ESLint.LintResult[]> {
  const eslint = new ESLint({
    useEslintrc: false,
    overrideConfigFile: path.join(extensionContext.extensionPath, 'src/eslint/.eslintrc.accessibility.json'),
    resolvePluginsRelativeTo: extensionContext.extensionPath,
  });

  const text = document.getText();
  const results = await eslint.lintText(text, {
    filePath: document.fileName,
  });

  return results;
}

export async function setESLintDiagnostics() {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    const results = await runESLint(document);
    const diagnostics = createDiagnosticsFromResults(document, results);

    diagnosticCollection.set(document.uri, diagnostics);

    const fileName = path.basename(document.fileName);
    const numErrors = diagnostics.length;
    const message = `*${fileName}* processed successfully! ${numErrors} errors found.`;

    vscode.window.showInformationMessage(message);

    if (panel) {
      sidebarProvider.updateErrors(panel.webview, numErrors);
    }
  }
}

export async function registerClearFileDiagnostics(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('ludwig.clearDiagnostics', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      diagnosticCollection.delete(editor.document.uri);
      vscode.window.showInformationMessage('Diagnostics cleared for the current file.');
    }
  });

  context.subscriptions.push(disposable);
}

function createDiagnosticsFromResults(
  document: vscode.TextDocument,
  results: ESLint.LintResult[]
): vscode.Diagnostic[] {
  const diagnostics: vscode.Diagnostic[] = [];
  results.forEach((result) => {
    result.messages.forEach((message) => {
      const range = new vscode.Range(
        new vscode.Position(message.line - 1, message.column - 1),
        new vscode.Position(message.line - 1, Number.MAX_SAFE_INTEGER),
      );
      const diagnostic = new vscode.Diagnostic(
        range,
        message.message,
        message.severity === 2 ? vscode.DiagnosticSeverity.Error : vscode.DiagnosticSeverity.Warning
      );
      diagnostics.push(diagnostic);
    });
  });
  return diagnostics;
}

async function registerGetResultsCommand(context: vscode.ExtensionContext) {
  const commandId = 'ludwig.getResults';
  const registeredCommands = await vscode.commands.getCommands();

  if (!registeredCommands.includes(commandId)) {
    const disposable = vscode.commands.registerCommand(commandId, setESLintDiagnostics);
    context.subscriptions.push(disposable);
  }
}
