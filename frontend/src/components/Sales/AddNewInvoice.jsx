import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './SalesNavbar'

const AddNewInvoice = () => {
  const navigate = useNavigate();
  const [item, setItems] = useState([]);
  const [custdata, setcustData] = useState([])
  const [csdata, setCsData] = useState([]);
  const [data, setData] = useState('');
  const [indata, setinData] = useState([]);

  const invoiceid = useRef("");
  const salesOrderid = useRef(""); 
  const senderName = useRef("");
  const senderCity = useRef("");
  const senderPostalCode = useRef("");
  const senderCountry = useRef("");
  const senderAddress = useRef("");
  const clientAddress = useRef("");
  const clientName = useRef("");
  const clientCity = useRef("");
  const clientPostalcode = useRef("");
  const clientCountry = useRef("");
  const clientEmail = useRef("");
  const description = useRef("");
  const createdAt = useRef("");
  const paymentDue = useRef("");
  const items = useRef("");
  const total = useRef("");
  const status = useRef("");

  useEffect(() => {
    loadCustomer();
  }, [])

  const loadCustomer = () => {
    axios.get("http://localhost:3002/viewCustomers")
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
    axios.post(`http://localhost:3002/getcustomer/` + sp[0])
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

    const invoice = {
      // invoiceid: invoiceid.current.value,
   
      salesOrderid: salesOrderid.current.value, 
      senderName: senderName.current.value,
      senderAddress: senderAddress.current.value,
      senderCity: senderCity.current.value,
      senderPostalCode: senderPostalCode.current.value,
      senderCountry: senderCountry.current.value,
      clientName: data,
      clientAddress: clientAddress.current.value,
      clientEmail: clientEmail.current.value,
      clientCity: clientCity.current.value,
      clientPostalcode: clientPostalcode.current.value,
      clientCountry: clientCountry.current.value,
      description: description.current.value,
      createdAt: createdAt.current.value,
      items: item.length,
      total: totalAmount1,
      status: status
    }
    console.log(invoice)

    try {
      if (salesOrderid.current.value === "" ||
        senderName.current.value === "" ||
        senderAddress.current.value === "" ||
        senderCity.current.value === "" ||
        senderPostalCode.current.value === "" ||
        senderCountry.current.value === "" ||
        // clientName.current.value === "" ||
        clientAddress.current.value == "" ||
        clientEmail.current.value === "" ||
        clientCity.current.value === "" ||
        clientPostalcode.current.value === "" ||
        clientCountry.current.value === "" ||
        description.current.value === "" ||
        createdAt.current.value === "" ||
        items.length === 0
      ) {
        alert("All fields are required. Must provide valid data");
      } else {
        console.log(invoice)
        axios.post(`http://localhost:3002/addInvoice`, invoice)
          .then((response) => {
            const newInvoice = response.data
            // alert("Invoice created Successfuly");
            console.log("Invoice Details:   " + newInvoice._id)
            console.log(" Item length" + item.length)
            console.log(item)
            if (item.length !== 0) {
              for (var i = 0; i < item.length; i++) {
                console.log(i)
                const invid = newInvoice._id
                const invNumber = newInvoice.invoiceid
                const itemName1 = item[i].name
                const itquantity = item[i].quantity
                const itprice = item[i].sellingPrice
                const ittotal = item[i].total
                const inItemData = { "invoiceid": invid, "invoiceNumber": invNumber, "itemName": itemName1, "quantity": itquantity, "price": itprice, "totalPrice": ittotal };
                console.log(inItemData)
                axios.post(`http://localhost:3002/addInvoiceItems`, inItemData)
                  .then((response) => {
                    console.log(response.status)
                    if (response.status != 500) {
                      navigate('/SalesOrder')
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
        navigate('/SalesOrder')
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

  const goInvoice = () => {
    console.log("Go to sales page")
    navigate('/SalesOrder')
  }

  return (
    <div>
      <Navbar />
      <div><h3>Add New Sales Order</h3></div>
      <div className="main__container">
        <div className="new__invoice">
          <div className="new__invoice-header">
            {/* <h3>New Invoice</h3> */}
          </div>

          {/* ======== new invoice body ========= */}
          <div className="new__invoice-body">
            {/* ======= bill from ========== */}
            <div className="form__group">
              <p>Sales Order Number</p>
              <input type="text" ref={salesOrderid} />
            </div>
            <div className="bill__from">
              <p className="bill__title">Bill from</p>
              <div className="form__group">
                <p>Sender Name</p>
                <input type="text" ref={senderName} />
              </div>
              <div className="form__group">
                <p>Street Address</p>
                <input type="text" ref={senderAddress} />
              </div>


              <div className="form__group inline__form-group">
                <div>
                  <p>City</p>
                  <input type="text" ref={senderCity} />
                </div>

                <div>
                  <p>Postal Code</p>
                  <input type="text" ref={senderPostalCode} />
                </div>

                <div>
                  <p>Country</p>
                  <input type="text" ref={senderCountry} />
                </div>
              </div>
            </div>

            {/* ========= bill to ========== */}
            <div className="bill__to">
              <p className="bill__title">Bill to</p>
              <div className="form__group">
                <p>Client Name</p>
                <select class="form-control form-control-lg" value={data} namd="data" onChange={inputHandler} >
                  <option value={''}>--Select Customer--</option>
                  {custdata.map((cust) => <option value={cust._id + "\\" + cust.fullName} key={cust.custnumber}>{cust.fullName}</option>
                  )
                  }
                </select>
              </div>

              <div className="form__group">
                <p>Client Email</p>
                <input type="email" value={csdata.email} name='clientEmail' disabled="true" ref={clientEmail} />
              </div>

              <div className="form__group">
                <p>Street Address</p>
                <input type="text" value={csdata.address1} ref={clientAddress} disabled="true" />
              </div>

              <div className="form__group inline__form-group">
                <div>
                  <p>City</p>
                  <input type="text" value={csdata.city} ref={clientCity} disabled="true" />
                </div>

                <div>
                  <p>Postal Code</p>
                  <input type="text" value={csdata.postalcode} ref={clientPostalcode} disabled="true" />
                </div>

                <div>
                  <p>Country</p>
                  <input type="text" value={csdata.country} ref={clientCountry} disabled="true" />
                </div>
              </div>

              <div className="form__group inline__form-group">
                <div className="inline__group">
                  <p>Sales Order Date</p>
                  <input type="date" ref={createdAt} />
                </div>

                <div className="inline__group">
                  <p>Payment Due</p>
                  <input type="date" ref={paymentDue} />
                </div>
              </div>

              <div className="form__group">
                <p>Project Description</p>
                <input type="text" ref={description} />
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
                onClick={() => goInvoice()}
              >
                Discard
              </button>
              <div>
                {/* <button
                  className="draft__btn"
                  onClick={() => createInvoice("draft")}
                >
                  Save as Draft
                </button> */}

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

export default AddNewInvoice
