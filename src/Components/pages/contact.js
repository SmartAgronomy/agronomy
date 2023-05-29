import Header from "../dashboard/header";
import emailjs from "emailjs-com"
import Contact_footer from "../headfooters/contact-footer";
import phone_icon from "../Images/phone_icon.png"
import Email from "../Images/email.webp"
import Location from "../Images/loca.png"
import Contact_background from "../Images/contact-background.jpg"
import "./styles/contact.css"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react'
import facebook from "../Images/facebook.jpg"
import twitter from "../Images/i4.jpg"
import instagram from "../Images/instagram_logo.webp"
import youtube from "../Images/youtube_logo.png"
import linked_in from "../Images/linked-in-logo.png"

function Contact(){
  const SentEmail=(e)=>{
      e.preventDefault();
      emailjs.sendForm("service_xrxp39b","template_dypl2aa",e.target,"c3AKDUbdd39cDfec2")
      .then(()=>{
        alert("sent successfully");
      }).catch(()=>{
        alert("Something Went Wrong");
      })
        
  }
    useEffect(()=>{
        AOS.init({duration :2000})
     },[])
    return(
      <div>
         <Header />
         <div class="contact-center" data-aos="fade-up">
            <div class="contact-wrapper">

            </div>
            <img src={Contact_background} />
            <h1>
                Contact Us
            </h1>
            <p>
                We would love to respond to yuor queries and help you to succeed<br></br>
                Feel free to get in touch with Us
            </p>
         </div>
        
            <h1 class="form-heading">
                Contact our Team Now!
            </h1>
            <div class="contact-form" data-aos="fade-up">
              <form class="inner-form" onSubmit={SentEmail}>
                <span>Send your request</span><br></br><br></br><br></br>
                <div  class="left-top-input">
                   <label>Name :</label><br></br>
                   <input type="text" name="name" required/><br></br>
                </div>
                <div class="right-top-input">
                <label>Phone no :</label><br></br>
                
                <input type="tel" name="phone_no" required/><br></br>
               </div>
               <div class="left-bottom-input">
                 <label>Email :</label><br></br>
                 <input type="email" name="user_email" required/><br></br>
               </div>
                <div class="right-bottom-input">
                  <label>Subject :</label><br></br>
                  <input type="text" name="subject"required/><br></br>
                </div>
                <div class="messege">
                  <label>Message :</label><br></br>
                  <textarea type="text" name="message" rows="6" cols="86" required></textarea><br></br>
                </div>
                <button>Send</button>
                
              </form>
              <div class="my-info">
              <h2 class="my-info-heading">Reach Us</h2>
              <div class="my-info-inner-form">
                <div class="my-info-contact">
                  
                   <img src={phone_icon} />
                   <span>Phone:</span>
                   <p>+919380019642</p><br></br>
                   <p>+917019014365</p>
                </div>
                <div class="my-info-email">
                  <img src={Email} />
                  <span>Email:</span>
                  <p>rental@agriindia.org</p>
                </div>
                <div class="my-info-location">
                   <img src={Location} />
                   <span>Address:</span>
                   <p>www.digitalzedSmartAgronomy.com</p>
                </div>
                 
              </div>
            </div>

         </div>
             <div class="follow-us-on">
             <img src={facebook} />
              <img src={twitter} />
              <img src={instagram} />
              <img src={youtube} />
              <img src={linked_in} />
             </div>
         <Contact_footer />
     </div>

    )
}
export default Contact;