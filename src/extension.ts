import * as vscode from 'vscode';
import * as path from 'path';
import { ESLint } from 'eslint';

const diagnosticCollection: vscode.DiagnosticCollection = vscode.languages.createDiagnosticCollection('jsx_eslint');
let extensionContext: vscode.ExtensionContext;

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension LIIIIIIIIIIIIIIIIIIIINNNNT is now active!');
  // console.log(`Current working directory: ${process.cwd()}`);
  // console.log(`Directory name of the current module: ${__dirname}`);
  extensionContext = context;

  registerGetResultsCommand(context);

  const disposable = vscode.commands.registerCommand('ludwig.getResults', checkESLint);
  context.subscriptions.push(disposable);
}

export async function runESLint(document: vscode.TextDocument): Promise<ESLint.LintResult[]> {
  const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
  // // to be used later for user-defined 'exclude wokspace' paths
  // const workspacePath = workspaceFolder ? workspaceFolder.uri.fsPath : path.dirname(document.uri.fsPath);

  const eslint = new ESLint({
    useEslintrc: false,
    overrideConfigFile: path.join(extensionContext.extensionPath, '.eslintrc.accessibility.json'),
    overrideConfig: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      env: {
        browser: true,
        es2021: true,
        node: true,
      },
      plugins: ['jsx-a11y'],
      extends: ['plugin:jsx-a11y/recommended'],
    },
    resolvePluginsRelativeTo: extensionContext.extensionPath,
  });

  const text = document.getText();
  const results = await eslint.lintText(text, {
    filePath: document.fileName,
  });

  return results;
}

export async function checkESLint() {
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
  }
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
        new vscode.Position(message.line - 1, message.column)
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
// Checks if command is already registered, otherwise it kept registering it at every activation event
async function registerGetResultsCommand(context: vscode.ExtensionContext) {
  const commandId = 'ludwig.getResults';
  const registeredCommands = await vscode.commands.getCommands();

  if (!registeredCommands.includes(commandId)) {
    const disposable = vscode.commands.registerCommand(commandId, checkESLint);
    context.subscriptions.push(disposable);
  }
}

export function deactivate() {}
