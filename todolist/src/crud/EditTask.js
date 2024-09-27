import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EditTask = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const [item, setItem] = useState({
        id: "",
        name: "",
        status: "",
        date: "",
        priority: "",
        comments: ""
    })

    const statusOptions = ["Completed", "In Progress", "Not Started"];
    const priorityOptions = ["Low", "High", "Normal"];


    useEffect(() => {
        axios.get(`http://localhost:8888/todolist/${id}`).then((res) => {
            setItem(res.data)

        }).catch((err) => { })
    }, [])

    const inputChangeHandaler = (event) => {
        const { type, name, value } = event.target;
        setItem({ ...item, [name]: value });

    }
    const editProduct = (event) => {
        event.preventDefault();
        console.log(item);
        axios.put(`http://localhost:8888/todolist/${id}`, item).then(() => {
            window.alert("Product Add Edite Successfull");
            nav("/dashbord")
        })


    }

    return (
        <div className='mt-3'>
            <div className='card border-dark'>

                <div className='card-header border-dark'><h2>Edite Task</h2></div>
                <div className='card-body'>

                    <form onSubmit={editProduct} class="row g-3">
                        <div class="col-md-6" >
                            <label for="disabledSelect" class="form-label">Assigned To</label>
                            <input className="form-control"
                                type="text"
                                id="name"
                                name="name"
                                value={item.name}
                                onChange={inputChangeHandaler}
                                placeholder="Enter product name" />
                        </div>
                        <div class="col-md-6">
                            <label for="inputPassword4" class="form-label">Status</label>
                            <select className="form-control"
                                id="status"
                                name="status"
                                value={item.status}
                                onChange={inputChangeHandaler}
                                required
                            >
                                <option value="">{item.status}</option>
                                {statusOptions.map((status, index) => (
                                    <option key={index} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="inputEmail4" class="form-label">Due Date</label>
                            <input className="form-control" type="date"
                                id="date"
                                name="date"
                                value={item.date}
                                onChange={inputChangeHandaler} />
                        </div>
                        <div class="col-md-6">
                            <label for="inputPassword4" class="form-label">Priority</label>
                            <select className="form-control"
                                id="priority"
                                name="priority"
                                value={item.priority}
                                onChange={inputChangeHandaler}
                                required
                            >
                                <option value="">{item.priority}</option>
                                {priorityOptions.map((priority, index) => (
                                    <option key={index} value={priority}>
                                        {priority}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div class="col-md-12">
                            <label for="floatingTextarea2" class="form-label" onChange={inputChangeHandaler} value={item.comments} >Description</label>
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
                                <button type="submit" class="btn btn-success">Save</button>

                            </div>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default EditTask;
