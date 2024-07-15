import * as vscode from 'vscode';
import { initializeEslintDiagnostics } from './eslint/eslintDiagnostics';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension LIIIIIIIIIIIIIIIIIIIINNNNT is now active!');
  // console.log(`Current working directory: ${process.cwd()}`);
  // console.log(`Directory name of the current module: ${__dirname}`);
  initializeEslintDiagnostics(context);
}

export function deactivate() {}
