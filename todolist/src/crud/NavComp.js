import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";


const NavComp = () => {

    const [searchTerm, setSearchTerm] = useState(""); // State to track search input

    const handleSearch = (e) => {
        e.preventDefault();
        
        console.log("Searching for:", searchTerm);
        
      
    };
    

    return (
        <div>
           
            <div style={{ display: "flex", justifyContent: "space-between", margin: "5px" }}>
                <div className="mt-4">
                    <button className="btn btn-danger" type="button">
                        <i className="fa fa-list" aria-hidden="true"></i>
                       
                    </button><span style={{marginLeft:"7px"}} >Task</span>
                    
                    <p style={{marginLeft:"70px"}} className="mb-6">All Task</p>
                    
                </div>
                <div className="btn-group gap-1" style={{ display: "flex", alignItems: "center" }}>
                    <Link to="/addtask" className="btn btn-warning">New Task</Link>
                    <Link to="/dashbord" className="btn btn-warning">Refresh</Link>
                </div>
            </div>

            
            <div style={{ display: "flex", justifyContent: "flex-end", margin: "5px"}}>
                <form className="d-flex" role="search" style={{ position: "relative" }} onSubmit={handleSearch}>
                    <input 
                        className="form-control" 
                        type="search" 
                        placeholder="Search" 
                        aria-label="Search" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ paddingRight: "40px" ,width:"168px"}} 
                    />
                    <button type="button" style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#6c757d", cursor: "pointer" }}>
                        <i className="fa fa-search"></i>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NavComp;

