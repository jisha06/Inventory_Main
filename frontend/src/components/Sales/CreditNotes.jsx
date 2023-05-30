import React, { useEffect, useState } from 'react'
import Navbar from './SalesNavbar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreditNotes() {
  const navigate = useNavigate();
  const [salesdata, setData] = useState([])

  useEffect(() => {
    loadSales();
  }, [])

  const loadSales = () => {
    axios.get("http://localhost:3002/returnsales")
      .then(
        (res) => {
          console.log(res.data)
          console.log(salesdata.length, salesdata.id)
          setData(res.data)
        }
      ).catch((error) => {
        console.log(error)
      })
  }

  const create = (salesid) => {
    navigate("/AddCreditNote/" + salesid)
  }
  return (
    <div>
    <Navbar />
    <div className='main__container'>
      <div className="py-4">
        <h3 class="mb-3 text-center">Sales order For Packing</h3>
        <div className="divbtn">            
        </div>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Sales Order No</th>
              <th scope="col">Order Date</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Status</th>
             
            </tr>
          </thead>
          <tbody>
            {salesdata.map((value, index) => (
              <tr key={value._id}>
                <th scope="row">{index + 1}</th>
                <td>{value.salesOrderid}</td>
                <td>{value.createdAt}</td>
                <td>{`${value.senderName},  ${value.senderAddress}, ${value.senderCity}, ${value.senderPostalCode}, ${value.senderCountry}`}</td>
                {/* <td>{value.trackingNo}</td> */}
                <td>{value.packedStatus}</td>

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

export default CreditNotes
