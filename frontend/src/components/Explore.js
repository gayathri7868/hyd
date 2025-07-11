

import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; 

function Explore() {
    const loc = useLocation();
    const { stopName: stop } = loc.state || {};
    const navigate = useNavigate();
    const [stopName, setStopName] = useState(stop || "");
    const [routes, setRoutes] = useState([]);

    const fetchStop = async (id) => {
        try {
            return (await axios.get(`http://localhost:2000/api/stops/id/${id}`)).data.name;
        } catch (err) {
            console.log(err);
            return "Unknown Stop";
        }
    };

    const handleStop = async (event) => {
        if (event) event.preventDefault();
        try {
            const s = stopName.toUpperCase();
            setStopName(s);
            const r = await axios.get(`http://localhost:2000/api/stops/name/${s}`);
            const sId = r.data._id;

            console.log(sId + "**");
            const routeStop = await axios.get(`http://localhost:2000/api/users/rt/${sId}`);
            if (routeStop.status === 200) {
                const updatedRoutes = await Promise.all(
                    routeStop.data.map(async (route) => {
                        const startName = await fetchStop(route.startLocation);
                        const endName = await fetchStop(route.endLocation);
                        return { ...route, startLocation: startName, endLocation: endName };
                    })
                );
                setRoutes(updatedRoutes);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleStop();
    }, []);

    return (
        <div className="container mt-4">
            {routes.length > 0 ? (
                <div className="row justify-content-center">
                    {routes.map((route, index) => (
                        <div key={index} className="col-md-8">
                            <div className="card shadow-sm p-3 mb-4 bg-light rounded">
                                <div className="card-body d-flex align-items-center justify-content-around">
                                    <p className="badge bg-secondary fs-5 p-3">{route.number}</p>

                                    <img src="/bus1.png" alt="bus" className="img-fluid" style={{ height: "50px" }} />

                                    <div className="d-flex align-items-center">
                                        <img src="/red.png" alt="pin" className="me-2" style={{ height: "40px" }} />
                                        <p className="fw-bold fs-5">{route.startLocation}</p>
                                    </div>

                                    <img src="/dir1.png" alt="direction" className="mx-3" style={{ height: "45px", width: "60px" }} />

                                    <div className="d-flex align-items-center">
                                        <img src="/red.png" alt="pin" className="me-2" style={{ height: "40px" }} />
                                        <p className="fw-bold fs-5">{route.endLocation}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center">
                    <p className="fs-4 text-muted">Loading</p>
                </div>
            )}
        </div>
    );
}

export default Explore;

