/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

function readmeDemo(expectEqual) {
  //#u
  var appleUsbIds = require('hwdb-usbids-apple'),
    usbDev = { idVendor: 0x05AC, idProduct: 0x12A6 },
    usbHub = { idVendor: 0x1d6b, idProduct: 0x0002 };

  function identify(x) { return appleUsbIds.find(x.idVendor, x.idProduct); }

  expectEqual(identify(usbDev), 'iPad 3 (3G, 16 GB)');
  expectEqual(identify(usbHub), false);   // from some other manufacturer
  //#r
  return appleUsbIds;
}

var eq = require('assert').deepStrictEqual, appleUsbIds = readmeDemo(eq).db,
  vendorIds = Object.keys(appleUsbIds),
  products = appleUsbIds[vendorIds[0]], vendorNameKey = '';

eq(appleUsbIds[''], undefined);
eq(vendorIds.length, 1);
eq(products[vendorNameKey], 'Apple, Inc.');

// check lowercase-ness
eq(products['129A'], undefined);
eq(products['129a'], 'iPad');








console.log("+OK tests passed.");   //= "+OK tests passed."
