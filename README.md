# ts-import-rename-plugin

Rename import pathes in typescript compile result.

## UseCases

transform 

```typescript
let result = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ESNext,
    jsx: ts.JsxEmit.React
  },
  transformers: { before: [tsImportRenamePlugin(name => name.replace(/\.less$/, '.css'))] }
});
```

will transform following code

```typescript
import './index.less'
export default () => <div className='hello' />
```

to 

```typescript
import './index.css'
export default () => <div className='hello' />
```
