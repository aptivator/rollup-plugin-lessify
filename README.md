# rollup-plugin-lessify

### Introduction

The plugin was written to transpile less files into css.  The module is very 
similar to other rollup less plugins (e.g., [rollup-plugin-less], 
[rollup-plugin-less2]) in that it transpiles less and either places resultant 
css into a static file or injects the code in the `style` tag into the header of 
an html document.

The difference among the modules is in their internal implementation.  The 
aforementioned plugins use `async`\\`await` functions, which are transformed 
using [babel].  If a developer writes a simpler ES2015 application and decides 
to build it with [buble]&nbsp;instead, then the latter may not be able to use
`async`\\`await`-based plugins.

rollup-plugin-lessify uses promises instead of asynchronous functions.  As a 
result, the module should be equally usable with either babel or buble.

[rollup-plugin-less]: https://github.com/xiaofuzi/rollup-plugin-less
[rollup-plugin-less2]: https://github.com/Katochimoto/rollup-plugin-less2
[babel]: https://babeljs.io/
[buble]: https://buble.surge.sh/

### Installation

`npm install rollup-plugin-lessify --save-dev`

### Example

```javascript
/* some-file.js */

import './main.less';

```

```javascript
/* rollup.config.js */

import lessifier from 'rollup-plugin-lessify';

export default {
  entry: 'index.js',
  plugins: [
    lessifier()
  ]
};
```

### Plugin options

* **insert**: directs the plugin whether to insert a transpiled css code into 
the header of an html document (default: `false`)

* **output**: sets a pathname for a css file or a function that receives a 
generated css code (default: `false`)

* **include**: specifies a minimatch pattern for the less files that are 
converted into css (default: `['**/*.less']`)

* **exclude**: indicates a minimatch pattern to designate the files
that are ignored by the plugin (default: `node_modules/**`)

* **options**: a configuration object for less transpiler
