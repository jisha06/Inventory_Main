import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './PurchseNavbar';

const AddVendorCredit = () => {
  const [data, setData] = useState('');
    const [itemdata, setItemdata] = useState([]);
    const { id } = useParams()
    const navigate = useNavigate();

    const creditId = useRef("");
    const creditNoteDate = useRef("");
    const reason = useRef("");
    
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

            axios.post(`http://localhost:3002/getPurchaseItems/`, { "purchaseid": id })
                .then(
                    (res) => {

                        setItemdata(res.data)

                    }
                ).catch((error) => {
                    console.log(error)
                })
        }
    }
    const save = () => {
        
        const creditedval = {purchaseOrderid: id, 
                            creditId:creditId.current.value,
                            creditNoteDate: creditNoteDate.current.value, 
                            reason: reason.current.value,
                            vendorName: data.vendorName }
        console.log(creditedval)
        if (creditId.current.value === "" || creditNoteDate.current.value === "" ) {
            alert("All fields are required. Must provide valid data");
        }
        else {
            axios.post(`http://localhost:3002/addVendorCredit`, creditedval)
                .then((response) => {
                    console.log(response.data)
                    let data = {"_id": id, "status" : "credited"}
                    axios.put(`http://localhost:3002/updatePurchaseStatus`, data)
                        .then((response) => {
                            console.log(response.data)
                            alert("updated Successfuly");
                            navigate('/VendorCredit')

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
    <div><Navbar />
    <div></div>
    <div className="main__container">
        <div className="back__btn">
            {/* <h6 onClick={() => goSalesOrder()}> Go Back</h6> */}
        </div>

        {/* ======= invoice details header ========== */}
        <div className="invoice__details-header">
            <div>
                <p>Credit Note No</p>
                <input
                    type="text" name="name" ref={creditId}
                />
            </div>

            <div>
                <p>Credit Date</p>
                <input type="date" required ref={creditNoteDate} />

            </div>
            <div>
                <p>Reason</p>
                <input
                    type="text" name="name" ref={reason}
                />
            </div>

        </div>
        {/* ========= invoice details =========== */}

        <div className="invoice__details">
            <div className="details__box">
                <div>
                    <h4>{data.purchaseOrderid}</h4>
                   
                </div>
                <div>
                   
                </div>
            </div>

            {/* =========== details box 2 =========== */}
            <div className="details__box">
                <div>
                    <div className="invoice__created-date">
                        <p>Purchase Order Date</p>
                        <h4>{data.orderDate}</h4>
                    </div>
                    {/* <div className="invoice__created-date">
                        <p>Vendor Name </p>
                        <h4>{data.vendorName}</h4>
                    </div> */}
                    <div className="invoice__created-date">
                        <p>Reference Number </p>
                        <h4>{data.referenceNo}</h4>
                    </div>
                </div>

                {/* ======= invoice client address ========== */}
                <div className="invoice__client-address">
                 
                    <h4>{data.vendorName}</h4>
                    <div>
                        <p>{data.vendorAddress}</p>
                        <p>{data.vendorCity}</p>
                        <p>{data.vendorPostalcode}</p>
                        <p>{data.vendorCountry}</p>
                    </div>
                </div>
                
            </div>

            {/* ========= invoice items ============= */}
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
            <button className="add__item-btn" onClick={() => save()}>
                Save
            </button>
        </div>
    </div>
</div>
  )
}

export default AddVendorCredit
