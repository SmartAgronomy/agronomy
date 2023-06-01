import  {Routes,Route,} from "react-router-dom";
import PrivacyPolicy from "./privacy_policy";
import About from "./about";
import Contact from "./contact"
import Blogs from "./blogs"
import Marketplace from "./marketplace"
import Products from "./products"
import Dashboard from "./dashboard/Dashboard";
import LoginUpdated from "./login";
import Signup from "./signup"
import Cart from "./cart";



function Links(){   
    return(
        <div>
               <Routes>
                 <Route exact path="signin"  Component={LoginUpdated}/>
                 <Route path="signup" Component={Signup}/>
                 <Route path="/" Component={Dashboard}/>
                 <Route path="blogs" Component={Blogs } />
                 <Route path="products" Component={Products} />
                 <Route path="marketplace" Component={Marketplace } />
                 <Route path='contact' Component={Contact} />
                 <Route path="about" Component={About } />
                 <Route path="privacy_policy" Component={PrivacyPolicy } />
                 <Route path="cart" Component={Cart } />

               </Routes>  
        </div>
    )
}
export default Links;