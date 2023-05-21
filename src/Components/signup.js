import './styles/signup.css';
import { useEffect, useState } from 'react';
import { useNavigate,Link, } from "react-router-dom";


function SignupUpdated() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();



  const handleForm = (e)=>{
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }




  const handleSubmit = async (e)=>{
    
    e.preventDefault();
    const response = await fetch('http://localhost:8080/signup',{
      method:'POST',
      body:JSON.stringify(form),
      headers:{
        'Content-Type':'application/json'
      }
    })
  
    const data = await response.json();
    if(data.error){
      alert("email is registered")
    }else{
      alert("Registration Successfull")
    }
    
    
  }

  const getUsers = async ()=>{
    const response = await fetch('http://localhost:8080/signup',{
      method:'GET',
    })
   const data = await response.json();
   setUsers(data);
  }

  useEffect(()=>{
    getUsers();
  },[])

  function validateForm() {
    const password = form.password;
    const confirmPassword =form.cpassword;

    if (!form.fname || !form.lname || !form.mobile || !form.email || !password) {
      alert("all feilds are required to register")
    }

  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
    }
    


  }


  return (
    
    <div className='sign-up'>
      <form class="sign-up-form" onSubmit={handleSubmit}>
      <h1>Sign Up </h1>
        <label>Firstname :</label><br></br><br></br>
        <input type="text" name="fname" onChange={handleForm}/><br/>


        <label>Lastname :</label><br></br><br></br>
        <input type="text" name="lname" onChange={handleForm}/><br/>
       
        <label>Mobile no :</label><br></br><br></br>
        <input type="tel" name="mobile" onChange={handleForm}/><br/>

        <label>E-mail :</label><br></br><br></br>
        <input type="email" name="email"  onChange={handleForm}/><br/>

        <label>Password :</label><br></br><br></br>
        <input type="password" name="password"  onChange={handleForm} minLength="6" /><br/>

        <label>Confirm Password :</label><br></br><br></br>
        <input type="password" name="cpassword"  onChange={handleForm}minLength="6" /><br/><br></br><br></br>
       
        <button type="submit" onClick={validateForm}> Sign Up</button><br></br><br></br>
        <div class="already-registered">
        Already Signup<Link to="/signin">Click here to login</Link>
        </div>
      </form>
      <div>
        {/* <ul>
          {users.map(user=><li key={user._id}>{user.username},{user.password}</li>)}
        </ul> */}
      </div>
      
    </div>
  )
}

  export default SignupUpdated;