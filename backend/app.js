const Express = require("express");
const Bodyparser = require("body-parser");
const Cors = require("cors");
const Mongoose = require("mongoose");
const Multer = require("multer")
const fs = require("fs")
// const ItemModel = require("./models/Items")
const ItemGroupModel = require("./models/Itemgroups")
const InventoryAdjustmentModel = require('./models/InventoryAdjustment');
const itemsModel = require("./models/Items");
const customersModel = require("./models/Customers")
const invoiceModel = require("./models/Invoice")
const invoiceitemsModel = require("./models/InvoiceItems")
const vendorsModel = require("./models/Vendors")
const packagesModel = require("./models/Packages")
const deliveryChallanModel = require("./models/DeliveryChallan")
const salesReturnModel = require("./models/SalesReturn")
const creditNoteModel = require("./models/CreditNotes")
const purchasesModel = require("./models/Purchase")
const purchaseitemsModel = require('./models/PurchaseItems')
const billsModel = require('./models/Bills');
const vendorCreditModel = require("./models/VendorCredit");

const app = new Express();
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({ extended: true }))
app.use(Cors());

app.use('/uploads', Express.static('uploads'))
Mongoose.connect("mongodb+srv://jisha:jisha@cluster0.a2wdl3u.mongodb.net/inventoryDB?retryWrites=true&w=majority", { useNewUrlParser: true })


//image storage
//https://github.com/thisissahulhameed/yt_image_backend/blob/master/index.js
//https://github.com/thisissahulhameed/yt_image_frontend/blob/master/src/App.js
//https://www.youtube.com/watch?v=NzROCbkvIE0

// const upload = Multer({dest: '/uploads'})
const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = Multer({ storage: storage });

