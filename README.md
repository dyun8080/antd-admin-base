# antd-admin-base
antd-admin-base



### v0.01
``` bash
- 新增侧边与面包屑导航
- 新增lodash(_.lodash)
```

```jsx
'新增lodash(注意不要导入默认，不然会加载全部包，体积会很大)。正确的导入方式为：'
import cloneDeep from 'lodash/clonedeep'
```

### components-public

- Table
	-- CommonAsyncTable


### v0.02
Show chunks:
All (302.82 KB)
core/index.eb26e719.js (131.29 KB)
core/2.82764f4a.js (69.43 KB)
core/1.ad82a15e.js (56.37 KB)
vendor.c5711c57.js (34.44 KB)
core/0.ccb08777.js (11.28 KB)

未解决2次异步导入重复的问题(antd-table)

### v0.03
``` bash
- 终于搞定了异步导入重复的问题，顺便带上了css。
- devMode ? 'style-loader' : MiniCssExtractPlugin.loader -、-
```
