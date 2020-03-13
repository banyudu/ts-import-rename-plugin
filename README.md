# ts-import-rename-plugin

Rename import pathes in typescript compile result.

## UseCases

transform 

```typescript
import './index.less'
export default () => <div className='hello' />
```

to 

```typescript
import './index.css'
export default () => <div className='hello' />
```
