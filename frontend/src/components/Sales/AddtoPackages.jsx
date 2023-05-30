import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './SalesNavbar'

const AddtoPackages = () => {
  const [data, setData] = useState('');
  const [itemdata, setItemdata] = useState([]);
  const { id } = useParams()
  const navigate = useNavigate();

  const packageno = useRef("");
  const trackingNo = useRef("");
  const status = useRef("");
  const date = useRef("");

  useEffect(() => {
    loadUser();
  }, [])

  const loadUser = () => {

    axios.post(`http://localhost:3002/getInvoice/`, { "_id": id })
      .then(
        (res) => {
          setData(res.data)

        }
      ).catch((error) => {
        console.log(error)
      })

    if (data._id !== '') {

      axios.post(`http://localhost:3002/getInvoiceItems/`, { "invoiceid": id })
        .then(
          (res) => {

            setItemdata(res.data)

          }
        ).catch((error) => {
          console.log(error)
        })
    }
  }

  const save = () => {
    console.log(packageno.current.value, ",", trackingNo.current.value, ",", status.current.value, ",", date.current.value)
    const packages = {
      packageno: packageno.current.value,
      salesOrderid: id,
      date: date.current.value,
      trackingNo: trackingNo.current.value,
      status: status.current.value
      
    }
    console.log("packages:  "+ packages)
    try {
      if (packageno.current.value === "" ||
        trackingNo.current.value === "" ||
        status.current.value === "" ||
        date.current.value === "") {
        alert("All fields are required. Must provide valid data");
      }
      else {
        axios.post(`http://localhost:3002/addPackage`, packages)
        .then((response) => {
          console.log(response.data)
          const newsalesPack = response.data
          
          const salesdata = {"_id":newsalesPack.salesOrderid, "packedStatus" : newsalesPack.status, "trackingNo": newsalesPack.trackingNo, "date": newsalesPack.date}
          console.log(salesdata)

          axios.put(`http://localhost:3002/updateSalesPack`, salesdata)
          .then((response) => {
              console.log(response.data)
              alert("updated Successfuly");
              navigate('/Packages')

          })
          .catch((error) => {
              console.log(error)
          })
        })
        .catch((error) => {
          console.log(error)
        })
      }
    }
    catch {

    }
  }
  return (
    <div><Navbar />
      <div></div>
      <div className="main__container">
        <div className="back__btn">
          {/* <h6 onClick={() => goSalesOrder()}> Go Back</h6> */}
        </div>

        {/* ======= invoice details header ========== */}
        <div className="invoice__details-header">
          <div>
            <p>Package Number</p>
            <input
              type="text" name="name" ref={packageno}
            />
          </div>

          <div>
            <p>Tracking No</p>
            <input type="text" required ref={trackingNo} />
          </div>
          <div>
            <p>Date</p>
            <input type="date" required ref={date} />

          </div>
          <div>
            <p>Status</p>
            <input type="text" required ref={status} />

          </div>
        </div>
        {/* ========= invoice details =========== */}

        <div className="invoice__details">
          <div className="details__box">
            <div>
              <h4>{data.salesOrderid}</h4>
              <p>{data.description}</p>
            </div>
            <div>
              <p>{data.senderName}</p>
              <p>{data.senderAddress}</p>
              <p>{data.senderCity}</p>
              <p>{data.senderPostalCode}</p>
              <p>{data.senderCountry}</p>
            </div>
          </div>

          {/* =========== details box 2 =========== */}
          <div className="details__box">
            <div>
              <div className="invoice__created-date">
                <p>Sales Order Date</p>
                <h4>{data.createdAt}</h4>
              </div>
              <div>
                <p className="invoice__payment">Payment Due</p>
                <h4>{data.paymentDue}</h4>
              </div>
            </div>

            {/* ======= invoice client address ========== */}
            <div className="invoice__client-address">
              <p>Bill to</p>
              <h4>{data.clientName}</h4>
              <div>
                <p>{data.clientAddress}</p>
                <p>{data.clientCity}</p>
                <p>{data.clientPostalcode}</p>
                <p>{data.clientCountry}</p>
              </div>
            </div>

            <div>
              <p>Send to</p>
              <h4>{data.clientEmail}</h4>
            </div>
          </div>

          {/* ========= invoice items ============= */}
          <div className="invoice__item-box">
            <ul className="list">
              <li className="list__item">
                <p className="item__name-box">Item Name</p>
                <p className="list__item-box">Qty</p>
                <p className="list__item-box">Price</p>
                <p className="list__item-box">Total</p>
              </li>

              {/* ======== invoice item ======= */}

              {itemdata.map((item, index) => (
                <li className="list__item" key={index}>
                  <div className="item__name-box">
                    <h5>{item.itemName}</h5>
                  </div>

                  <div className="list__item-box">
                    <p>{item.quantity}</p>
                  </div>
                  <div className="list__item-box">
                    <p>${item.price}</p>
                  </div>
                  <div className="list__item-box">
                    <h5>${item.totalPrice}</h5>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ========== grand total ============= */}
          <div className="grand__total">
            <h5>Grand Total</h5>
            <h2>${data.total}</h2>
          </div>
          <button className="add__item-btn" onClick={() => save()}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddtoPackages
