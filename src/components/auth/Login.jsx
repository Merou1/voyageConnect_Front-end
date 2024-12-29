import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './register/style.css'

const Login = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const setUsernameChange = (e) => {
        e.preventDefault();
        setUsername(e.target.value)
    }
    const setPasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value)
    }
    const handleFormeSubmit = async (e) => {
        e.preventDefault();
        console.log("1")
        const url = `http://localhost:8080/login`;
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
    
            const result = await axios.post(url, formData, {
                withCredentials: true, // Ensure cookies are included in requests
            });
            const data = result.data;
            console.log("Login response data:", data);
            console.log("Login response data:", result);
            console.log("Login response data:", data.role);
     
            if (data.role === "ROLE_CLIENT") {
                navigate("/dashboard");
            } else if (data.role === "ROLE_ADMIN") {
                navigate("/admin-dashboard");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Login failed");
        }
    };
    

    return(
        <>
        <h2>Login</h2>
        <form className="form" onSubmit={handleFormeSubmit}>
            <input type="text" name="" id="" placeholder="Email" value={username} onChange={setUsernameChange} />
            <input type="password" name="" id="" placeholder="password" value={password} onChange={setPasswordChange}/>
            <button type="submit">Login</button>
        </form>
        </>

    )

}
export default Login;