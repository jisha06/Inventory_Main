import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './PurchseNavbar';

const AddPurchase = () => {
  const navigate = useNavigate();
  const [item, setItems] = useState([]);
  const [custdata, setcustData] = useState([])
  const [csdata, setCsData] = useState([]);
  const [data, setData] = useState('');
  const [indata, setinData] = useState([]);

  const purchaseOrderNo = useRef("");
  const vendorName = useRef("");
  const vendorId = useRef("");
  const vendorAddress = useRef("");
  const vendorCity = useRef("");
  const vendorPostalcode = useRef("");
  const vendorCountry = useRef("");
  const vendorEmail = useRef("");
  const deliveryTo = useRef("");
  const referenceNo = useRef("");
  const orderDate = useRef("");
  const expectDeliveryDate = useRef("");
  const items = useRef("");
  const shipmentPreference = useRef("");
  const status = useRef("");
  const total = useRef("");

  useEffect(() => {
    loadCustomer();
  }, [])

  const loadCustomer = () => {
    axios.get("http://localhost:3002/viewVendors")
      .then(
        (res) => {
          setcustData(res.data)
        }
      ).catch((error) => {
        console.log(error)
      })
  }
  const inputHandler = (event) => {

    const { name } = event.target
    const str = event.target.value
    const sp = str.split("\\")
    const value = sp[1]

    setData((previousState) => ({
      ...previousState,
      [name]: value.toString()

    }))
    // clientName1 = value

    setData(value)
    axios.post(`http://localhost:3002/getvendor/` + sp[0])
      .then(
        (res) => {

          setCsData(res.data)

        }
      ).catch((error) => {
        console.log(error)
      })

  }

  const createInvoice = async (status) => {
    const totalAmount1 = item.reduce((acc, curr) => acc + curr.total, 0);

    const purchaseData = {
      purchaseOrderNo: purchaseOrderNo.current.value,
      vendorName: data,
      vendorId: vendorId.current.value,
      vendorAddress: vendorAddress.current.value,
      vendorCity: vendorCity.current.value,
      vendorPostalcode: vendorPostalcode.current.value,
      vendorCountry: vendorCountry.current.value,
      vendorEmail: vendorEmail.current.value,
      deliveryTo: deliveryTo.current.value,
      referenceNo: referenceNo.current.value,
      orderDate: orderDate.current.value,
      expectDeliveryDate: expectDeliveryDate.current.value,
      shipmentPreference: shipmentPreference.current.value,
      items: item.length,
      total: totalAmount1,
      status: "open"
    }
    console.log(purchaseData)

    try {
      if (purchaseOrderNo.current.value === "" ||
        vendorName.current.value === "" ||
        deliveryTo.current.value === "" ||
        referenceNo.current.value === "" ||
        orderDate.current.value === "" ||
        expectDeliveryDate.current.value === "" ||
        shipmentPreference.current.value == "" ||
        items.length === 0
      ) {
        alert("All fields are required. Must provide valid data");
      } else {
       
        axios.post(`http://localhost:3002/addPurchase`, purchaseData)
          .then((response) => {
            const newPurchase = response.data
            // alert("Invoice created Successfuly");
            console.log("IPurchase Details:   " + newPurchase._id)
            console.log(" Item length" + item.length)
            console.log(item)
            if (item.length !== 0) {
              for (var i = 0; i < item.length; i++) {
                console.log(i)
                const invid = newPurchase._id
                const invNumber = newPurchase.purchaseOrderNo
                const itemName1 = item[i].name
                const itquantity = item[i].quantity
                const itprice = item[i].sellingPrice
                const ittotal = item[i].total
                const inItemData = { "purchaseid": invid, "purchaseNo": invNumber, "itemName": itemName1, "quantity": itquantity, "price": itprice, "totalPrice": ittotal };
                console.log(inItemData)
                axios.post(`http://localhost:3002/addPurchaseItems`, inItemData)
                  .then((response) => {
                    console.log(response.status)
                    if (response.status != 500) {
                      navigate('/PurchaseOrder')
                    }

                  })
                  .catch((error) => {
                    console.log(error)
                  })

              }
            }

          })
          .catch((error) => {
            console.log(error)
          })
        navigate('/PurchaseOrder')
      }


    } catch (error) {
      alert("Something went wrong!");
    }

  };

  const addItem = () => {
    axios.get("http://localhost:3002/viewitems")
      .then(
        (res) => {
          console.log(res.data)
          setItems(res.data)
        }
      ).catch((error) => {
        console.log(error)
      })
  };

  // handler change
  const handlerChange = (event, i) => {
    const { name, value } = event.target;
    let toalamount = 0;

    const list = [...item];

    list[i][name] = value;
    console.log(list[i]["quantity"], list[i]["sellingPrice"])
    list[i]["total"] = list[i]["quantity"] * list[i]["sellingPrice"];

    let itemTotal = list[i]["total"]
    toalamount += itemTotal
    console.log(toalamount)
    setItems(list);
    console.log("Ths is Last list" + list)
  };

  const deleteItem = (i) => {
    const inputData = [...item];
    console.log(inputData)
    inputData.splice(i, 1);
    setItems(inputData);
  };

  const goPruchase = () => {
    console.log("Go to Purchase page")
    navigate('/PurchaseOrder')
  }

  return (
    <div>
      <Navbar />
      <div><h3>Add New Sales Order</h3></div>
      <div className="main__container">
        <div className="new__invoice">
          <div className="new__invoice-header">

          </div>

          {/* ========  body ========= */}
          <div className="new__invoice-body">

            <div className="form__group">
              <p>Purchase Order Number</p>
              <input type="text" ref={purchaseOrderNo} />
            </div>

            <div className="bill__to">
              <div className="form__group">
                <p>Vendor Name</p>
                <select class="form-control form-control-lg" value={data} name="data" onChange={inputHandler} >
                  <option value={''}>--Select Vendor--</option>
                  {custdata.map((cust) => <option value={cust._id + "\\" + cust.fullName} key={cust.custnumber}>{cust.fullName}</option>
                  )
                  }
                </select>
              </div>

              <div className="form__group">
                <p>Vendor Email</p>
                <input type="email" value={csdata.email} name='clientEmail' disabled="true" ref={vendorEmail} />
              </div>

              <div className="form__group">
                <p>Address</p>
                <input type="text" value={csdata.address1} ref={vendorAddress} disabled="true" />
              </div>

              <div className="form__group inline__form-group">
                <div>
                  <p>City</p>
                  <input type="text" value={csdata.city} ref={vendorCity} disabled="true" />
                </div>

                <div>
                  <p>Postal Code</p>
                  <input type="text" value={csdata.postalcode} ref={vendorPostalcode} disabled="true" />
                </div>

                <div>
                  <p>Country</p>
                  <input type="text" value={csdata.country} ref={vendorCountry} disabled="true" />
                </div>
              </div>

              <div className="form__group inline__form-group">
                <div className="inline__group">
                  <p>Purchase Order Date</p>
                  <input type="date" ref={orderDate} />
                </div>

                <div className="inline__group">
                  <p>Delivery to </p>
                  <select class="form-control form-control-lg" ref={deliveryTo}>
                    <option value={''}>--Select Deliver to--</option>
                    <option>Organization</option>
                    <option>Customer</option>
                  </select>
                </div>
              </div>
              <div className="form__group inline__form-group">
                <div className="inline__group">
                  <p>Expected Delivery Date</p>
                  <input type="date" ref={expectDeliveryDate} />
                </div>
                <div className="inline__group">
                  <p>Reference No</p>
                  <input type="text" ref={referenceNo} />
                </div>
              </div>
              <div className="form__group">
                <p>Shipment Preference</p>
                <input type="text" ref={shipmentPreference} />
              </div>
            </div>

            {/* ========= invoice product items =========*/}

            <div className="invoice__items">
              <h3>Item List</h3>
              {item?.map((item, i) => (
                <div className="item" key={i}>
                  <div className="form__group inline__form-group">
                    <div>
                      <p>Item Name</p>
                      <input
                        type="text"
                        name="name" value={item.name}
                        onChange={(e) => handlerChange(e, i)}
                      />
                    </div>

                    <div>
                      <p>Qty</p>
                      <input
                        type="text"
                        name="quantity"
                        onChange={(e) => handlerChange(e, i)}
                      />
                    </div>

                    <div>
                      <p>Price</p>
                      <input
                        type="number" value={item.sellingPrice}
                        name="sellingPrice"
                        onChange={(e) => handlerChange(e, i)}
                      />
                    </div>
                    <div>
                      <p>Total</p>
                      <h4>{item.total}</h4>
                    </div>

                    <button className="edit__btn"
                      onClick={() => deleteItem(i)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="add__item-btn"
              onClick={addItem}
            >
              Add New Item
            </button>

            <div className="new__invoice__btns">
              <button className="edit__btn"
                onClick={() => goPruchase()}
              >
                Discard
              </button>
              <div>
                <button
                  className="draft__btn"
                  onClick={() => createInvoice("draft")}
                >
                  Save as Draft
                </button>

                <button
                  className="mark__as-btn"
                  onClick={() => createInvoice("pending")}
                >
                  Send & Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPurchase
