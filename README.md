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

``` jsx
Show chunks:
All (302.82 KB)
core/index.eb26e719.js (131.29 KB)
core/2.82764f4a.js (69.43 KB)
core/1.ad82a15e.js (56.37 KB)
vendor.c5711c57.js (34.44 KB)
core/0.ccb08777.js (11.28 KB)
```

未解决2次异步导入重复的问题(antd-table)

v0.03 / 2018-5-11
==================

  * 新增 本地node服务器
    - node服务器开启Gipz压缩（一般交给Nginx开启）
  * 解决异步导入重复的问题，顺便带上了css。
		- optimization.splitChunks.cacheGroups[common].minChunks
    - style-loader 与 MiniCssExtractPlugin.loader不要一起使用，使用一个就好了
    - dev ==> style-loader
    - pro ==> MiniCssExtractPlugin.loader

		* optimization: before
			- Show chunks:
			- All (301.33 KB)
			- index.097b272b.js (129.58 KB)
			- core/2.02ed9310.js (69.16 KB)
			- core/1.7415acaf.js (56.86 KB)
			- core/vendor.7fd5aed4.js (34.45 KB)
			- core/0.af0ecb26.js (11.28 KB)

		* optimization: after
			- Show chunks:
			- All (237.87 KB)
			- index.447e6f80.js (129.6 KB) 				~~~ style.447e6f80.css
			- core/common.8ce9ae16.js (53.37 KB) 	~~~ 0.chunk.8ce9ae16.css
			- core/vendor.ae731fef.js (34.45 KB)  
			- core/3.d52b0514.js (15.96 KB)
			- core/2.9da40503.js (3.72 KB)
			- core/1.db040fd8.js (793 B)					~~~ 1.chunk.db040fd8.css
