import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './PurchseNavbar';
const AddVendor = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        vendnumber: '',
        fullName: '',
        creationDate: '',
        address1: '',
        city: '',
        postalcode: 0,
        country: '',
        phoneNumber: 0,
        email: ''
    })

    const inputHandler = (event) => {
        const { name, value } = event.target
        setData((previousState) => ({
            ...previousState,
            [name]: value

        }))
    }

    const readValue = () => {
        console.log(data)
        console.log("addedvalue  :" + data.vendnumber, data.fullName, data.creationDate, data.address1, data.city, data.postalcode, data.country, data.phoneNumber, data.email)
        if (data.fullName == '' || data.vendnumber == '' || data.creationDate == '' || data.address1 == '') {

            return alert("All fields are required")
        }

        axios.post(`http://localhost:3002/addVendors`, data)
            .then((response) => {
                console.log("Post " + response.data)
                if (response.data.status == "Success") {
                    setData({
                        vendnumber: '',
                        fullName: '',
                        creationDate: '',
                        address1: '',
                        phoneNumber: 0,
                        email: ''
                    })

                }
            })
            .catch((error) => {
                console.log(error)
            })
        navigate('/Vendor')
    }

    const backUser = () => {
        navigate('/Vendor')
    }

    return (
        <div>
            <Navbar />
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                        <h3 class="text-uppercase text-center mb-5">Add Vendor</h3>
                        <div class="card">
                            <div class="card-body p-5">
                                <form>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example4cdg">Vendor Number</label>
                                        <input type="text" id="form3Example4cdg" class="form-control form-control-lg"
                                            onChange={inputHandler}
                                            value={data.vendnumber}
                                            name='vendnumber' />

                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example4cdg">Full Name</label>
                                        <input type="text" id="form3Example4cdg" class="form-control form-control-lg"
                                            onChange={inputHandler}
                                            value={data.fullName}
                                            name='fullName' />
                                            </div>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example4cg">Creation Date</label>
                                            <input type="date" id="form3Example4cg" class="form-control form-control-lg"
                                                onChange={inputHandler}
                                                value={data.creationDate}
                                                name='creationDate' />
                                        </div>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example4cdg">Address1</label>
                                            <input type="text" id="form3Example4cdg" class="form-control form-control-lg"
                                                onChange={inputHandler}
                                                value={data.address1}
                                                name='address1' />
                                        </div>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example4cdg">City</label>
                                            <input type="text" id="form3Example4cdg" class="form-control form-control-lg"
                                                onChange={inputHandler}
                                                value={data.city}
                                                name='city' />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example4cdg">Postalcode</label>
                                            <input type="number" id="form3Example4cdg" class="form-control form-control-lg"
                                                onChange={inputHandler}
                                                value={data.postalcode}
                                                name='postalcode' />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example4cdg">Country</label>
                                            <input type="text" id="form3Example4cdg" class="form-control form-control-lg"
                                                onChange={inputHandler}
                                                value={data.country}
                                                name='country' />
                                        </div>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example4cdg">Phone Number</label>
                                            <input type="number" id="form3Example4cdg" class="form-control form-control-lg"
                                                onChange={inputHandler}
                                                value={data.phoneNumber}
                                                name='phoneNumber' />

                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example4cdg">Email</label>
                                            <input type="text" id="form3Example4cdg" class="form-control form-control-lg"
                                                onChange={inputHandler}
                                                value={data.email}
                                                name='email' />

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

export default AddVendor
