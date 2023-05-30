import React, { useState } from 'react'
import Navbar from './SalesNavbar';

//https://www.youtube.com/watch?v=hNczF4zcu2Q 
function Invoices() {
  const [items, setItems] = useState([]);
  const deleteItem = (i) => {
    // const inputData = [...items];
    // inputData.splice(i, 1);
    // setItems(inputData);
  };
  const createInvoice = (i) => {

  }
  const handlerChange = (event, i) => {
    // const { name, value } = event.target;
    // const list = [...items];
    // list[i][name] = value;
    // list[i]["total"] = list[i]["quantity"] * list[i]["price"];
    // setItems(list);
  };

  return (
    <div>
      <Navbar/>
      <div><h1>Invoices</h1></div>
      <div className="main__container">
        <div className="new__invoice">
          <div className="new__invoice-header">
            <h3>New Invoice</h3>
          </div>
          <div className="new__invoice-body">
            {/* ======= bill from ========== */}
            <div className="bill__from">
              <p className="bill__title">Bill from</p>
              <div className="form__group">
                <p>Street Address</p>
                <input type="text" />
              </div>

              <div className="form__group inline__form-group">
                <div>
                  <p>City</p>
                  <input type="text" />
                </div>

                <div>
                  <p>Postal Code</p>
                  <input type="text" />
                </div>

                <div>
                  <p>Country</p>
                  <input type="text" />
                </div>
              </div>
            </div>

            {/* ========= bill to ========== */}
            <div className="bill__to">
              <p className="bill__title">Bill to</p>
              <div className="form__group">
                <p>Client Name</p>
                <input type="text" />
              </div>

              <div className="form__group">
                <p>Client Email</p>
                <input type="email" />
              </div>

              <div className="form__group">
                <p>Street Address</p>
                <input type="email" />
              </div>

              <div className="form__group inline__form-group">
                <div>
                  <p>City</p>
                  <input type="text" />
                </div>

                <div>
                  <p>Postal Code</p>
                  <input type="text" />
                </div>

                <div>
                  <p>Country</p>
                  <input type="text" />
                </div>
              </div>

              <div className="form__group inline__form-group">
                <div className="inline__group">
                  <p>Invoice Date</p>
                  <input type="date" />
                </div>

                <div className="inline__group">
                  <p>Payment Terms</p>
                  <input type="text" />
                </div>
              </div>

              <div className="form__group">
                <p>Project Description</p>
                <input type="text" />
              </div>
            </div>

            {/* ========= invoice product items =========*/}

            <div className="invoice__items">
              <h3>Item List</h3>
              {items?.map((item, i) => (
                <div className="item" key={i}>
                  <div className="form__group inline__form-group">
                    <div>
                      <p>Item Name</p>
                      <input
                        type="text"
                        name="name"
                        onChange={(e) => handlerChange(e, i)}
                      />
                    </div>

                    <div>
                      <p>Qty</p>
                      <input
                        type="number"
                        name="quantity"
                        onChange={(e) => handlerChange(e, i)}
                      />
                    </div>

                    <div>
                      <p>Price</p>
                      <input
                        type="number"
                        name="price"
                        onChange={(e) => handlerChange(e, i)}
                      />
                    </div>
                    <div>
                      <p>Total</p>
                      <h4>{item.total}</h4>
                    </div>

                    <button className="edit__btn" onClick={() => deleteItem(i)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="add__item-btn">
              Add New Item
            </button>

            <div className="new__invoice__btns">
              <button className="edit__btn" >
                Discard
              </button>
              <div>
                <button
                  className="draft__btn"
                  onClick={() => createInvoice("draft")}
                >
                  Save as Draft
                </button>

                <button
                  className="draft__btn"
                  onClick={() => createInvoice("pending")}
                >
                  Send & Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Invoices
