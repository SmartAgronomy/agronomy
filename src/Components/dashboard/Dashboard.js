import React from 'react'
import "../styles/Dashboard.css"
import "../styles/Home-footer.css"
import Header from "./header";
import Main from "./main"
import BackgroundSlider from '../backgroundSlider';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';


function Dashboard() {
  useEffect(()=>{
    AOS.init({duration :2000})
 },[])
  return (
    <form class='body' >  
      <div >
          <Header />
          <BackgroundSlider/>
          <Main />
      </div>
    </form>
  );
}
export default Dashboard;
