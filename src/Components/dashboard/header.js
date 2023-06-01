import React from "react"
import { BrowserRouter, Link , useNavigate} from "react-router-dom";
import cart from "../Images/cart.png"
import bars from "../Images/bars.png"
import reports from"../Images/reports_logo.webp"
import services from "../Images/services_logo.jpeg"
import languages from "../Images/language_logo.png"
import settings from "../Images/settings_logo.jpeg"
import FAQ from "../Images/FAQ_logo.jpeg"
import sign_in from "../Images/sign_in.jpg"
import Website_logo from "../Images/Rent_logo-removebg-preview.png"
import NavDropdown from 'react-bootstrap/NavDropdown';
import Profile from "../pages/profile";
import logout_img from "../Images/logout-logo.png"
import { useCookies } from "react-cookie";
import { useState,useEffect } from "react";
import profile_img from "../Images/reg-user.png"
import useUserAPI from "../useUserApi";
import axios from "axios";
import "../pages/styles/cartcount.css"

function Header(){

  const [cookies, setCookies] = useCookies(["access_token"]);

  const [cartCount, setCartCount] = useState(0);
 
  const navigate = useNavigate();

  const { isLogged, isAdmin, setIsLogged } = useUserAPI(cookies.access_token);

  console.log('isAdmin:', isAdmin);




  useEffect(() => {
    // Fetch the cart data and update the cartCount
    const fetchCartCount = async () => {
      const userId = localStorage.getItem("userID");
      const token = cookies.access_token;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.post(
          "http://localhost:8080/api/getCart",
          { userId },
          { headers }
        );
        const cartData = response.data.data.cart || [];
        setCartCount(cartData.length);
      } catch (error) {
        console.log(error);
      }
    };

    if (cookies.access_token) {
      fetchCartCount();
    }
  }, [isLogged, cookies.access_token]);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    setIsLogged(false);
    navigate("/");
    window.location.reload();
  };
  const adminRouter = () => {
    if (isAdmin) {
      return <li><Link to="/admin">admin</Link></li>;
    }
    return null;
  };
  
  
  
  


    return(
    <header>
      <img class="website_logo" src={Website_logo} />
        <div class="search_bar">
            <input class="search-input" type="search"  placeholder="Search for Products..."/>
            <input class="search-btn" type="button" value="Search" />
          </div>
          <Link to="cart" class="cart">
        <img src={cart} />
        {cartCount > 0 && <span class="cart-notification">{cartCount}</span>}
      </Link>
        <nav >
            <ul>


              {adminRouter()}

                 <li><Link to="/" class="root">Home</Link></li>
                 <hr class="home-underline"></hr>
                 
                 <li><Link to="/Marketplace">Marketplace</Link>
                 <div class="sub-nav_1">
                        <ul>
                        <li><Link to="#">Sellers</Link></li>
                        <li><Link to="#">Buyers</Link></li>
                        </ul>
                      </div>
                 </li>
                 <li><Link to="/products">Products</Link>
                   <div class="sub-nav">
                    <ul>
                      <li><Link to="#">Farm Machinery</Link>
                     
                      <div class="sub-nav1">
                        <ul>
                        <li><Link to="#">Harvesters</Link></li>
                          <li><Link to="#">Sprayers</Link></li>
                          <li><Link to="#">Cultivaters</Link></li>
                          <li><Link to="#">Pipes</Link></li>
                          <li><Link to="#">more...</Link></li>
                          </ul>
                      </div>
                      </li>
                      <li><Link to="#">Pumps and Motors</Link>
                      <div class="sub-nav2">
                        <ul>
                          <li><Link to="#">domestic pumps</Link></li>
                          <li><Link to="#">Industrial pumps</Link></li>
                          <li><Link to="#">motors and Engines</Link></li>
                          <li><Link to="#">Agricultural pumps</Link></li>
                          <li><Link to="#">more...</Link></li>
                        </ul>
                      </div>
                      </li>
                      <li><Link to="#">Power Equipments</Link>
                      <div class="sub-nav3">
                        <ul>
                          <li><Link to="#"> Pipe sprinklers</Link></li>
                          <li><Link to="#">solar Products</Link></li>
                          <li><Link to="#">more...</Link></li>
                        </ul>
                      </div>
  
                      </li>
                      <li><Link to="#">Crop processors</Link>
                      <div class="sub-nav4">
                        <ul>
                          <li><Link to="#"> food packaging</Link></li>
                          <li><Link to="#">more...</Link></li>
                        </ul>
                      </div>
  
                      </li>
                      <li><Link to="#">Workshop tools</Link>
                      <div class="sub-nav5">
                        <ul>
                          <li><Link to="#">compressors</Link></li>
                          <li><Link to="#">power tools</Link></li>
                          <li><Link to="#">hand tools</Link></li>
                          <li><Link to="#">more...</Link></li>
                        </ul>
                      </div>
                      
                      </li>
                    </ul>
                   </div>
                 
                 </li>
                 <li><Link to="/about">About</Link></li>
                 <li><Link to="/contact">Contact</Link></li>
                 
                

            </ul>
            {/* <div class="button">
            {!cookies.access_token ? (
              <Link to="/signin" ><button>Sign in</button></Link>,
              <Link to="/signup"><button>Sign Up</button></Link>,
              <Link to="/profile"><button/>Profile</Link>  
              ) : (
                <button onClick={logout}> Logout </button>
              )}
            </div> */}
            
            <div class="button">
                  {!cookies.access_token ?(
                    <>
                      <Link to="/signin">
                        <button>Sign in</button>
                      </Link>
                      <Link to="/signup">
                        <button>Sign Up</button>
                      </Link>
                      
                    </>
                  ) : (
                    <>
                    <img class="logout-logo" src={logout_img} />
                      <button onClick={logout}>Logout</button>
                      
                      <img class="profile-img" src={profile_img} />
                      <Link to="/profile"> 
                         <button>My Account</button>
                         <span class="caret" ></span>
                      </Link>
                    </>
              )}
            </div>


          </nav>
          
        
        {/* <img class="bar" src={bars} onClick={toggleMenu} /> */}
  
          {/* <div class="sub-menu-wrap" >
            <div class="sub-menu"  id="subMenu">
              <Link to="#" class="sub-menu-link">
                <img src={reports} />
                <p>Reports</p>
                <span>&gt;</span>
              </Link>
  
              <Link to="#" class="sub-menu-link">
                <img src={services} />
                <p>Services</p>
                <span>&gt;</span>
                
              </Link>
  
              <Link to="#" class="sub-menu-link">
                <img src={languages} />
                <p>Languages</p>
                <span>&gt;</span>
                
              </Link>
  
              <Link to="#" class="sub-menu-link">
                <img src={settings} />
                <p>Settings</p>
                <span>&gt;</span>
                
              </Link>
  
              <Link to="#" class="sub-menu-link">
                <img src={sign_in} />
                <p>Accounts</p>
                <span>&gt;</span>
  
                
              </Link>
  
              <Link to="#" class="sub-menu-link">
                <img src={FAQ} />
                <p>FAQ</p>
                <span>&gt;</span>
                
              </Link>
            </div>
          </div> */}
          <div class="logo">
          <img class="website_logo" src={Website_logo} />
          </div>

        </header>
        
        )
}
export default Header;

