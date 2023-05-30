import React from 'react'

const InventoryNavbar = () => {
  return (
    <div>
      <div class="header sticky-top">
        <nav class="navbar navbar-expand-md navbar-light">
          <a class="navbar-brand" href="">
            {/* <img src={require('./images/logo2.jpg')}  alt="..." /> */}
            <h4>Inventory Management System</h4>
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
                    <a class="nav-link" href="/Item">Item</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/Itemgroup">Item Group</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/NewAdjustment">New Adjustment</a>
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

export default InventoryNavbar
