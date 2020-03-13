import tsImportRenamePlugin from "./";
import * as ts from "typescript";

let source = `
import react, { Component } from 'react'
import './index.less'

export default AAA extends Component {
  render () {
    return <div />
  }
}
`;
let result = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ESNext,
    jsx: ts.JsxEmit.React
  },
  transformers: { before: [tsImportRenamePlugin(name => name.replace(/\.less$/, '.css'))] }
});

console.log("result is: \n", result.outputText);
