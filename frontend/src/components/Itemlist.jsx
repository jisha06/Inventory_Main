import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './InventoryNavbar'

const Itemlist = () => {
    const [itemdata, setData] = useState([])

    useEffect(() => {
        loadItem();
    }, [])

    const loadItem = () => {
        axios.get("http://localhost:3002/viewitems")
            .then(
                (res) => {
                    console.log(res.data)
                    setData(res.data)
                }
            ).catch((error) => {
                console.log(error)
            })
    }
    const deleteItem = (itemid) => {
        console.log(itemid)
        axios.delete("http://localhost:3002/deleteitem/" + itemid)
            .then((res) => {
                console.log(res.status)
                if (res.status == 200) {
                    alert("item Successfuly deleted")
                    window.location.reload();
                }
                else {
                    alert("error")
                }
            })
    }


    const editItem = (id) => {

    }
    return (
        <div>
            <Navbar />
            <div className='main__container'>
                <div className="py-4">
                    <h3 class="mb-3 text-center">Item Details</h3>
                    <div className="divbtn">

                        <Link to="/Additems" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Name</th>
                                <th scope="col">Unit</th>
                                <th scope="col">Dimension</th>
                                <th scope="col">Weight</th>
                                <th scope='col'>Image</th>

                            </tr>
                        </thead>
                        <tbody>
                            {itemdata.map((value, index) => (

                                <tr key={value._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{value.name}</td>
                                    <td>{value.unit}</td>
                                    <td>{value.dimensions}</td>
                                    <td>{value.weight}</td>
                                    <td>
                                            <img width='100%' height='100px' src={`http://localhost:3002/${value.image}`}/>
                                        </td>
                                    <td>
                                        <button className='btn btn-prinmary btn-success' onClick={() => deleteItem(value._id)}>Delete</button>
                                        {/* <button className='btn btn-prinmary btn-danger' onClick={() => editItem(value._id)}>Edit</button> */}
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

export default Itemlist
