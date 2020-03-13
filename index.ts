import * as ts from "typescript";

export interface ImportedStruct {
  importName: string;
  variableName?: string;
}

type Transformer = (orig: string) => string

export function createTransformer<T extends ts.Node>(
  transformer?: Transformer
): ts.TransformerFactory<T> {
  if (!transformer) {
    return ctx => node => node
  }
  return context => {
    const visitor: ts.Visitor = node => {
      if (ts.isSourceFile(node)) {
        return ts.visitEachChild(node, visitor, context);
      }

      if (!ts.isImportDeclaration(node)) {
        return node;
      }
      let pkgName = node.moduleSpecifier.getText().slice(1, -1)
      if (transformer) {
        pkgName = transformer(pkgName)
      }
      return ts.updateImportDeclaration(
        node,
        node.decorators,
        node.modifiers,
        node.importClause,
        ts.createStringLiteral(pkgName)
      )
    };

    return (node: T) => ts.visitNode(node, visitor);
  };
}

export default createTransformer;
