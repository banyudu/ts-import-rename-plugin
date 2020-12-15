# ts-rename-import-plugin

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
  transformers: { before: [tsImportRenamePlugin({
    transformer: name => name.replace(/\.less$/, '.css')
  })] }

  // or
  // tsImportRenamePlugin({
  //   from: '\\.less$',
  //   to: '.css'
  // })
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

Also works with [ttypescript](https://github.com/cevek/ttypescript)

```json
{
  "compilerOptions": {
    "plugins": [
      { "transform": "ts-rename-import-plugin", "type": "config", "from": "\\.less$", "to": ".css" },
    ]
  }
}
```
