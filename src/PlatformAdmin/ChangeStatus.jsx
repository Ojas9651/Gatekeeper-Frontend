import { useLocation } from "react-router-dom";
import "./ChangeStatus.css"

function ChangeStatus() {


    const location = useLocation();

    const token = location.state.loginInfo;
    const allInfo = location.state.organizations;


    return(
        <>
            <div className="main-container">
                <div className="form-container">
                    <div className="organization-data">
                        <div className="data-table">
                            <h4>ID</h4>
                            <p>{allInfo[0].id}</p>
                        </div>

                        <div className="data-table">
                            <h4>Name</h4>
                            <p>{allInfo[0].name}</p>
                        </div>

                        <div className="data-table">
                            <h4>Slug</h4>
                            <p>{allInfo[0].slug}</p>
                        </div>
                        
                        <div className="data-table">
                            <h4>Status</h4>
                            <p>{allInfo[0].status}</p>
                        </div>

                        <div className="data-table">
                            <h4>Set Status</h4>
                        <select name="status" id="status-dropdown">
                            <option value="ACTIVE">Active</option>
                            <option value="PENDING">Pending</option>
                            <option value="SUSPENDED">Suspend</option>
                            <option value="DELETED">Delete</option>
                        </select>
                        </div>
                        
                        <div className="data-table">
                            <h4>Submit</h4>
                            <button>Submit</button>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangeStatus;