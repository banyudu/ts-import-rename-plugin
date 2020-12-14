import * as ts from "typescript";

export interface ImportedStruct {
  importName: string;
  variableName?: string;
}

interface Options {
  transformer?: Transformer
  from?: string
  to?: string
}

type Transformer = (orig: string) => string

export function createTransformer<T extends ts.Node>(
  { transformer, from, to }: Options
): ts.TransformerFactory<T> {
  if (!transformer && from && to) {
    const regex = new RegExp(from)
    transformer = (orig: string) => orig.replace(regex, to)
  }
  if (!transformer) {
    return ctx => node => node
  }
  return context => {
    const visitor: ts.Visitor = node => {
      if (!transformer) {
        return node
      }
      if (ts.isSourceFile(node)) {
        return ts.visitEachChild(node, visitor, context);
      }

      if (ts.isImportDeclaration(node)) {
        const pkgName = node.moduleSpecifier.getText().slice(1, -1)
        const newPkgName = transformer(pkgName)

        if(pkgName === newPkgName) {
          return node
        }

        return ts.updateImportDeclaration(
          node,
          node.decorators,
          node.modifiers,
          node.importClause,
          ts.createStringLiteral(newPkgName)
        )
      }

      if (ts.isStringLiteral(node) && ts.isCallExpression(node.parent) && node.parent.expression.getText() === 'require') {
        const pkgName = node.getText().slice(1, -1)
        const newPkgName = transformer(pkgName)

        if(pkgName === newPkgName) {
          return node
        }

        return ts.createStringLiteral(newPkgName)
      }
      return ts.visitEachChild(node, visitor, context);
    };

    return (node: T) => ts.visitNode(node, visitor);
  };
}

export default createTransformer;
