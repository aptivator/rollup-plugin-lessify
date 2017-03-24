let rollup = require('rollup');
let lessifier = require('../../dist/lessify');
let path = require('path');
let express = require('express');
let app = express();
let hostname = '127.0.0.1';
let port = 12345;
let staticPath = path.resolve(__dirname, '../sample-site');
let entryFile = path.resolve(staticPath, 'js/app.js');
let destFile = path.resolve(staticPath, 'js/_app.js');
let cssFile = path.resolve(staticPath, 'css/generated.css');
let baseUrl = 'http://' + hostname + ':' + port + '/';

app.use(express.static(staticPath));
let server = app.listen(port, hostname);

module.exports = {
  before: function(done) {
    rollup.rollup({
      entry: entryFile,
      plugins: [
        lessifier({
          insert: true,
          output: cssFile
        })
      ]
    }).then((bundle) => {
      return bundle.write({
        dest: destFile,
        format: 'cjs'
      });
    }).then(function() {
      done();
    });
  },
  
  after: function() {
    server.close();
  },
  
  'load page with injectable css code': function(browser) {
    browser
      .url(baseUrl + 'page-1.html')
      .waitForElementVisible('body', 1000)
      .assert.title('Page 1')
      .assert.cssProperty('p:last-of-type', 'color', 'rgba(255, 0, 0, 1)')
      .end();
  },
  
  'load page with css code in a linked file': function(browser) {
    browser
      .url(baseUrl + 'page-2.html')
      .waitForElementVisible('body', 1000)
      .assert.title('Page 2')
      .assert.cssProperty('p:last-of-type', 'color', 'rgba(255, 0, 0, 1)')
      .end();
  }
};
