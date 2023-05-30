import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './PurchseNavbar';

const PurchaseItems = () => {
    const [data, setData] = useState('');
    const [itemdata, setItemdata] = useState([]);
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = () => {

        axios.post(`http://localhost:3002/getPurchase/`, { "_id": id })
            .then(
                (res) => {
                    setData(res.data)

                }
            ).catch((error) => {
                console.log(error)
            })

        if (data._id !== '') {
console.log(id)
            axios.post(`http://localhost:3002/getPurchaseItems/`, { "purchaseid": id })
                .then(
                    (res) => {

                        setItemdata(res.data)
                        console.log(res.data)

                    }
                ).catch((error) => {
                    console.log(error)
                })
        }
    }

    const goSalesOrder = () => {
        navigate('/PurchaseOrder');
    }
    return (
        <div><Navbar />
            <div></div>
            <div className="main__container">
                <div className="back__btn">
                    <h6 onClick={() => goSalesOrder()}> Go Back</h6>
                </div>

                {/* ======= invoice details header ========== */}
                <div className="invoice__details-header">

                    <div className="details__btns">
                        <button
                            className="edit__btn"
                            onClick={() => goSalesOrder()}
                        >
                            Back
                        </button>
                    </div>
                </div>

                {/* ========= invoice details =========== */}

                <div className="invoice__details">
                    <div className="details__box">
                        <div>
                            <h4>{data.purchaseOrderNo}</h4>
                        </div>

                    </div>

                    {/* =========== details box 2 =========== */}
                    <div className="details__box">
                        <div>
                            <div className="invoice__created-date">
                                <p>Purchase Order Date</p>
                                <h4>{data.orderDate}</h4>
                            </div>
                            <div>
                                <p className="invoice__payment">Expected Elivery Date</p>
                                <h4>{data.expectDeliveryDate}</h4>
                            </div>
                        </div>

                        {/* ======= invoice client address ========== */}
                        <div className="invoice__client-address">
                            <p>Vendor</p>
                            <h4>{data.vendorName}</h4>
                            <div>
                                <p>{data.vendorAddress}</p>
                                <p>{data.vendorCity}</p>
                                <p>{data.vendorPostalcode}</p>
                                <p>{data.vendorCountry}</p>
                            </div>
                        </div>

                        <div>
                            <p>Send to</p>
                            <h4>{data.vendorEmail}</h4>
                        </div>
                    </div>

                    {/* ========= Purchase items ============= */}
                    <div className="invoice__item-box">
                        <ul className="list">
                            <li className="list__item">
                                <p className="item__name-box">Item Name</p>
                                <p className="list__item-box">Qty</p>
                                <p className="list__item-box">Price</p>
                                <p className="list__item-box">Total</p>
                            </li>

                            {/* ======== invoice item ======= */}

                            {itemdata.map((item, index) => (
                                <li className="list__item" key={index}>
                                    <div className="item__name-box">
                                        <h5>{item.itemName}</h5>
                                    </div>

                                    <div className="list__item-box">
                                        <p>{item.quantity}</p>
                                    </div>
                                    <div className="list__item-box">
                                        <p>${item.price}</p>
                                    </div>
                                    <div className="list__item-box">
                                        <h5>${item.totalPrice}</h5>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ========== grand total ============= */}
                    <div className="grand__total">
                        <h5>Grand Total</h5>
                        <h2>${data.total}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseItems
