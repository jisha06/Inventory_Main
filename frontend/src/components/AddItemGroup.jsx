import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './InventoryNavbar';

const AddItemGroup = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        itemgroupNumber: '',
        itemgroupName: '',
        description: ''
    })

    const inputHandler = (event) => {
        const { name, value } = event.target
        setData((previousState) => ({
            ...previousState,
            [name]: value

        }))
    }

    const readValue = () => {
        const value = data
        console.log("addedvalue  :" + data.itemgroupNumber, data.itemgroupName)
        if (data.itemgroupNumber == '' || data.itemgroupName == '') {

            return alert("All fields are required")
        }

        axios.post(`http://localhost:3002/additemgroup`, data)
            .then((response) => {
                console.log("Post " + response.data)
                if (response.data.status == "Success") {
                    setData({
                        itemgroupNumber: '',
                        itemgroupName: '',
                        description: ''
                    })

                }
            })
            .catch((error) => {
                console.log(error)
            })
        navigate('/Itemgroup')
    }

    const backUser = () => {
        navigate('/Itemgroup')
    }

    return (
        <div>
            <Navbar/>
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                        <h3 class="text-uppercase text-center mb-5">Add New Item Group</h3>
                        <div class="card">
                            <div class="card-body p-5">
                                <form>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example4cdg">Item Group Number</label>
                                        <input type="text" id="form3Example4cdg" class="form-control form-control-lg"
                                            onChange={inputHandler}
                                            value={data.itemgroupNumber}
                                            name='itemgroupNumber' />

                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example4cdg">Item Group Name</label>
                                        <input type="text" id="form3Example4cdg" class="form-control form-control-lg"
                                            onChange={inputHandler}
                                            value={data.itemgroupName}
                                            name='itemgroupName' />
                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example4cdg">Description</label>
                                        <input type="text" id="form3Example4cdg" class="form-control form-control-lg"
                                            onChange={inputHandler}
                                            value={data.description}
                                            name='description' />
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

export default AddItemGroup
