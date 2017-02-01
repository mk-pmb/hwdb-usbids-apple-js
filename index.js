/*jslint indent: 2, maxlen: 80, continue: false, unparam: false */
/* -*- tab-width: 2 -*- */
/*global define: true, module: true, require: true */
((typeof define === 'function') && define.amd ? define : function (factory) {
  'use strict';
  var m = ((typeof module === 'object') && module), e = (m && m.exports);
  if (e) { m.exports = factory(require); }
})(function (require) {
  'use strict';
  var EX, db = require('./hwdb/apple.json');
  db = JSON.parse(JSON.stringify(db));
  if (typeof Object.freeze === 'function') { Object.freeze(db); }

  function hex4(x) {
    if (typeof x === 'string') { return x; }
    return ('0000' + (+x).toString(16)).slice(-4);
  }

  EX = {
    db: db,
    find: function lookupAppleUsbProduct(idVendor, idProduct) {
      if (!idVendor) { return; }
      if (!idProduct) { return; }
      idVendor = hex4(idVendor);
      idProduct = hex4(idProduct);
      return ((db[idVendor] || false)[idProduct] || false);
    },
  };

  return EX;
});
