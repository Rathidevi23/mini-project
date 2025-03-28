import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../hook/Trip';
import '../styles/Login.css'


function Login() {
  const [useremail, setuseremail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate();
  const { login } = useTrip()

  const handleLogin = async () => {
    if (!useremail || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const result = await login({ email: useremail, password });

      console.log("Login result:", result); // Debugging

      if (!result && !result.user.email) {
        console.error("Login Failed: Email not found in response");
        alert("Login failed. Please try again.");
        return;
      }
     else{ localStorage.setItem("useremail", result.user.email);
      console.log("Stored useremail:", localStorage.getItem("useremail")); // Verify storage
      navigate("/home");}
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred while logging in.");
    }
  };



  return (
    <div className='loginbody'>
      <div className='loginbox'>
        <div className='login'>
          <h2>Login</h2>
        </div>
        <div className='logindetails'>
          <div className='userNameoremail'>
            <label>UserEmail: </label>
            <input type='txt' required={true} placeholder='Enter userEmail' value={useremail} onChange={(e) => setuseremail(e.target.value)} />
          </div>
          <div className='loginpassword'>
            <label>Login password:</label>
            <input type='password' required={true} placeholder='Enter New password' value={password} onChange={(e) => setpassword(e.target.value)} />
          </div>
          <div className='submitbutton'>
            <button className='submit' onClick={handleLogin}>Submit</button>
            <p onClick={() => navigate('/signup')}>Create account </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login