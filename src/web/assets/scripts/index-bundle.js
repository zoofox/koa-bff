System.register([], function (_export, _context) {
  "use strict";

  var data, app;
  return {
    setters: [],
    execute: function () {
      console.log('index.js🐷');
      data = 'hello pig';
      app = new Vue({
        el: '#app-6',
        data: {
          message: 'Hello Vue!'
        }
      });

      _export("default", data);
    }
  };
});
