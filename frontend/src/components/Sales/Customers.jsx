import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './SalesNavbar'

const Customers = () => {
    const navigate = useNavigate();  
  const [custdata, setData] = useState([])
  useEffect(() => {
    loadCustomer();
}, [])

const loadCustomer = () => {
  axios.get("http://localhost:3002/viewCustomers")
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
                loadCustomer();
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
                    <h3 class="mb-3 text-center">Customer Details</h3>
                    <div className="divbtn">

                        <Link to="/AddCustomers" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Customer Number</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">Type</th>
                                <th scope="col">Creation Date</th>                              
                                <th scope='col'>Address</th>
                                <th scope='col'>City</th>
                                <th scope='col'>Postalcode</th>
                                <th scope='col'>Country</th>
                                <th scope='col'>Phone Number</th>
                                <th scope='col'>Email</th>

                            </tr>
                        </thead>
                        <tbody>
                            {custdata.map((value, index) => (

                                <tr key={value._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{value.custnumber}</td>
                                    <td>{value.fullName}</td>
                                    <td>{value.type}</td>
                                    <td>{value.creationDate}</td>                                   
                                    <td>{value.address1}</td>
                                    <td>{value.city}</td>
                                    <td>{value.postalcode}</td>
                                    <td>{value.country}</td>
                                    <td>{value.phoneNumber}</td>
                                    <td>{value.email}</td>
                                  
                                    <td>
                                        <button className='btn btn-prinmary btn-success' onClick={() => deleteCustomer(value._id)}>Delete</button>
                                        <button className='btn btn-prinmary btn-danger' onClick={() => editCustomer(value._id)}>Edit</button>
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

export default Customers
