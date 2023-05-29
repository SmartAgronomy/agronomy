import React, { useEffect } from 'react';
import AOS from 'aos'
import "aos/dist/aos.css";
import Rotary from "../Images/rotary.jpg"
import Cultivator from "../Images/cultivator.jpeg"
import Pumps from "../Images/pumps.webp"
import Grass_cutter from "../Images/grass_cutter.webp"
import Importance from "../Images/agri-importance.jpeg"
import Market from "../Images/agri-rating.png"
import Footer from "../dashboard/footer"
import "../pages/styles/Home-footer.css"


function Main(){

     useEffect(()=>{
        AOS.init({duration: 2000})
     },[])


    return(
    <div>
       
       <div class="main" data-aos="fade-right">
          <h5>Farm Equipment Rental</h5>
           <p>We will provide farm equipment rentals to advance the productivity of your Farm<br></br>
           A great opportunity for starting an online agricultural equipment Rental Platform.</p>
           <span>Lets, grow your business....</span><br></br>
           <button>Rent Now</button>
       </div>

      <h1 class="heading">Our Brands</h1>
      <hr class="hr"></hr>
      <div class="products" data-aos="fade-up">
                <div class="item1">
                    <img class="harvestor"src={Grass_cutter} alt="not appear"/>
                    <p><b>$999</b></p>
                    <h2>Grass Cutter</h2>
                    <span>Heavy Duty Honda Grass Cutting Machine, Fuel Tank Capacity: 630ml at Rs 27000 in Dombivli</span>
                    <button class="buy">Buy Now </button>
                </div>
                <div class="item2">
                    <img class="pumps"src={Pumps} alt="not appear"/>
                    <p ><b>$9,000</b></p>
                    <h2>Eletrical Pump</h2>
                    <span>1 HP Single Phase Water Pump Motor at Rs 9000 in Sawai Madhopur | ID: 17238689491.</span>
                    <button class="buy">Buy Now</button>
                </div>

               <div class="item3">
                    <img class="rotary"src={Rotary} alt="not appear"/>
                    <p><b>$999</b></p>
                    <h2>Rotary</h2>
                    <span>Agricultural Machine Mini Power Tiller Rotary Tiller Cultivator for Nepal,helps to improve soil health</span>
                    <button class="buy">Buy Now </button>
                </div>   
                <div class="item4">
                    <img class="cultivator" src={Cultivator} alt="not appear"/>
                    <p><b>$530.00</b></p>
                    <h2 class="title">Cultivator</h2>
                    <span>Agricultural Machine Cultivator Weeder Land Cultivators for Tractor- Extra Heavy Duty Spring Loaded Cultivator </span>
                    <button id="button" class="buy">Buy Now </button>
                </div>
            </div>
            <button class="more-products">More Products &minus;&#10095;</button>
            <div class="importance" data-aos="fade-up">
               <h2>Why Digitalized Smart Agronomy ?</h2>
               <div class="importance-para"><p>The farm equipment rental market is estimated to account for a value of USD 46.8 billion in 2020 and is projected to grow at a CAGR of 7.3% from 2020, to reach a value of USD 66.4 billion by 2025. The global market is projected to witness significant growth due to factors such as the rise in the global population, shortage of skilled labor, increasing mechanization trends and rising demand for food grain products have fueled technological advancements across the globe are some of the major factors fueling the demand for farm equipment rental.<br></br>
               <br></br>Investments in various agriculture machinery have also led to increased crop production, particularly in developing countries such as India, China, Vietnam, and Thailand. <br></br><br></br>
               Renting allows you to use the equipment without having to worry about selling it when you’re done.
               You don’t have the hassle of trying to resell the equipment when you rent, which is why renting can save time and money in many cases. Renting makes it easy for you to get the equipment you need for a specific job, use it and then return it when your work is complete.</p></div>
               <img  class="agri-importance-img" src={Importance} />
            </div>
            <div class="market" data-aos="fade-up">
            <h2>Global Agricutural  Equipment Market</h2>
               <img class="agri-market-img" src={Market} />
            </div>
            
            <Footer />
            
    </div>
    
    
    )
}
export default Main;