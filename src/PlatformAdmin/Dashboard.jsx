import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css"
import { useLocation, useNavigate } from "react-router-dom";

function Dashboard(){

    const now = new Date();

    const time = now.toLocaleTimeString();

    let hour = "";

    for(let i=0; i<2; i++){
        hour += time.charAt(i);
    }

    let day = "";

    for(let i=time.length-2; i<time.length; i++){
        day += time.charAt(i);
    }

    const hourInt = parseInt(hour, 10);

    let timeString = "";

    if(hourInt >= 12 && hourInt <= 4 && day == "PM"){
        timeString = "Good Afternoon"
    }else if(hourInt > 4 && hourInt < 12 && day == "PM"){
        timeString = "Good Evening"
    }else{
        timeString = "Good Morning"
    }

    const navigate = useNavigate();

    const [allInfo, setAllInfo] = useState([]);

    const location = useLocation();

    const data = location.state;

    const gotoDashboard = () => {
        navigate("/");
    }


    useEffect(() => {
        const fetchDashoardData = async () => {
            if(data == null) navigate("/");
            try{
                const response = await fetch("http://localhost:8081/api/platform/organization",{
                    headers : {
                        "Authorization" : `Bearer ${data.token}`
                    }
                });

                if(response.status == 401 || data.role == null){
                    navigate("/");
                    return;
                }

                const allData = await response.json();

                setAllInfo(allData);
                
            }catch(error){
                console.log("Error fetching dashboard data", error);
            }
        };

        fetchDashoardData();
    }, []);

    return(
        <>
            {data == null ? <>
                <p>Reditect to login</p>
            </> :  <>
            <div className={styles.main-container}>
                <div className="left-plane">
                    <div className="logo">
                            <h2 className={style.logo-styling}>Gatekeeper</h2>
                    </div>
                    <div className="tasks">
                        <button style={{backgroundColor : "white", color: "orange", paddingLeft: "35px"}}>
                            <i className="fa-solid fa-house"></i>
                            Dashboard
                        </button>
                        <button onClick={ () => navigate("/platform-admin/create", {state : data})}>
                            <i className="fa-solid fa-plus"></i>
                            Add Organization</button>
                        <button onClick={() =>navigate("/platform-admin/change-status" , 
                            {state : 
                                {
                                    loginInfo : data,
                                    organizations : allInfo
                                }
                            })}>
                                <i className="fa-solid fa-pencil"></i>
                                Change Status</button>
                            <button>
                                <i className="fa-solid fa-pen-to-square"></i>
                                Update Organizations</button>
                        <button>
                            <i className="fa-solid fa-building"></i>
                            All Organizations
                        </button>
                    </div>
                </div>
                <div className="right-plane">
                    <div className="navbar">
                        <div>
                            <h3 style={{color : "rgb(255, 77, 0)", fontStyle : "italic"}}>Hello, {timeString}</h3>
                        </div>
                        <div className="navbar-menu">
                            <p>Login as : {data ? data.role : "null"}</p>
                        </div>
                    </div>
                    <div className="main-dashboard">
                        <div className="welcome-info">
                                <h4 style={{color : "orange"}}>Dashboard</h4>
                                <div>
                                    <h1 style={{fontStyle : "italic"}}>Welcome to Gatekeeper</h1>
                                </div>
                                <p style={{fontSize: "12px"}}>Manage Organizations and Tenants as ADMIN</p>
                            </div>
                        <div className="info-box-container">
                            <div className="all-tenants-info-box">
                                <p>Organizations</p>
                                <h2>{allInfo ? allInfo.length : "null"}</h2>
                                <p>Total Tenants</p>
                            </div>
                            <div className="all-tenants-info-box"></div>
                            <div className="all-tenants-info-box"></div>
                        </div>
                    </div>
                </div>
            </div>
            </>}
        </>
    )
}

export default Dashboard;