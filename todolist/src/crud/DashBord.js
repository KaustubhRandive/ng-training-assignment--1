import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavComp from './NavComp';
import { Button, Modal, Alert } from 'react-bootstrap';

const DashBord = () => {
    const [product, setProduct] = useState([]);
    const [showModal, setShowModal] = useState(false); 
    const [showAlert, setShowAlert] = useState(false); 
    const [alertMessage, setAlertMessage] = useState(""); 
    const [deleteName, setDeleteName] = useState(null); 
    const [deleteId, setDeleteId] = useState(null); 

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("http://localhost:8888/todolist")
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.log("Error fetching data", err);
            });
    };

    const handleDelete = (name) => {
      
        const record = product.find((item) => item.name === name);
        if (record) {
            setDeleteId(record.id); 
            setDeleteName(name);
            setShowModal(true); 
        } else {
            setAlertMessage("Record not found!");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    };

    const confirmDelete = () => {
        if (deleteId) {
            axios.delete(`http://localhost:8888/todolist/${deleteId}`) 
                .then(() => {
                    setAlertMessage(`Record with name: ${deleteName} has been deleted successfully.`);
                    setShowAlert(true); 
                    fetchData();
                    setShowModal(false); 
                   
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 3000);
                })
                .catch((err) => {
                    console.error("Failed to delete:", err);
                    setAlertMessage("Failed to delete the record.");
                    setShowAlert(true);

                   
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 3000);
                });
        }
    };

    return (
        <div>
            <div className='card border-dark'>
                <div className='card-header border-dark'><NavComp /></div>
                <div className='card-body'>

                   
                    {showAlert && (
                        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                            {alertMessage}
                        </Alert>
                    )}

                    <table className='table table-hover table-striped'>
                        <thead>
                            <tr className='table'>
                                <th>Assigned To</th> <th>Status</th> <th>Due Date</th> <th>Priority</th><th>Comments</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.map((val, index) => (
                                <tr key={index}>
                                    <td>{val.name}</td>
                                    <td>{val.status}</td>
                                    <td>{val.date}</td>
                                    <td>{val.priority}</td>
                                    <td>{val.comments}</td>
                                    <td>
                                        <Link to={`/edittask/${val.id}`} className="btn btn-success btn-sm">
                                           Edite
                                        </Link>{" "}
                                        <button
                                            type='button'
                                            className='btn btn-danger btn-sm'
                                            onClick={() => handleDelete(val.name)} 
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='card-footer border-dark d-flex justify-content-end'>
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" className="btn btn-outline-dark" style={{ width: "100px" }}>
                            <i className="fa fa-angle-double-up"></i> First
                        </button>
                        <button type="button" className="btn btn-outline-dark" style={{ width: "100px" }}>
                            <i className="fa fa-angle-left" aria-hidden="true"></i> Left
                        </button>
                        <button type="button" className="btn btn-outline-dark" style={{ width: "100px" }}>1</button>
                        <button type="button" className="btn btn-outline-dark" style={{ width: "100px" }}>
                            <i className="fa fa-angle-right" aria-hidden="true"></i> Next
                        </button>
                        <button type="button" className="btn btn-outline-dark" style={{ width: "100px" }}>
                            <i className="fa fa-angle-double-down"></i> Last
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete the record with name "{deleteName}"?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default DashBord;
