import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './SalesNavbar'

const InvoiceAddItem1 = () => {
  const [data, setData] = useState('');
  const [itemdata, setItemdata] = useState([]);
  const { id } = useParams()
  const navigate = useNavigate();

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

  // update invoice status in database
  const updateStatus = (invoiceId) => {
    const newStatus = "paid";
    console.log("updating status: " + data.status)
    axios
      .put(`http://localhost:3002/updateStatus/${id}/status`, {
        status: newStatus
      })
      .then(response => {

        window.location.reload();
      })
      .catch(error => console.log(error));
  };

  // delete invoice from the database
  const deleteInvoice = (invoiceId) => {

    axios.delete(`http://localhost:3002/deleteInvoice/${invoiceId}`)
      .then((res) => {

        if (res.status == 200) {
          alert("Invoice Successfuly deleted")
          navigate('/Invoices1');
        }
        else {
          alert("error")
        }
      })
      .catch((error) => {
        alert("Something went wrong")
      })

  };

  const goBack = () => {
    navigate('/Invoices1');
  }
  return (
    <div><Navbar />
    <div><h1>Invoices</h1></div>
      <div className="main__container">
        <div className="back__btn">
          <h6 onClick={() => goBack()}> Go Back</h6>
        </div>

        {/* ======= invoice details header ========== */}
        <div className="invoice__details-header">
          <div className="details__status">
            <p>Status</p>

            <button
              className={`${data.status === "paid"
                ? "paid__status"
                : data.status === "pending"
                  ? "pending__status"
                  : "draft__status"
                }`}
            >
              {data.status}
            </button>
          </div>

          <div className="details__btns">
            {/* <button
              className="edit__btn" 
            //   onClick={() => router.push(`/edit/${data.id}`)}
             > 
               Edit
            </button> */}

            {/* ========= confirm deletion modal start ========== */}
            <div className="delete__modal" >
              <div className="modal">
                <h3>Confirm Deletion</h3>
                <p>
                  Are you sure you want to delete invoice #
                  {data.id}? This action cannon be
                  undone.
                </p>

                <div className="details__btns modal__btns">
                  <button className="edit__btn">
                    Cancel
                  </button>

                  <button
                    className=""

                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>

            {/* ======== confirm deletion modal end */}

            {/* <button className="delete__btn"
              onClick={() => deleteInvoice(id)}
            >
              Delete
            </button> */}

            <button
              onClick={() => updateStatus(data.id)}
              className={`${data.status === "paid" || data.status === "draft" ? "disable" : ""
                }  mark__as-btn`}
            >
              Mark as Paid
            </button>
          </div>
        </div>

        {/* ========= invoice details =========== */}

        <div className="invoice__details">
          <div className="details__box">
            <div>
              <h4>{data.id}</h4>
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
                <p>Invoice Date</p>
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
        </div>
      </div>
    </div>
  )
}

export default InvoiceAddItem1
