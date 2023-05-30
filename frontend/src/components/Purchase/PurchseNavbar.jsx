import React from 'react'

const PurchseNavbar = () => {
  return (
    <div>
      <div class="header sticky-top">
        <nav class="navbar navbar-expand-md navbar-light">
          <a class="navbar-brand" href="">
            {/* <img src={require('./images/logo2.jpg')}  alt="..." /> */}
            <h4>Purchase</h4>
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#my-navbar">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse justify-content-end" id="my-navbar">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <a class="nav-link" href="/">Home</a>
              </li>             
              
              <li class="nav-item">
               
                <ul class="navbar-nav">
                  <li>
                    <a class="nav-link" href="/Vendor">Vendor</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/PurchaseOrder">Purchase Order</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/BillsPayment">Bills & Payment</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/VendorCredit">Vendor Credit</a>
                  </li>
                </ul>
              </li>           

            </ul>

          </div>
        </nav>
      </div>
    </div>
  )
}

export default PurchseNavbar
