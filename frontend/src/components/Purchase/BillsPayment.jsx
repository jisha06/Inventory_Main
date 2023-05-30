import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './PurchseNavbar'

function BillsPayment() {
  const navigate = useNavigate();  
  const [custdata, setData] = useState([])
  useEffect(() => {
    loadData();
}, [])

const loadData = () => {
  axios.get("http://localhost:3002/viewBills")
      .then(
          (res) => {
              console.log(res.data)
              setData(res.data)
          }
      ).catch((error) => {
          console.log(error)
      })
}

const deleteCustomer = (custid) => {
    console.log(custid)
  
    axios.delete(`http://localhost:3002/deletecustomer/` + custid)
        .then((res) => {
            console.log(res.status)
            if (res.status == 200) {
                alert("Customer Successfuly deleted")
                loadData();
            }
            else {
                alert("error")
            }
        })
        .catch((error) => {
            alert("Something went wrong")
        })
  }
  
  const editCustomer = (id) => {
  
    navigate("/EditCustomer/" + id)
  }
  return (
    <div>
      <Navbar />
            <div className='container'>
                <div className="py-4">
                    <h3 class="mb-3 text-center">Bill Payment</h3>
                    <div className="divbtn">

                        <Link to="/AddBillpayment" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Order Number</th>
                                <th scope="col">Vendor Name</th>
                                <th scope="col">Bill Date</th>
                                <th scope="col">Source of Supply</th>                              
                                <th scope='col'>Destination of Supply</th>
                                <th scope='col'>Due Date</th>
                                <th scope='col'>Payment Term</th>                             

                            </tr>
                        </thead>
                        <tbody>
                            {custdata.map((value, index) => (

                                <tr key={value._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{value.orderNo}</td>
                                    <td>{value.vendorName}</td>
                                    <td>{value.billDate}</td>
                                    <td>{value.sourceofSupply}</td>                                   
                                    <td>{value.destinationofSupply}</td>
                                    <td>{value.dueDate}</td>
                                    <td>{value.paymentTerm}</td>
                                                                     {/* <td>
                                        <button className='btn btn-prinmary btn-success' onClick={() => deleteCustomer(value._id)}>Delete</button>
                                        <button className='btn btn-prinmary btn-danger' onClick={() => editCustomer(value._id)}>Edit</button>
                                    </td> */}
                                </tr>                               
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    </div>
  )
}

export default BillsPayment

