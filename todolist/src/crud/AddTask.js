import axios from 'axios';
import React, { Component, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AddTask = () => {
    const nav = useNavigate();
    const [item, setItem] = useState({
        name: "",
        status: "",
        date: "",
        priority: "",
        comments: ""


    });

    const statusOptions = ["Completed", "In Progress", "Not Started"];
    const priorityOptions = ["Low", "High", "Normal"];



    const inputChangeHandaler = (event) => {
        const { type, name, value } = event.target;
        setItem({ ...item, [name]: value });

    }
    //this add request
    const addProduct = (event) => {
        event.preventDefault();
        console.log(item);
        axios.post("http://localhost:8888/todolist", item).then(() => {
            window.alert("Product Add successfull");
            nav("/dashbord")
        })


    }

    
    return (
        

        <div className='mt-3'>
           
            <div className='card border-dark'>

                <div className='card-header border-dark'><h3>New Task</h3></div>
                <div className='card-body'>

                    <form class="row g-3" onSubmit={addProduct} >
                        <div className="col-md-6" >
                            <label for="disabledSelect" className="form-label" >Assigned To</label>
                            <input className="form-control"
                                type="text"
                                id="name"
                                name="name"
                                value={item.name}
                                onChange={inputChangeHandaler}
                                placeholder="Enter User Name" 
                                required />
                        </div>
                        <div className="col-md-6">
                            <label for="inputPassword4" class="form-label">Status</label>
                            <select className="form-control"
                                id="status"
                                name="status"
                                value={item.status}
                                onChange={inputChangeHandaler}
                                required
                            >
                                <option value="">--Select status--</option>
                                {statusOptions.map((status, index) => (
                                    <option key={index} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label for="inputEmail4" className="form-label">Due Date</label>
                            <input className="form-control" type="date"
                                id="date"
                                name="date"
                                value={item.date}
                                onChange={inputChangeHandaler} />
                        </div>
                        <div className="col-md-6">
                            <label for="inputPassword4"  className="form-label">Priority</label>
                            <select className="form-control"
                                id="priority"
                                name="priority"
                                value={item.priority}
                                onChange={inputChangeHandaler}
                                required
                            >
                                <option value="">--Select priority--</option>
                                {priorityOptions.map((priority, index) => (
                                    <option key={index} value={priority}>
                                        {priority}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label for="floatingTextarea2" className="form-label" onChange={inputChangeHandaler} value={item.comments} >Description</label>
                            <textarea className="form-control" style={{ height: "100px" }}
                                id="comments"
                                name="comments"
                                value={item.comments}
                                onChange={inputChangeHandaler}
                                placeholder="Enter comments"
                                required
                            />
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div >
                                <Link to="/dashbord" className="btn btn-warning">Cancel</Link>{" "}
                                <button type="submit" className="btn btn-success">Save</button>

                            </div>

                        </div>
                    </form>
                </div>

            </div>
        </div>)
}


export default AddTask;
