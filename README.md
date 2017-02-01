
<!--#echo json="package.json" key="name" underline="=" -->
hwdb-usbids-apple
=================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Incomplete list of Apple USB device product IDs, taken from the systemd hwdb.
[lsusb idVendor idProduct]
<!--/#echo -->


Usage
-----

from [test/usage.js](test/usage.js):

<!--#include file="test/usage.js" start="  //#u" stop="  //#r"
  outdent="  " code="javascript" -->
<!--#verbatim lncnt="10" -->
```javascript
var appleUsbIds = require('hwdb-usbids-apple'),
  usbDev = { idVendor: 0x05AC, idProduct: 0x12A6 },
  usbHub = { idVendor: 0x1d6b, idProduct: 0x0002 };

function identify(x) { return appleUsbIds.find(x.idVendor, x.idProduct); }

expectEqual(identify(usbDev), 'iPad 3 (3G, 16 GB)');
expectEqual(identify(usbHub), false);   // from some other manufacturer
```
<!--/include-->



<!--#toc stop="scan" -->




License
-------
<!--#echo json="package.json" key=".license" -->
LGPL-2.1
<!--/#echo -->

The hwdb data was taken (using `upd.sh`) from the [systemd repo][sysd-repo],
thus the license. The authors of systemd are listed in [its readme][sysd-rdme]
as Lennart Poettering, Kay Sievers, "…and many others".

  [sysd-repo]: https://github.com/systemd/systemd
  [sysd-rdme]: https://github.com/systemd/systemd/blob/master/README
