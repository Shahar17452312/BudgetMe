import { useState } from "react";
import Input from "../components/Input.jsx"; // נניח שיש לך קומפוננטת Input
import "../../public/styles/Register.css"; // קובץ CSS עם עיצוב מתאים
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const navigate=useNavigate();
    const [flag, setFlag]=useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    budget: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    try{
        const authResponse= await axios.post("http://localhost:3000/auth/register",{
            name:formData.username,
            email:formData.email,
            password:formData.password,
            date_of_creation:new Date().toISOString()
        });




        if(authResponse.status!=200){
            setFlag(false);
        }
        else{
            localStorage.setItem("id",authResponse.data.id)
            localStorage.setItem("name",authResponse.data.name)
            sessionStorage.setItem("accessToken",authResponse.data.accessToken);
            sessionStorage.setItem("refreshToken",authResponse.data.refreshToken);
        }

       try{
        const budgetResponse=await axios.post("http://localhost:3000/budget/"+authResponse.data.id,{
            amount:Number(formData.budget)
        },
        {
            headers: {
                Authorization: "Bearer "+authResponse.data.accessToken 
              }
        });
        if(budgetResponse.status!=200){
            setFlag(false);
        }

        navigate("/home");
       }
       catch(error){
        console.log(error);
        setFlag(false);

       }
        


    }
    catch(error){
        
        console.log(error);
        setFlag(false);

    }


  
    
  };

  return (
    <div className="register-container">
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <Input
          type="text"
          placeholder="Username"
          ariaLabel="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <Input
          type="email"
          placeholder="Email"
          ariaLabel="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder="Password"
          ariaLabel="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          type="number"
          placeholder="Budget Amount"
          ariaLabel="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
        />
        <button className="register-btn" type="submit">
          Register
        </button>
      </form>
      <h2 hidden={flag}>error to register</h2>
    </div>
  );
}

export default Register;
