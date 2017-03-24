import {createFilter}    from 'rollup-pluginutils';
import fs                from 'fs-extra';
import * as df        from './lib/consts';
import appenderGenerator from './lib/appender-generator';
import lessifier         from './lib/lessifier';

export default (options = {}) => {
  let {insert = false, include = df.include, exclude = df.exclude} = options;
  let {options: options_ = {}, output = df.output} = options;
  const filter = createFilter(include, exclude);
  filter.count = 0;

  return {
    name: 'less',
    
    intro() {
      if(insert) {
        return appenderGenerator(insert);
      }
    },
    
    transform(code, id) {
      if (!filter(id)) {
        return;
      }
      
      options_.filename = id;

      return lessifier(code, options_).then(css => {
        if(typeof output === 'string') {
          if(++filter.count === 1) {
            fs.removeSync(output);
          }
          fs.appendFileSync(output, css);
        } else if(typeof output === 'function') {
          css = output(css, id);
        }
        return Promise.resolve(css);
      }).then(css => {
        css = JSON.stringify(css);
        let code = 'export default ';
        code += insert ? `${df.injectFnName}(${css})` : css;
        code += ';';
        return {code, map: {mappings: ''}};
      }).catch(e => console.error(e));
    }
  };
};
