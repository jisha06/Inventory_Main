import React from 'react'

const SalesNavbar = () => {
    return (
        <div>
            <div class="header sticky-top">
                <nav class="navbar navbar-expand-md navbar-light">
                    <a class="navbar-brand" href="">
                        {/* <img src={require('./images/logo2.jpg')}  alt="..." /> */}
                        <h4>Sales</h4>
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
                                        <a class="nav-link" href="/Customers">Customers</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="SalesOrder">Sales Orders</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/Packages">Packages</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/DeliveryChallan">Delivery Challans</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/Invoices1">Invoices</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/PaymentReceived">Payment Received</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/SalesReturn">Sales Return</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/CreditNotes">Credit notes</a>
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

export default SalesNavbar