/******Items Operations*******/
// Create a new item
app.post("/additems", upload.single("image"), (req, res) => {
  console.log(req, 39)
  console.log(req.body, '    '
    + req.file.orignalname)
  const imageURL = req.file.path
  console.log(imageURL)
  const saveImage = itemsModel({
    name: req.body.name,
    unit: req.body.unit,
    dimensions: req.body.dimensions,
    weight: req.body.weight,
    manufacturer: req.body.manufacturer,
    brand: req.body.brand,
    sellingPrice: req.body.sellingPrice,
    costPrice: req.body.costPrice,
    description: req.body.description,
    openingStock: req.body.openingStock,
    reorderPoint: req.body.reorderPoint,
    preferredVendor: req.body.preferredVendor,
    image: imageURL
  });
  saveImage
    .save()
    .then((res) => {
      console.log("image is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
  res.send('image is saved')
});

// Get all items
app.get('/viewitems', async (req, res) => {
  try {
    const items = await itemsModel.find();
    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single item by ID
app.get('/getitem/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    const item = await ItemModel.findById(req.params.id);
    if (!item) {
      return res.status(404).send();
    }
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an item by ID
app.patch('/updateitem/:id', async (req, res) => {
  console.log(req.body)
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'unit', 'dimensions', 'weight', 'manufacturer', 'brand', 'sellingPrice', 'costPrice', 'description', 'openingStock', 'reorderPoint', 'preferredVendor', 'image'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const item = await itemsModel.findById(req.params.id);
    if (!item) {
      return res.status(404).send();
    }
    updates.forEach(update => item[update] = req.body[update]);
    await item.save();
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Delete an item
app.delete('/deleteitem/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    await itemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Event has been deleted")
  }
  catch (error) {
    console.log(error)
  }
})

/******Item groups Operations*******/
// Create a new item group
app.post('/additemgroup', async (req, res) => {
  console.log("Add an item")
  const newItemgroup = new ItemGroupModel(req.body);
  console.log(newItemgroup)
  try {
    await newItemgroup.save();

    res.send(newItemgroup);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all item groups
app.get('/viewitemgroups', async (req, res) => {
  try {
    const items = await ItemGroupModel.find();
    res.send(items);
    console.log(items)
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single item Group by ID
app.get('/getitemgroup/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    const item = await ItemGroupModel.findById(req.params.id);
    if (!item) {
      return res.status(404).send();
    }
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an item group by ID
app.patch('/updateitemgroup/:id', async (req, res) => {
  console.log(req.body)
  const updates = Object.keys(req.body);
  const allowedUpdates = ['itemgroupName', 'description'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const item = await ItemGroupModel.findById(req.params.id);
    if (!item) {
      return res.status(404).send();
    }
    updates.forEach(update => item[update] = req.body[update]);
    await item.save();
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Delete an item group
app.delete('/deleteitemgroup/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    await ItemGroupModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Event has been deleted")
  }
  catch (error) {
    console.log(error)
  }
})

/******Inventory Adjustment Operations*******/
// Create a new adjustment
app.post('/addinventoryadjust', async (req, res) => {
  console.log("Add an item")
  const newInventoryAdjust = new InventoryAdjustmentModel(req.body);
  console.log(newInventoryAdjust)
  try {
    await newInventoryAdjust.save();

    res.send(newInventoryAdjust);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all inventory adjustment
app.get('/viewinventoryAdjust', async (req, res) => {
  try {
    const inventAdjust = await InventoryAdjustmentModel.find();
    res.send(inventAdjust);
    console.log(inventAdjust)
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single inventory Adjustment by ID
app.get('/getinventAdjust/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    const item = await inventoryAdjustmentModel.findById(req.params.id);
    if (!item) {
      return res.status(404).send();
    }
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an inventory Adjustment by ID
app.patch('/updateinventAdjust/:id', async (req, res) => {
  console.log(req.body)
  const updates = Object.keys(req.body);
  const allowedUpdates = ['itemgroupName', 'description'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const item = await inventoryAdjustmentModel.findById(req.params.id);
    if (!item) {
      return res.status(404).send();
    }
    updates.forEach(update => item[update] = req.body[update]);
    await item.save();
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

/******Customers*******/
// Get all customer
app.get('/viewCustomers', async (req, res) => {
  console.log("Customers")
  try {
    const customers = await customersModel.find();
    console.log(customers)
    res.send(customers);
    console.log(customers)
  } catch (error) {
    res.status(500).send(error);
  }
});

//Create New Customer
app.post('/addCustomer', async (req, res) => {
  console.log("Add an customer")

  const newCustomer = new customersModel(req.body);
  try {
    await newCustomer.save();

    res.send(newCustomer);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single customer by ID
app.post('/getcustomer/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    const cust = await customersModel.findById(req.params.id);
    if (!cust) {
      return res.status(404).send();
    }
    res.send(cust);
    console.log("Customer data:" + cust)
  } catch (error) {
    res.status(500).send(error);
  }
});

//Delete an Customer
app.delete('/deletecustomer/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    await customersModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Event has been deleted")
  }
  catch (error) {
    console.log(error)
  }
})

//update customer
app.put(`/updateCustomer`, async (req, res) => {
  let data = req.body
  try {
    console.log("Customer")
    const customer = await customersModel.findByIdAndUpdate(
      data._id,
      {
        fullName: data.fullName,
        type: data.type,
        address1: data.address1,
        city: data.city,
        postalcode: data.postalcode,
        country: data.country,
        phoneNumber: data.phoneNumber,
        email: data.email
      },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
})

/******Invoice*******/
//Create New Invoice
app.post('/addInvoice', async (req, res) => {
  console.log("Add an invoice")
  console.log(req.body)
  const newInvoice = new invoiceModel(req.body);
  try {
    await newInvoice.save();
    res.send(newInvoice)
  }
  catch (error) {
    res.status(500).send(error);
  }

});

// Get all Invoices
app.get('/viewinvoices', async (req, res) => {
  try {
    const invoices = await invoiceModel.find();
    res.send(invoices);

  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single inventory Adjustment by ID
app.post('/getInvoice', async (req, res) => {

  try {
    var data = req.body
    const invoice = await invoiceModel.findById(data);
    if (!invoice) {
      return res.status(404).send();
    }
    res.send(invoice);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Create items to  Invoice
app.post('/addInvoiceItems', async (req, res) => {
  console.log("Add an items to invoice")
  console.log(req.body)
  const body = req.body;

  const newitemInvoice = new invoiceitemsModel(body);
  console.log(newitemInvoice)
  try {
    await newitemInvoice.save();

    res.send(newitemInvoice);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a invoice items by ID
app.post('/getInvoiceItems', async (req, res) => {
  var data = req.body
  console.log("data comes from db")
  console.log(data)

  try {

    const invoiceItems = await invoiceitemsModel.find(data);
    console.log("Invoice items " + invoiceItems)
    if (!invoiceItems) {
      return res.status(404).send();
    }
    res.send(invoiceItems);
  } catch (error) {
    res.status(500).send(error);
  }
}
);

//delete invoice item
app.delete('/deleteInvoiceItem/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    await invoiceitemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Event has been deleted")
  }
  catch (error) {
    console.log(error)
  }
})

app.put(`/updateStatus/:id/status`, async (req, res) => {
  console.log("_id:" + req.params.id, "status:" + req.body.status)
  try {
    const updateInvoice = await invoiceModel.updateOne(
      { _id: req.params.id },
      { status: req.body.status }
    );
    res.json(updateInvoice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//delete invoice
app.delete('/deleteInvoice/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    await invoiceModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Event has been deleted")
    console.log(res.json)
  }
  catch (error) {
    console.log(error)
  }
})



/******Vendors*******/
// Get all vendors
app.get('/viewVendors', async (req, res) => {
  try {
    const vendors = await vendorsModel.find();
    res.send(vendors);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Create New Vendors
app.post('/addVendors', async (req, res) => {
  console.log("Add an vendor" + req.body)
  const data = req.body
  console.log(data)
  const newVendor = new vendorsModel(data);
  try {
    await newVendor.save();

    res.send(newVendor);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single vendor by ID
app.post('/getvendor/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    console.log(req.params.id)
    const vend = await vendorsModel.findById(req.params.id);
    console.log(vend)
    if (!vend) {
      return res.status(404).send();
    }
    res.send(vend);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Delete an vendor
app.delete('/deletevendor/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    await vendorsModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Event has been deleted")
  }
  catch (error) {
    console.log(error)
  }
})

//update Vendor
app.put(`/updateUser`, async (req, res) => {
  let data = req.body
  try {
    console.log("Vendor")
    const vendor = await vendorsModel.findByIdAndUpdate(
      data._id,
      {
        fullName: data.fullName,
        address1: data.address1,
        city: data.city,
        postalcode: data.postalcode,
        country: data.country,
        phoneNumber: data.phoneNumber,
        email: data.email
      },
      { new: true }
    );

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json(vendor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
})

//Create New Packages
app.post('/addPackage', async (req, res) => {
  console.log("Add an package")
  console.log(req.body)
  const newPackage = new packagesModel(req.body);
  console.log(newPackage)
  try {
    await newPackage.save();
    res.send(newPackage)
  }
  catch (error) {
    res.status(500).send(error);
  }

});

//update Sales after packed
app.put(`/updateSalesPack`, async (req, res) => {
  let data = req.body
  console.log(data)
  try {
    console.log("SalesPack")
    const salesdata = await invoiceModel.findByIdAndUpdate(
      data._id,
      {
        packedStatus: data.packedStatus,
        trackingNo: data.trackingNo
      },
      { new: true }
    );

    if (!salesdata) {
      return res.status(404).json({ message: "sales order not found" });
    }

    res.json(salesdata);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
})

// Get all sales which is packed
app.get('/packedsales', async (req, res) => {
  try {
    const invoices = await invoiceModel.find({ packedStatus: ["packed", "Delivered"] });
    res.send(invoices);

  } catch (error) {
    res.status(500).send(error);
  }
});

//Create Delivery Challan
app.post('/adddelivery', async (req, res) => {
  console.log("Add an Delivery")
  console.log(req.body)
  const newDelivery = new deliveryChallanModel(req.body);
  console.log(newDelivery)
  try {
    await newDelivery.save();
    res.send(newDelivery)
  }
  catch (error) {
    res.status(500).send(error);
  }
});

// Get all sales status
app.put('/updateSalesStatus', async (req, res) => {
  let data = req.body
  console.log(data)
  try {
    console.log("Delivery")
    const salesdata = await invoiceModel.findByIdAndUpdate(
      data._id,
      {
        packedStatus: data.packedStatus
      },
      { new: true }
    );

    if (!salesdata) {
      return res.status(404).json({ message: "sales order not found" });
    }

    res.json(salesdata);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all sales status
app.put('/updateInvoice', async (req, res) => {
  let data = req.body
  console.log(data)
  try {
    console.log("Delivery")
    const salesdata = await invoiceModel.findByIdAndUpdate(
      data._id,
      {
        invoiceid: data.invoiceid,
        invoiceDate: data.invoiceDate
      },
      { new: true }
    );

    if (!salesdata) {
      return res.status(404).json({ message: "sales order not found" });
    }

    res.json(salesdata);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//Create Sales Return
app.post('/addSalesReturn', async (req, res) => {
  console.log("Add an sales return")
  console.log(req.body)
  const newReturn = new salesReturnModel(req.body);
  console.log(newReturn)
  try {
    await newReturn.save();
    res.send(newReturn)
  }
  catch (error) {
    res.status(500).send(error);
  }
});

// Get all Return status
app.put('/updateReturnStatus', async (req, res) => {
  let data = req.body
  console.log(data)
  try {
    console.log("update return status")
    const salesdata = await invoiceModel.findByIdAndUpdate(
      data._id,
      {
        packedStatus: data.packedStatus
      },
      { new: true }
    );

    if (!salesdata) {
      return res.status(404).json({ message: "sales order not found" });
    }

    res.json(salesdata);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all sales which is returned
app.get('/returnsales', async (req, res) => {
  try {
    const invoices = await invoiceModel.find({ packedStatus: ["return"] });
    res.send(invoices);

  } catch (error) {
    res.status(500).send(error);
  }
});

//Create Credit Note
app.post('/addCreditNote', async (req, res) => {
  console.log("Add an creditNote")
  console.log(req.body)
  const newCredit = new creditNoteModel(req.body);
  console.log(newCredit)
  try {
    await newCredit.save();
    res.send(newCredit)
  }
  catch (error) {
    res.status(500).send(error);
  }
});

/**************Purchase*************** */
// Get all purchase orders
app.get('/getpurchase', async (req, res) => {
  try {
    const purchaseord = await purchasesModel.find();
    res.send(purchaseord);
    console.log(purchaseord)
  } catch (error) {
    res.status(500).send(error);
  }
});

//Create New Purchase
app.post('/addPurchase', async (req, res) => {
  console.log("Add Purcjase")
  console.log(req.body)
  const newPOrder = new purchasesModel(req.body);
  try {
    await newPOrder.save();
    res.send(newPOrder)
  }
  catch (error) {
    res.status(500).send(error);
  }

});

// Get all bills
app.get('/viewBills', async (req, res) => {
  try {
    const bills = await billsModel.find();
    res.send(bills);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Create items to  Purchase
app.post('/addPurchaseItems', async (req, res) => {
  console.log("Add an items to purcjase")
  console.log(req.body)
  const body = req.body;

  const newitemPurchase = new purchaseitemsModel(body);
  console.log(newitemPurchase)
  try {
    await newitemPurchase.save();

    res.send(newitemPurchase);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single purchase order by ID
app.post('/getPurchase', async (req, res) => {

  try {
    var data = req.body
    const purchase = await purchasesModel.findById(data);
    if (!purchase) {
      return res.status(404).send();
    }
    res.send(purchase);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a invoice items by ID
app.post('/getPurchaseItems', async (req, res) => {
  var data = req.body
  console.log("data comes from db")
  console.log(data)

  try {

    const ipurchaseItems = await purchaseitemsModel.find(data);
    console.log("Puchase items " + ipurchaseItems)
    if (!ipurchaseItems) {
      return res.status(404).send();
    }
    res.send(ipurchaseItems);
  } catch (error) {
    res.status(500).send(error);
  }
}
);

// Get all Order which is open
app.get('/purchaseOrder', async (req, res) => {
  try {
    const order = await purchasesModel.find({ status: ["open"] });
    res.send(order);

  } catch (error) {
    res.status(500).send(error);
  }
});

//Create Bills
app.post('/addBill', async (req, res) => {
  console.log("Add Bills")
  console.log(req.body)
  const newBills = new billsModel(req.body);
  console.log(newBills)
  try {
    await newBills.save();
    res.send(newBills)
  }
  catch (error) {
    res.status(500).send(error);
  }
});


// update bill status
app.put('/updatePurchaseStatus', async (req, res) => {
  let data = req.body
  console.log(data)
  try {
    console.log("bill ")
    const purdata = await purchasesModel.findByIdAndUpdate(
      data._id,
      {
        status: data.status
      },
      { new: true }
    );
    if (!purdata) {
      return res.status(404).json({ message: "purchase order not found" });
    }
    res.json(purdata);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all purchase which is Billed
app.get('/returnPurchase', async (req, res) => {
  try {
    const pur = await purchasesModel.find({ status: ["close"] });
    res.send(pur);

  } catch (error) {
    res.status(500).send(error);
  }
});

//Create Credit Note
app.post('/addVendorCredit', async (req, res) => {
  console.log("Add an Vendor credit")
  console.log(req.body)
  const newCredit = new vendorCreditModel(req.body);
  console.log(newCredit)
  try {
    await newCredit.save();
    res.send(newCredit)
  }
  catch (error) {
    res.status(500).send(error);
  }
});


app.listen(3002, () => {
  console.log("server started")
})