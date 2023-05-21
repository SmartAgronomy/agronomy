import {Route,Routes } from "react-router-dom";
import SignupUpdated from "./Components/signup"
import Dashboard from "./Components/dashboard/Dashboard";
import Privacy_Policy from "./Components/privacy_policy";
import Products from "./Components/products";
import Contact from "./Components/contact"
import Blogs from "./Components/blogs"
import Marketplace from "./Components/marketplace"
import About from "./Components/about";
import LoginUpdated from "./Components/login";
import Profile from "./Components/profile";


function App() {
  return (
    <div className="App">
      
      <Routes>

          <Route path="signin" element={<LoginUpdated/>}></Route>
          <Route path="signup" element={<SignupUpdated/>}></Route>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="marketplace" element={<Marketplace />}></Route> 
          <Route path='contact' element={<Contact />}></Route>
          <Route path="about" element={<About /> } ></Route>
          <Route path="blogs" element={<Blogs /> }></Route>
          <Route path="privacy_policy" element={<Privacy_Policy /> }></Route>
          <Route path="profile" element={<Profile/>}></Route>

          
      </Routes>
    </div>
  );
}
export default App;
