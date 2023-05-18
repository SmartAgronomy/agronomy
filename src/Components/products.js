import Header from "./dashboard/header";
import Products_Footer from "./products-footer";
import "./styles/products.css"
import _products_cat from "./Images/1.1-products-cat.png"
import __products_cat from "./Images/1.2-products-cat.webp"
import ___products_cat from "./Images/1.3-products-cat.webp"
import ____products_cat from "./Images/1.4-products-cat.webp"
import _____products_cat from "./Images/1.5-products-cat.webp"

function Products(){
    return(
        <div>
            <Header/>
            <div class="products-head"> <h1>Choose by Categories</h1></div>
            <div class="one-cat">
                <div class="one-cat-head">
                   <label>Farm Machineries..</label>
                   <button>View All</button>
                </div>
                <div class="img">
                    <img src={_products_cat} />
                    <img src={__products_cat} />
                    <img src={___products_cat} />
                    <img src={____products_cat} />
                    <img src={_____products_cat} />
               </div>
            </div>

            <div class="one-cat">
                <div class="one-cat-head">
                   <label>Pumps and Motors..</label>
                   <button>View All</button>
                </div>
                <div class="img">
                    <img src={_products_cat} />
                    <img src={__products_cat} />
                    <img src={___products_cat} />
                    <img src={____products_cat} />
                    <img src={_____products_cat} />
               </div>
            </div>

        
            <div class="one-cat">
                <div class="one-cat-head">
                   <label>Electrical Power Equipments..</label>
                   <button>View All</button>
                </div>
                <div class="img">
                    <img src={_products_cat} />
                    <img src={__products_cat} />
                    <img src={___products_cat} />
                    <img src={____products_cat} />
                    <img src={_____products_cat} />
               </div>
            </div>

            <div class="one-cat">   
                <div class="one-cat-head">
                   <label>Crop Processors..</label>
                   <button>View All</button>
                </div>
                <div class="img">
                    <img src={_products_cat} />
                    <img src={__products_cat} />
                    <img src={___products_cat} />
                    <img src={____products_cat} />
                    <img src={_____products_cat} />
               </div>
            </div>
           
            <Products_Footer />
        </div>
    )
}
export default Products;