import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./styles/profile.css" 
import { Link } from "react-router-dom";

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [cookies] = useCookies(["access_token"]);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = cookies.access_token; // Retrieve the JWT token from cookies
      const response = await axios.get("http://localhost:8080/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getInitialLetter = () => {
    if (profileData && profileData.email) {
      return profileData.email.charAt(0).toUpperCase();
    }
    return "";
  };

  return (
    <div>
      <h2 className="profile-heading">Profile</h2>
      <div className="profile-container">
        {profileData && (
          <div className="profile-content">
            <div className="profile-image">
              <span>{getInitialLetter()}</span>
            </div>
            <div className="profile-details">
              <p>Name: {profileData.fname} {profileData.lname}</p>
              <p>Email: {profileData.email}</p>
              <p>Phone: {profileData.mobile}</p>
              <p>Location: {profileData.country} {profileData.state} {profileData.city}</p>
              <div className="dashboard">
              <Link to="/"><button>HOME</button></Link>
              </div>
            </div>
          </div>
         
        )}
      </div>
    </div>
  );
}

export default Profile;
