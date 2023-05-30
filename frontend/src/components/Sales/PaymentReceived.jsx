import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './SalesNavbar'

function PaymentReceived() {
  const [data, setData] = useState([])
  const navigate = useNavigate();
  const newDate = "";

  useEffect(() => {
    loadItem();
  }, [])

  const loadItem = () => {
    axios.get("http://localhost:3002/packedsales")
      .then(
        (res) => {
          console.log(res.data)
          console.log(data.length, data.id)
          setData(res.data)
          newDate = new Date(data.invoiceDate).toString()
        }
      ).catch((error) => {
        console.log(error)
      })
  }
  const addInvoice = () => {

    navigate("/AddInvoicepack")
  }
  return (
    <div>
      <Navbar />
      <div></div>
      <div className="main__container">
        <div className="invoice__header">
          <div className="invoice__header-logo">
            <h3>Invoices</h3>
            <p>There are total {data.length} invoices</p>
          </div>
{/* 
          <button className="btn" onClick={() => addInvoice()} >
            Add New
          </button> */}

        </div>

        <div className="invoice__container">
          {/* ======= invoice item =========== */}
          {data?.map((invoice) => (
            <Link to={"/invoiceAddItem/" + invoice._id} >
              <div className="invoice__item">
                <div>
                  <h5 className="invoice__id">
                    {data.id}
                  </h5>
                </div>
                <div>
                  <h5>Invoice id</h5>
                  <h6 className="invoice__client">{invoice.invoiceid}</h6>
                </div>
                <div>
                  <h5>Invoice date</h5>
                  <h6 className="invoice__client">{invoice.invoiceDate}</h6>
                </div>
                <div>
                  <h5>Client Name</h5>
                  <h6 className="invoice__client">{invoice.clientName}</h6>
                </div>

                <div>
                  <h5>Sales order date</h5>
                  <p className="invoice__created">{invoice.createdAt}</p>
                </div>

                <div>
                  <h5>Invoice total</h5>
                  <h3 className="invoice__total">${invoice.total}</h3>
                </div>

                <div>
                  <button
                    className={`${invoice.status === "paid"
                        ? "paid__status"
                        : invoice.status === "pending"
                          ? "pending__status"
                          : "draft__status"
                      }`}
                  >
                    {invoice.status}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PaymentReceived
