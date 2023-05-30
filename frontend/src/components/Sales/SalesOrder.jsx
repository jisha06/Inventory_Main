import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './SalesNavbar'

const SalesOrder = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    loadItem();
  }, [])

  const loadItem = () => {
    axios.get("http://localhost:3002/viewinvoices")
      .then(
        (res) => {
          console.log(res.data)
          console.log(data.length, data.id)
          setData(res.data)
        }
      ).catch((error) => {
        console.log(error)
      })
  }
  const addInvoice = () => {

    navigate("/AddNewInvoice")
  }
  return (
    <div>
      <Navbar />
      <div></div>
      <div className="main__container">
        <div className="invoice__header">
          <div className="invoice__header-logo">
            <h3>Invoices</h3>
            <p>There are total {data.length} Sales Order</p>
          </div>

          <button className="btn" onClick={() => addInvoice()} >
            Add New
          </button>

        </div>

        <div className="invoice__container">
          {/* ======= invoice item =========== */}
          {data?.map((invoice) => (
            <Link to={"/SalesAddItems/" + invoice._id} >
              <div className="invoice__item">
                <div>
                  <h5 className="invoice__id">
                    {invoice.salesOrderid}
                  </h5>
                </div>

                <div>
                  <h6 className="invoice__client">{invoice.clientName}</h6>
                </div>

                <div>
                  <p className="invoice__created">{invoice.createdAt}</p>
                </div>

                <div>
                  <h3 className="invoice__total">${invoice.total}</h3>
                </div>

                {/* <div>
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
                </div> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SalesOrder
