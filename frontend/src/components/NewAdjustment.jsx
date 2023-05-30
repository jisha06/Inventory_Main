import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './InventoryNavbar'

const NewAdjustment = () => {
    const [adjustdata, setData] = useState([])

    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
        axios.get("http://localhost:3002/viewinventoryAdjust")
            .then(
                (res) => {
                    console.log(res.data)
                    setData(res.data)
                }
            ).catch((error) => {
                console.log(error)
            })
    }
  return (
    <div>
      <Navbar />
            <div className='container'>
                <div className="py-4">
                    <h3 class="mb-3 text-center">New Adjustment Details</h3>
                    <div className="divbtn">

                        <Link to="/AddAdjustment" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Mode</th>
                                <th scope="col">Reference Number</th>
                                <th scope="col">Date</th>
                                <th scope="col">Reason</th>
                                <th scope='col'>Description</th>
                                <th scope='col'>Item</th>
                                <th scope='col'>Details</th>

                            </tr>
                        </thead>
                        <tbody>
                            {adjustdata.map((value, index) => (

                                <tr key={value._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{value.mode}</td>
                                    <td>{value.refernceNumber}</td>
                                    <td>{value.date}</td>
                                    <td>{value.reason}</td>
                                    <td>{value.description}</td>
                                    <td>{value.item}</td>
                                    <td>{value.details}</td>
                                    <td>
                                        {/* <button className='btn btn-prinmary btn-success' onClick={() => deleteItem(value._id)}>Delete</button>
                                        <button className='btn btn-prinmary btn-danger' onClick={() => editItem(value._id)}>Edit</button> */}
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

export default NewAdjustment
