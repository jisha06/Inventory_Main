import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './InventoryNavbar'

const AddNewAdjust = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        mode: '',
        refernceNumber: '',
        date: '',
        reason: '',
        description: '',
        item: '',
        details: ''
    })
    const [itemdata, setItem] = useState([])
    
    useEffect(() => {
        loadItem();
    }, [])

    const loadItem = () => 
    {
        axios.get("http://localhost:3002/viewitems")
            .then(
                (res) => {
                    console.log(res.data)
                    setItem(res.data)
                }
            ).catch((error) => {
                console.log(error)
            })
    }

    const inputHandler = (event) => 
    {
        const { name, value } = event.target
        setData((previousState) => ({
            ...previousState,
            [name]: value

        }))
    }
    const readValue = () => 
    {
        console.log(data)
        if (data.mode == '' || data.refernceNumber == '' || data.date == '' || data.reason == '') {

            return alert("All fields are required")
        }

        axios.post(`http://localhost:3002/addinventoryadjust`, data)
            .then((response) => {
                console.log("Post " + response.data)
                // if (response.data.status == "Success") {
                //     setData({
                //         name: '',
                //         emailid: '',
                //         password: '',
                //         location: '',
                //         position: '',
                //         salary: ''
                //     })

                // }
            })
            .catch((error) => {
                console.log(error)
            })
        navigate('/NewAdjustment')
    }




    const backUser = () => {
        navigate('/NewAdjustment')
    }
    return (
        <div>
            <Navbar />

            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                        <h3 class="text-uppercase text-center mb-5">Add New Ajustment</h3>
                        <div class="card">
                            <div class="card-body p-5">
                                <form>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example1cg">Mode of Adjustment</label>
                                        <select class="form-control form-control-lg" value={data.mode} name='mode' onChange={inputHandler}>
                                            <option value={''}>--Select Mode--</option>
                                            <option>Quantity</option>
                                            <option>Value</option>
                                        </select>

                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example4cdg">Referance Number</label>
                                        <input type="text" id="form3Example4cdg" class="form-control form-control-lg"
                                            onChange={inputHandler}
                                            value={data.refernceNumber}
                                            name='refernceNumber' />

                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example4cg">Date</label>
                                        <input type="date" id="form3Example4cg" class="form-control form-control-lg"
                                            onChange={inputHandler}
                                            value={data.date}
                                            name='date' />
                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example4cdg">Reason</label>
                                        <input type="text" id="form3Example4cdg" class="form-control form-control-lg"
                                            onChange={inputHandler}
                                            value={data.reason}
                                            name='reason' />

                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example4cdg">Description</label>
                                        <input type="text" id="form3Example4cdg" class="form-control form-control-lg"
                                            onChange={inputHandler}
                                            value={data.description}
                                            name='description' />

                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example4cdg">Item</label>
                                        <select class="form-control form-control-lg" value={data.item} name='item' onChange={inputHandler}>
                                            <option value={''}>--Select Item--</option>
                                            {itemdata.map((item) => <option value={item.name}>{item.name}</option>)}
                                        </select>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example4cdg">Details</label>
                                        <input type="text" id="form3Example4cdg" class="form-control form-control-lg"
                                            onChange={inputHandler}
                                            value={data.details}
                                            name='details' />

                                    </div>

                                    <div class="d-flex justify-content-center">
                                        <button type="button"
                                            class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={readValue}>Add</button>
                                        <button type="button"
                                            class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={backUser}>Back</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewAdjust
