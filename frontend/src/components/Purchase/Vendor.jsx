
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from'./PurchseNavbar'

const Vendor = () => {
  const navigate = useNavigate();
  const [venddata, setData] = useState([])
  
  useEffect(() => {
    loadVendor();
}, [])

const loadVendor = () => {
  axios.get("http://localhost:3002/viewVendors")
      .then(
          (res) => {          
              setData(res.data)
          }
      ).catch((error) => {
          console.log(error)
      })
}

const deleteVendor = (vendid) => {
  console.log(vendid)

  axios.delete(`http://localhost:3002/deletevendor/` + vendid)
      .then((res) => {
          console.log(res.status)
          if (res.status == 200) {
              alert("Vendor Successfuly deleted")
              loadVendor();
          }
          else {
              alert("error")
          }
      })
      .catch((error) => {
          alert("Something went wrong")
      })
}

const editVendor = (id) => {

  navigate("/EditVendor/" + id)
}

  return (
    <div>
      <Navbar />
            <div className='container'>
                <div className="py-4">
                    <h3 class="mb-3 text-center">Vendor Details</h3>
                    <div className="divbtn">

                        <Link to="/AddVendor" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Vendor Number</th>
                                <th scope="col">Full Name</th>                             
                                <th scope="col">Creation Date</th>
                                <th scope='col'>Address1</th>
                                <th scope='col'>City</th>
                                <th scope='col'>Postalcode</th>
                                <th scope='col'>Country</th>
                                <th scope='col'>Phone Number</th>
                                <th scope='col'>Email</th>

                            </tr>
                        </thead>
                        <tbody>
                            {venddata.map((value, index) => (

                                <tr key={value._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{value.vendnumber}</td>
                                    <td>{value.fullName}</td>                                  
                                    <td>{value.creationDate}</td>
                                    <td>{value.address1}</td>
                                    <td>{value.city}</td>
                                    <td>{value.postalcode}</td>
                                    <td>{value.country}</td>
                                    <td>{value.phoneNumber}</td>
                                    <td>{value.email}</td>
                                  
                                    <td>
                                        <button className='btn btn-prinmary btn-success' onClick={() => deleteVendor(value._id)}>Delete</button>
                                        <button className='btn btn-prinmary btn-danger' onClick={() => editVendor(value._id)}>Edit</button>
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

export default Vendor
