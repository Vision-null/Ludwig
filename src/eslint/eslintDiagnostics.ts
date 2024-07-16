import * as vscode from 'vscode';
import * as path from 'path';
import { ESLint } from 'eslint';
import { runESLint } from './runESLint';
let extensionContext: vscode.ExtensionContext;

const diagnosticCollection = vscode.languages.createDiagnosticCollection('ludwig_eslint');

let isActiveLintingEnabled = false;
let isAllFilesLintingEnabled = false;

export function initializeLinting(context: vscode.ExtensionContext) {
  extensionContext = context;
  context.subscriptions.push(
    vscode.commands.registerCommand('ludwig.toggleLintActiveFile', toggleLintActiveFile),
    vscode.commands.registerCommand('ludwig.toggleLintAllFiles', toggleLintAllFiles),
    vscode.commands.registerCommand('ludwig.clearDiagnostics', clearDiagnostics)
  );

  vscode.window.onDidChangeActiveTextEditor(async (editor) => {
    if (editor && isActiveLintingEnabled) {
      await lintDocument(editor.document);
    }
  });

  vscode.workspace.onDidSaveTextDocument(async (document) => {
    if (isAllFilesLintingEnabled) {
      await lintDocument(document);
    }
  });
}

async function toggleLintActiveFile() {
  isActiveLintingEnabled = !isActiveLintingEnabled;
  if (isActiveLintingEnabled) {
    vscode.window.showInformationMessage('Linting enabled for active file');
    await lintActiveFile();
  } else {
    vscode.window.showInformationMessage('Linting disabled for active file');
    clearDiagnosticsForActiveFile();
  }
}

async function toggleLintAllFiles() {
  isAllFilesLintingEnabled = !isAllFilesLintingEnabled;
  if (isAllFilesLintingEnabled) {
    vscode.window.showInformationMessage('Linting enabled for all files');
    await lintAllFiles();
  } else {
    vscode.window.showInformationMessage('Linting disabled for all files');
    clearDiagnostics();
  }
}
function clearDiagnostics() {
  diagnosticCollection.clear();
  vscode.window.showInformationMessage('Diagnostics cleared for all files.');
}

async function lintActiveFile() {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    await lintDocument(editor.document);
  }
}

async function lintAllFiles() {
  const documents = vscode.workspace.textDocuments;
  for (const document of documents) {
    await lintDocument(document);
  }
}

async function lintDocument(document: vscode.TextDocument) {
  const results = await runESLint(document, extensionContext);
  if (results !== null) {
    const diagnostics = createDiagnosticsFromResults(document, results);
    diagnosticCollection.set(document.uri, diagnostics);
    const fileName = path.basename(document.fileName);
    const numErrors = diagnostics.length;
    vscode.window.showInformationMessage(`*${fileName}* processed successfully! ${numErrors} errors found.`);
  } else {
    diagnosticCollection.delete(document.uri);
    vscode.window.showInformationMessage('No linting results found for this file.');
  }
}

function clearDiagnosticsForActiveFile() {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    diagnosticCollection.delete(editor.document.uri);
    function clearDiagnostics() {
      diagnosticCollection.clear();
      vscode.window.showInformationMessage('Diagnostics cleared for all files.');
    }
  }
}

function createDiagnosticsFromResults(
  document: vscode.TextDocument,
  results: ESLint.LintResult[]
): vscode.Diagnostic[] {
  return results.flatMap((result) =>
    result.messages.map((message) => {
      const start = new vscode.Position(message.line - 1, message.column - 1);
      const end = new vscode.Position(message.line - 1, Number.MAX_SAFE_INTEGER);
      const range = new vscode.Range(start, end);

      return new vscode.Diagnostic(
        range,
        message.message,
        message.severity === 2 ? vscode.DiagnosticSeverity.Error : vscode.DiagnosticSeverity.Warning
      );
    })
  );
}
