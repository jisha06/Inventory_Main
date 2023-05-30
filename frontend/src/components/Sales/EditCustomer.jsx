import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './SalesNavbar'

const EditCustomer = () => {
    const navigate = useNavigate();
    const { custId } = useParams();

    const [vendnumber, numberchange] = useState("");
    const [fullName, namechange] = useState("");
    const [type, typechange] = useState("");
    const [creationDate, creationDateChange] = useState("");
    const [address1, addresschange] = useState("");
    const [city, citychange] = useState("");
    const [postalcode, postalcodechange] = useState("");
    const [country, countrychange] = useState("");
    const [phoneNumber, phoneNumberchange] = useState("");
    const [email, emailchange] = useState("");

    useEffect(() => {
        loadUser();
    }, [])
    const loadUser = () => {
        axios.post(`http://localhost:3002/getcustomer/` + custId)
            .then(
                (res) => {
                    numberchange(res.data.custnumber)
                    namechange(res.data.fullName)
                    typechange(res.data.type)
                    creationDateChange(res.data.creationDate)
                    addresschange(res.data.address1)
                    citychange(res.data.city)
                    postalcodechange(res.data.postalcode)
                    countrychange(res.data.country)
                    phoneNumberchange(res.data.phoneNumber)
                    emailchange(res.data.email)
                }
            ).catch((error) => {
                console.log(error)
            })
    }

    //update user
    const updateValue = (e) => {
        e.preventDefault();
        const _id = custId
        const custdata = { _id, fullName, type, creationDate, address1, city, postalcode, country, phoneNumber, email };
        console.log(custdata)
        axios.put(`http://localhost:3002/updateCustomer`, custdata)
            .then((response) => {
                console.log(response.data)
                alert("updated Successfuly");
                navigate('/Customers')

            })
            .catch((error) => {
                console.log(error)
            })
    }

    const backcustomer = () => {
        navigate('/Customers')
    }


    return (
        <div>
            <Navbar />
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                        <h3 class="text-uppercase text-center mb-5">Edit Vendor</h3>
                        <div class="card">
                            <div class="card-body p-5">
                            </div>
                            <form>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example1cg">Vendor Number</label>
                                    <input type="text" id="form3Example1cg" class="form-control form-control-lg"
                                        onChange={e => numberchange(e.target.value)} disabled="true"
                                        value={vendnumber}
                                          name='vendnumber' />

                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example3cg">FullName</label>
                                    <input type="text" id="form3Example3cg" class="form-control form-control-lg"
                                        onChange={e => namechange(e.target.value)}
                                        value={fullName}
                                        name='fullName' />

                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example3cg">Creation Date</label>
                                    <input type="text" id="form3Example3cg" class="form-control form-control-lg"
                                        onChange={e => creationDateChange(e.target.value)} disabled="true"
                                        value={creationDate}
                                        name='creationDate' />

                                </div>

                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example4cdg">Address</label>
                                    <input type="text" id="form3Example4cdg" class="form-control form-control-lg"
                                        onChange={e => addresschange(e.target.value)}
                                        value={address1}
                                        name='address1' />

                                </div>

                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example4cdg">city</label>
                                    <input type="text" class="form-control form-control-lg"
                                        onChange={e => citychange(e.target.value)}
                                        value={city}
                                        name='city' />

                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example4cdg">Postalcode</label>
                                    <input type="text" class="form-control form-control-lg"
                                        onChange={e => postalcodechange(e.target.value)}
                                        value={postalcode}
                                        name='postalcode' />

                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example4cdg">Country</label>
                                    <input type="text" class="form-control form-control-lg"
                                        onChange={e => countrychange(e.target.value)}
                                        value={country}
                                        name='country' />

                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example4cdg">Phone Number</label>
                                    <input type="number" class="form-control form-control-lg"
                                        onChange={e => phoneNumberchange(e.target.value)}
                                        value={phoneNumber}
                                        name='phoneNumber' />

                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example4cdg">E-mail</label>
                                    <input type="text" class="form-control form-control-lg"
                                        onChange={e => emailchange(e.target.value)}
                                        value={email}
                                        name='email' />

                                </div>

                                <div class="d-flex justify-content-center">
                                    <button type="button"
                                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={updateValue}>Update</button>
                                    <button type="button"
                                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={backcustomer}>Back</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCustomer
