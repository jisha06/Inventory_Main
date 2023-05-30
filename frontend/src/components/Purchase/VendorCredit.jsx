import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './PurchseNavbar'

const VendorCredit = () => {
  const navigate = useNavigate();
  const [purdata, setData] = useState([])

  useEffect(() => {
    loadSales();
  }, [])

  const loadSales = () => {
    axios.get("http://localhost:3002/returnPurchase")
      .then(
        (res) => {
          console.log(res.data)
          console.log(purdata.length, purdata.id)
          setData(res.data)
        }
      ).catch((error) => {
        console.log(error)
      })
  }

  const create = (salesid) => {
    navigate("/AddVendorCredit/" + salesid)
  }
  return (
    <div>
    <Navbar />
    <div className='main__container'>
      <div className="py-4">
        <h3 class="mb-3 text-center">Vendor Credit</h3>
        <div className="divbtn">            
        </div>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Purchase Order Number</th>
              <th scope="col">Order Date</th>
              <th scope="col">Vendor Name</th>
              <th scope="col">Status</th>
             
            </tr>
          </thead>
          <tbody>
            {purdata.map((value, index) => (
              <tr key={value._id}>
                <th scope="row">{index + 1}</th>
                <td>{value.purchaseOrderNo}</td>
                <td>{value.orderDate}</td>
                <td>{`${value.vendorName},  ${value.vendorAddress}, ${value.vendorCity}, ${value.vendorPostalcode}, ${value.vendorCountry}`}</td>
                {/* <td>{value.trackingNo}</td> */}
                <td>{value.status}</td>

                <td>
                  {value.trackingNo!==""?<button id="packBt" className='btn btn-prinmary btn-success' onClick={() => create(value._id)}>Add Credit</button> : null}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  </div>
  )
}

export default VendorCredit
