import { useState } from "react";
import "./Addorganization.css"
import { useLocation, useNavigate } from "react-router-dom";

function AddOrganization() {

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");

    const navigate = useNavigate();

    const location = useLocation();

    const data = location.state;

    const handleSubmit = async (event) => {

        event.preventDefault();

        try{
            const response = await fetch("http://localhost:8081/api/platform/organization",
                {
                    method : "POST",
                    headers : {
                        "Authorization": `Bearer ${data.token}`,
                        "Content-Type": "application/json",
                    },
                    body : JSON.stringify({ name, slug })
                }
            );
            if(response.ok) {
                console.log("Organization added");
                navigate("/platform-admin/dashboard", {state : data});
            }
        }catch(error){
            console.log("Error creating the Organization : ", error);
        }
    }

    return(
        <>
            <div className="main-container">
                <div className="form-container">
                    <form action="">

                        <label htmlFor="name">Organization Name : </label>
                        <input 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text" id="name" name="name" placeholder="Name" />

                        <label htmlFor="slug">Organization Slug : </label>
                        <input 
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        type="text" id="slug" name="slug" placeholder="Slug" />

                        <button onClick={handleSubmit} type="submit">Submit</button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default AddOrganization;