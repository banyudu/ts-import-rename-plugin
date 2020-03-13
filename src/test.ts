import tsImportRenamePlugin from "./";
import * as ts from "typescript";

const sourceCode = `
import react, { Component } from 'react'
import './index.less'

export default AAA extends Component {
  render () {
    return <div />
  }
}
`;

const pluginWithTransformer: ts.TransformerFactory<ts.SourceFile> = tsImportRenamePlugin({
  transformer: name => name.replace(/\.less$/, '.css')
})
const pluginWithFromTo: ts.TransformerFactory<ts.SourceFile> = tsImportRenamePlugin({
  from: '\\.less$',
  to: '.css'
})
const transform = (source: string, transformer: ts.TransformerFactory<ts.SourceFile>) => ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ESNext,
    jsx: ts.JsxEmit.React
  },
  transformers: { before: [transformer] }
}).outputText;

console.log("result1 is: \n", transform(sourceCode, pluginWithTransformer));
console.log("result2 is: \n", transform(sourceCode, pluginWithFromTo));