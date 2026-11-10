import { useState } from "react";
import styles from "./Login.module.css"
import { useNavigate } from "react-router-dom";

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!username || !password){
            alert("Please enter both username and password");
            return;
        }

        try{
            const response = await fetch("http://localhost:8081/api/auth/login" ,{
                method : "POST",
                headers : {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if(response.ok){

                if(data.role == "PLATFORM_ADMIN") {
                    navigate("/platform-admin/dashboard", {state : data});
                }
                if(data.role == "TENANT_ADMIN"){
                    navigate("/tenant/")
                }
            }else{
                alert(data.message || "Invalid Credentials");
            }
        }catch(error){
            console.error("Network error:", error);
            alert("Could not connect to the server. Please try again later.");
        }
    }

    return(
        <>
            <div className={styles["main-container"]}>

                <div className={styles["form-container"]}>
                    <div className={styles.intro}>
                    <h1>Gatekeeper</h1>
                        <p>
                            A Gateway Service for your application.
                            That enables rate limiting, idempotency, caching and security.
                        </p>

                    </div>
                    <div className={styles.login}>
                        <h1>Login</h1>
                        <p>Access your gatekepper account</p>
                        <form onSubmit={handleSubmit}>
                            
                                <input 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text" placeholder="Username"
                                />
                            
                            

                            <input 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password" placeholder="Password" 
                            />
                            <button type="submit">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login;