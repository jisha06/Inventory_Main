import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './PurchseNavbar'

function PurchaseOrder() {
  const [data, setData] = useState([])
  const navigate = useNavigate();
  const newDate = "";

  useEffect(() => {
    loadItem();
  }, [])

  const loadItem = () => {
    axios.get("http://localhost:3002/getpurchase")
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
  const addPurchase = () => {

    navigate("/AddPurchase")
  }

  const viewOrder = (id)=>{
    navigate("/PurchaseItems/" + id)
  }
  return (
    <div>
      <Navbar />
      <div></div>
      <div className="main__container">
        <div className="invoice__header">
          <div className="invoice__header-logo">
            <h3>Purchase</h3>
            <p>There are total {data.length} Purchase Order</p>
          </div>

          <button className="btn" onClick={() => addPurchase()} >
            Add New
          </button>

        </div>
        <div className="py-4">
          <h3 class="mb-3 text-center">Purchase Order</h3>
          <div className="divbtn">
          </div>
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Order Date</th>
                <th scope="col">Order Number</th>
                <th scope="col">Vendor Name</th>
                <th scope="col">Status</th>
                <th scope="col">Billed Status</th>
                <th scope="col">Amount</th>
                <th scope="col">Expected Delivery Date</th>

              </tr>
            </thead>
            <tbody>
              {data.map((value, index) => (
                <tr key={value._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{value.orderDate}</td>
                  <td>{value.purchaseOrderNo}</td>
                  <td>{value.vendorName}</td>
                  <td>{value.status}</td>
                  <td>{value.billStatus}</td>
                  <td>{value.total}</td>
                  <td>{value.expectDeliveryDate}</td>
                  <td>
                    <button className='btn btn-prinmary btn-success' onClick={() => viewOrder(value._id)}>View</button>
                  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <div className="invoice__container">
        
          {data?.map((purchase) => (
            <Link to={"/AddPurchase/" + purchase._id} >
              <div className="invoice__item">
                <div>
                  <h5 className="invoice__id">
                    {data.id}
                  </h5>
                </div>
                <div>
                  <h5>Order Date</h5>
                  <h6 className="invoice__client">{purchase.date}</h6>
                </div>
                <div>
                  <h5></h5>
                  <h6 className="invoice__client">{purchase.purchaseOrderNo}</h6>
                </div>
                <div>
                  <h5>Client Name</h5>
                  <h6 className="invoice__client">{purchase.vendorName}</h6>
                </div>

                <div>
                  <h5>Sales order date</h5>
                  <p className="invoice__created">{purchase.status}</p>
                </div>

                <div>
                  <h5>Invoice total</h5>
                  <h3 className="invoice__total">${invoice.total}</h3>
                </div>
                <div>
                  <h5>Expected Delivery Date</h5>
                  <h3 className="invoice__total">${invoice.expectDeliveryDate}</h3>
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
        </div> */}
      </div>
    </div>
  )
}


export default PurchaseOrder
