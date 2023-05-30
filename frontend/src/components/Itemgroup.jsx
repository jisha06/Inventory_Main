import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from './InventoryNavbar';

const Itemgroup = () => {
  const [itemdata, setData] = useState([])

  useEffect(() => {
    loadItem();
  }, [])

  const loadItem = () => {
    axios.get("http://localhost:3002/viewitemgroups")
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
    axios.delete("http://localhost:3002/deleteitemgroup/" + itemid)
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
      <div className='container'>
        <div className="py-4">
          <h3 class="mb-3 text-center">Item Group Details</h3>
          <div className="divbtn">

            <Link to="/AddItemGroup" className="btn btn-success">Add New (+)</Link>
          </div>
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Item Group Number</th>
                <th scope="col">Item Group Name</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {itemdata.map((value, index) => (

                <tr key={value._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{value.itemgroupNumber}</td>
                  <td>{value.itemgroupName}</td>
                  <td>{value.description}</td>

                  <td>
                    <button className='btn btn-prinmary btn-success' onClick={() => deleteItem(value._id)}>Delete</button>                   
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

export default Itemgroup
