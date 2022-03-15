# ts-rename-import-plugin

Transform import paths in typescript compile result.

## UseCases

For example, transform `less` import sentences to `css`:

From

```typescript
import './index.less'
export default () => <div className='hello' />
```

to

```typescript
import './index.css'
export default () => <div className='hello' />
```

## Usage

This plugin can be used programmatically, or by using as a tsconfig.json plugin (*requires [ttypescript](https://github.com/cevek/ttypescript)*).

### In tsconfig.json

To use this plugin in tsconfig.json, add the following config:

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "transform": "ts-rename-import-plugin",
        "type": "config",
        "from": "\\.less$",
        "to": ".css"
      },
    ]
  }
}
```

Then use [ttypescript](https://github.com/cevek/ttypescript) instead of typescript:

```bash
npm i -D ttypescript ts-rename-import-plugin

ttsc # instead of tsc
```

Check out [ttypescript](https://github.com/cevek/ttypescript) for more info.

### Programmatically

```typescript
import tsImportRenamePlugin from "./";
import * as ts from "typescript";

const transform = (source: string) => {
  return ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ESNext,
      jsx: ts.JsxEmit.React
      // ... other options
    },
    transformers: {
      before: [
        tsImportRenamePlugin({
          transformer: name => name.replace(/\.less$/, '.css')
        })
        /** or
          tsImportRenamePlugin({
            from: '\\.less$',
            to: '.css'
          })
        */
      ]
    }
  }).outputText;
}
});
```
