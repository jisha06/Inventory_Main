import React, { useEffect, useState } from 'react'
import Navbar from './SalesNavbar'
import axios from 'axios';

const SalesReturn = () => {
  const [salesdata, setsalesData] = useState([]);
  const [data, setData] = useState({
    salesOrderid: '',
    status: '',
    reason: '',
    date: ''
  })


  useEffect(() => {
    loadUser();
  }, [])

  const loadUser = () => {
    axios.get(`http://localhost:3002/packedsales`)
      .then(
        (res) => {
          console.log(res.data)
          setsalesData(res.data)
        }
      ).catch((error) => {
        console.log(error)
      })
  }

  const inputHandler = (event) => {
     const { name, value } = event.target
   
    setData((previousState) => ({
      ...previousState,
      [name]: value

    }))
  }

  const createReturn = () => {
   
    const sp = data.salesOrderid.split("\\")   
    console.log(sp[1], sp[0])
    const salesnewdata = {salesOrderid: sp[0],
    status: "return",
    reason: data.reason,
    date: data.date}
    console.log(salesnewdata)
  
    console.log(" data" + data.salesOrderid, data.status, data.reason, data.date)
    if (data.salesOrderid === "" || data.date === "" || data.reason === "") {
      alert("All fields are required. Must provide valid data");
    }
    else
    {
      console.log(" data" + data)
      axios.post(`http://localhost:3002/addSalesReturn`, salesnewdata)
                .then((response) => {
                    console.log(response.data)
                    let newdata = {"_id": salesnewdata.salesOrderid, "packedStatus" : "return"}
                    axios.put(`http://localhost:3002/updateSalesStatus`, newdata)
                        .then((response) => {
                            console.log(response.data)
                            alert("updated Successfuly");                           
                            loadUser();
                        })
                        .catch((error) => {
                            console.log(error)
                        })

                })
                .catch((error) => {
                    console.log(error)
                })
    }
  }
  return (
    <div>
      <Navbar />
      <div><h1>Sales Return</h1></div>
      <div className="main__container">
        <div className="new__invoice">
          <div className="bill__to">
            <p className="bill__title"></p>
            <div className="form__group">
              <p>Sales ID</p>
              <select class="form-control form-control-lg" value={data.salesOrderid} name="salesOrderid" onChange={inputHandler}>
                <option value={''}>--Select Sales Id--</option>
                {salesdata.map((sales) => <option value={sales._id + "\\" + sales.salesOrderid}>{sales.salesOrderid}</option>
                )
                }
              </select>
            </div>
            <div className="form__group">
              <p>Date</p>
              <input type="date" value={data.date} onChange={inputHandler} name='date' />

            </div>
            <div className="form__group">
              <p>Reason</p>
              <input type="text" value={data.reason} onChange={inputHandler} name='reason' />

            </div>
            <div className="form__group">
              <p>Status</p>
              <input type="text" placeholder='Return' disabled="true" onChange={inputHandler} value={data.status} name='status'  />
            </div>
          </div>
          <div className="new__invoice__btns">
            <button className="add__item-btn" onClick={() => createReturn()}>
              Save
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default SalesReturn
