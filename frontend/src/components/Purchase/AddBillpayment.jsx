import React, { useEffect, useState } from 'react'
import Navbar from './PurchseNavbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBillpayment = () => {
    const navigate = useNavigate();
    const [purchasedata, setpurchaseData] = useState([]);
    const [data, setData] = useState({
        vendorName: '',
        sourceofSupply: '',
        destinationofSupply: '',
        billNo: '',
        purchaseOrderNo: '',
        purchaseOrderid: '',
        billDate: '',
        dueDate: '',
        paymentTerm: ''
    })


    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = () => {
        axios.get(`http://localhost:3002/purchaseOrder`)
            .then(
                (res) => {
                    console.log(res.data)
                    setpurchaseData(res.data)
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
        console.log(purchasedata)
        const sp = data.purchaseOrderNo.split("\\")
        console.log(sp[1], sp[0], sp[2])
        const purnewdata = {
            vendorName: sp[2],
            sourceofSupply: data.sourceofSupply,
            destinationofSupply: data.destinationofSupply,
            billNo: data.billNo,
            purchaseOrderNo: sp[1],
            purchaseOrderid: sp[0],
            billDate: data.billDate,
            dueDate: data.dueDate,
            paymentTerm: data.paymentTerm
        }
        console.log(purnewdata)

        if (data.billNo === "" || data.billDate === "" || data.paymentTerm === "") {
            alert("All fields are required. Must provide valid data");
        }
        else {
            console.log(" data" + data)
            axios.post(`http://localhost:3002/addBill`, purnewdata)
                .then((response) => {
                    console.log(response.data)
                    let newdata = { "_id": purnewdata.purchaseOrderid, "status": "close" }
                    axios.put(`http://localhost:3002/updatePurchaseStatus`, newdata)
                        .then((response) => {
                            console.log(response.data)
                            alert("updated Successfuly");
                            navigate("/BillsPayment")
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

    const goOrder = ()=>{
        navigate("/BillsPayment")
    }

    return (
        <div>
            <Navbar />
            <div><h1>Bill Payment</h1></div>
            <div className="main__container">
                <div className="new__invoice">
                    <div className="bill__to">
                        <p className="bill__title"></p>
                        <div className="form__group">
                            <p>Purchase Order ID</p>
                            <select class="form-control form-control-lg" value={data.purchaseOrderNo} name="purchaseOrderNo" onChange={inputHandler}>
                                <option value={''}>--Select Purchase order Id--</option>
                                {purchasedata.map((purch) => <option value={purch._id + "\\" + purch.purchaseOrderNo + "\\" + purch.vendorName}>{purch.purchaseOrderNo}</option>
                                )
                                }
                            </select>
                        </div>
                        <div className="form__group">
                            <p>Bill Number</p>
                            <input type="text" value={data.billNo} onChange={inputHandler} name='billNo' />

                        </div>
                        <div className="form__group">
                            <p>Bill Date</p>
                            <input type="date" value={data.billDate} onChange={inputHandler} name='billDate' />

                        </div>
                        <div className="form__group">
                            <p>Source of Supply</p>
                            <input type="text" value={data.sourceofSupply} onChange={inputHandler} name='sourceofSupply' />

                        </div>
                        <div className="form__group">
                            <p>Destination of Supply</p>
                            <input type="text" value={data.destinationofSupply} onChange={inputHandler} name='destinationofSupply' />

                        </div>

                        <div className="form__group">
                            <p>Due Date</p>
                            <input type="date" value={data.dueDate} onChange={inputHandler} name='dueDate' />

                        </div>
                        <div className="form__group">
                            <p>Payment Term</p>
                            <input type="text" value={data.paymentTerm} onChange={inputHandler} name='paymentTerm' />

                        </div>

                    </div>
                    <div className="new__invoice__btns">
                        <button className="edit__btn" onClick={() => goOrder()} >
                            Discard
                        </button>
                        <div>
                            <button className="mark__as-btn"   onClick={() => createReturn()}>
                                Save
                            </button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default AddBillpayment
