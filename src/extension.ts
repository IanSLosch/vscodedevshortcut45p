import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  context.subscriptions.push(statusBarItem);

  function updateStatusBarItem(): void {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const folderPath = vscode.workspace.getWorkspaceFolder(editor.document.uri)?.uri.fsPath;
      if (folderPath) {
        const folderName = path.basename(folderPath);
        const url = `https://projects.45press.com/${folderName}/`;

        statusBarItem.text = "$(link) Open Project";
        statusBarItem.tooltip = `Go to ${url}`;
        statusBarItem.command = {
          title: "Open URL",
          command: "vscode.open",
          arguments: [vscode.Uri.parse(url)]
        };
        statusBarItem.show();
      } else {
        statusBarItem.hide();
      }
    } else {
      statusBarItem.hide();
    }
  }

  vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem, null, context.subscriptions);
  vscode.workspace.onDidChangeWorkspaceFolders(updateStatusBarItem, null, context.subscriptions);

  updateStatusBarItem();
}

export function deactivate() {
  // This will be called when your extension is deactivated
}
