import React from 'react'
import Navbar from '../InventoryNavbar'

const Inventory = () => {
  return (
    <div>
      <Navbar/>
      <div id="toursim-images" class="carousel slide carousel-fade" data-ride="carousel">
      
        <ol class="carousel-indicators">
          <li data-target="#toursim-images" data-slide-to="0" class="active"></li>
          <li data-target="#toursim-images" data-slide-to="1" class=""></li>
          <li data-target="#toursim-images" data-slide-to="2" class=""></li>
          <li data-target="#toursim-images" data-slide-to="3" class=""></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="d-block w-100" src="https://soulpageit.com/wp-content/uploads/2020/04/inventory-management-dashboard-1.jpg" alt="slide"/>
              <div class="carousel-caption d-none d-md-block">
                
                <h4>Inventory</h4>
                
              </div>
              <div class="carousel-item ">
                <img class="d-block w-100" src="inventory3.jpg" alt="slide"/>
              </div>

              <div class="carousel-item">
                <img class="d-block w-100" src="images/car_images/kerala2.jpg" alt="slide"/>
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/car_images/kerala3.jpg" alt="slide"/>
              </div>

          </div>
          <a class="carousel-control-prev" href="#toursim-images" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#toursim-images" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>

        </div>
        {/* <!-- carousel End-->*/}
        </div> 
      
    </div>
  )
}

export default Inventory
