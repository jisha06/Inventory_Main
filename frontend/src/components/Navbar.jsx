import React from 'react'

const Navbar = () => {
  return (
    <div>
      {/*<header id="header" className='fixed-top'>
            <div class="container d-flex align-item-center">
                <h1 class="logo mr-auto"><a href='#'>Inventory Management System</a></h1>

                <nav class="nav-menu d-none d-lg-block">
                    <ul>
                        <li class="active"><a href ='#'>Home</a></li>
                        <li><a href ='#'>Inventory</a></li>
                        <li><a href ='#'>Purchase</a></li>
                        <li><a href ='#'>Sales</a></li>
                        <li><a href ='#'>Report</a></li>                     
                    </ul>
                </nav>
            </div>
        </header>
      {/* <nav class="navbar fixed-top " style={{ backgroundColor:"#1E90FF"}} >
        <div class="container-fluid">
          <a class="navbar-brand" href="/"><img src={require('../imagelogo/logo_ct.png')}  alt="..." /></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Curriculum Tracker</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div> 
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="">Login</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="">Signup</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="">Curriculum</a>
                </li>
              </ul>
              <form class="d-flex mt-3" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </nav>*/}


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
                <a class="nav-link" href="Inventory">Inventory</a>               
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/Sales">Sales</a>                
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/Purchase">Purchase</a>               
              </li>
              {/* <li class="nav-item">           
                <a class="nav-link" href="">Reports</a>
              </li> */}

            </ul>

          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar