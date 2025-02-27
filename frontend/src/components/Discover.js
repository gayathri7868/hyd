// import back from '../back.webp';
// import axios from 'axios';
// import { FaArrowsAltH } from 'react-icons/fa';
// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import '../discover.css';
// import Map from './Map';

// function Discover() {
//     const location = useLocation();
//     const { startLocation: start, endLocation: end } = location.state || {};
//     const [startLocation, setStartLocation] = useState(start || '');
//     const [endLocation, setEndLocation] = useState(end || '');
//     const [routes, setRoutes] = useState([]);
//     const [showMap, setShowMap] = useState(false);
//     const [selectedStops, setSelectedStops] = useState([]);
//     const navigate = useNavigate();

//     const handleRoutes = async (event) => {
//         event.preventDefault();
//         try {
//             const startId = await axios.get(`http://localhost:2000/api/stops/${startLocation}`);
//             const sId = startId.data._id;
//             const endId = await axios.get(`http://localhost:2000/api/stops/${endLocation}`);
//             const eId = endId.data._id;

//             const exampleRoutes = await axios.get(`http://localhost:2000/api/users/${sId}/${eId}`);
//             const routes = exampleRoutes.data;


//             routes = await Promise.all(routes.forEach(element => {
//                 processRoute(element)
//             }));

//             console.log(routes);
//             setRoutes(routes);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     const processRoute = async (route) => {

//         const inter = await Promise.all(routes.intermediateStops.forEach(stop => {
//             axios.get(`http://localhost:2000/api/stops/${stop}`)
//         }))

//         console.log(inter)

//         const r = {
//             "busNumber": route.number,
//             "startLocation": startLocation,
//             "endLocation": endLocation,
//             "intermediateStops": inter
//         }
//         return r;
//     };

//     const handleReverse = () => {
//         setStartLocation(endLocation);
//         setEndLocation(startLocation);
//     };

//     const showIntermediateStops = (stops) => {
//         setSelectedStops(stops);
//         setShowMap(true);
//     };

//     return (
//         <div className="find-routes-page container">
//             <h1>Find Bus Routes</h1>
//             <form className="route-form" onSubmit={handleRoutes}>
//                 <div className="form-row align-items-center">
//                     <div className="col-md-5">
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={startLocation}
//                             onChange={(e) => setStartLocation(e.target.value)}
//                             placeholder="Start Location"
//                             required
//                         />
//                     </div>
//                     <div className="col-md-2 text-center">
//                         <FaArrowsAltH size={30} onClick={handleReverse} className="reverse-arrow" />
//                     </div>
//                     <div className="col-md-5">
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={endLocation}
//                             onChange={(e) => setEndLocation(e.target.value)}
//                             placeholder="End Location"
//                             required
//                         />
//                     </div>
//                 </div>
//                 <button type="submit" className="btn btn-primary mt-3">
//                     Find Routes
//                 </button>
//             </form>
//             <div className="routes-container">
//                 {routes.length > 0 &&
//                     routes.map((route, index) => (
//                         <div key={index} className="route-card">
//                             <img src={back} alt={`Bus Route ${route.busNumber}`} className="route-image" />
//                             <h2>Route {route.busNumber}</h2>
//                             <p>Start: {route.startLocation}</p>
//                             <p>End: {route.endLocation}</p>
//                             <button
//                                 className="btn btn-success mt-2"
//                                 onClick={() => showIntermediateStops(route.intermediateRoutes)}
//                             >
//                                 See Intermediate Stops
//                             </button>
//                         </div>
//                     ))}
//             </div>
//             {showMap && (
//                 <div className="map-container">
//                     <h3>Intermediate Stops</h3>
//                     <Map stops={selectedStops} />
//                 </div>
//             )}
//             <button onClick={() => navigate('/index')} className="btn btn-secondary mt-3">
//                 Back to Home
//             </button>
//         </div>
//     );
// }

// export default Discover;







import back from '../back.webp';
import axios from 'axios';
import { FaArrowsAltH } from 'react-icons/fa';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../discover.css';
import Map from './Map';


function Discover() {
    const location = useLocation();
    const { startLocation: start, endLocation: end } = location.state || {};
    const [startLocation, setStartLocation] = useState(start || '');
    const [endLocation, setEndLocation] = useState(end || '');
    const [routes, setRoutes] = useState([]);
    const [indirectRoutes, setIndirectRoutes] = useState([]);
    const [showMap, setShowMap] = useState(false);
    const [selectedStops, setSelectedStops] = useState([]);
    const navigate = useNavigate();

    const handleRoutes = async (event) => {
        event.preventDefault();
        try {

            const i = startLocation.toUpperCase()
            setStartLocation(i);
            const e = endLocation.toUpperCase()
            setEndLocation(e);
            console.log(i + " " + e);
            const startId = await axios.get(`http://localhost:2000/api/stops/name/${i}`);
            const sId = startId.data._id;
            const endId = await axios.get(`http://localhost:2000/api/stops/name/${e}`);
            const eId = endId.data._id;

            console.log(sId + " " + eId);
            let exampleRoutes = await axios.get(`http://localhost:2000/api/users/${sId}/${eId}`)

            exampleRoutes = exampleRoutes.data;

            if (exampleRoutes != "a direct route is not available") {
                let rout = await Promise.all(exampleRoutes.map((route) => processRoute(route)));
                setRoutes(rout);

            }
            //console.log(exampleRoutes)


            else if (exampleRoutes == "a direct route is not available") {
                //console.log(sId + " " + eId);

                const resRoutes = await axios.get(`http://localhost:2000/api/users/intermediate/${sId}/${eId}`);
                exampleRoutes = resRoutes.data;

                if (exampleRoutes != "data does not match") {
                    let rout = await Promise.all(exampleRoutes.map((route) => processRoute(route)));
                    setRoutes(rout);
                }
                else if (exampleRoutes == "data does not match") {
                    const indirectRoutes = await axios.get(`http://localhost:2000/api/users/indirect/${sId}/${eId}`);
                    exampleRoutes = indirectRoutes.data;
                    // console.log(exampleRoutes)
                    // console.log(201)
                    let rout = await Promise.all(exampleRoutes.map((route) => handleIndirect(route)))
                    //console.log(rout)
                    setIndirectRoutes(rout)

                    //console.log(exampleRoutes)
                }
            }



            // let rout = await Promise.all(exampleRoutes.map((route) => processRoute(route)));

            //console.log(rout);

        } catch (err) {
            console.log(err);
        }
    };


    const handleIndirect = async (route) => {

        let commStop = await axios.get(`http://localhost:2000/api/stops/id/${route.commonStops}`);
        commStop = commStop.data.name.replace(/[\[\]']/g, '')


        return {
            startBus: route.start,
            commonStops: commStop,
            endBus: route.end
        }
    }

    const processRoute = async (route) => {
        const inter = route.intermediateStops
        const intermediateStopPromises = inter.map(async (id) => {
            const stop = await axios.get(`http://localhost:2000/api/stops/id/${id}`);
            const x = stop.data.name.replace(/[\[\]']/g, '')
            //console.log(x)
            return x;
        });
        // const start = await axios.get(`http://localhost:2000/api/stops/id/${route.startLocation}`)
        // const end = await axios.get(`http://localhost:2000/api/stops/id/${route.endLocation}`)

        const intermediateStops = await Promise.all(intermediateStopPromises);

        console.log(intermediateStops)
        return {
            busNumber: route.number,
            startLocation: startLocation,
            endLocation: endLocation,
            intermediateRoutes: intermediateStops
        };
    };

    const handleReverse = () => {
        setStartLocation(endLocation);
        setEndLocation(startLocation);
    };

    const showIntermediateStops = (stops) => {
        setSelectedStops(stops);
        setShowMap(true);
    };

    return (
        <div className="find-routes-page container">
            <h1>Find Bus Routes</h1>
            <form className="route-form" onSubmit={handleRoutes}>
                <div className="form-row align-items-center">
                    <div className="col-md-5">
                        <input
                            type="text"
                            className="form-control"
                            value={startLocation}
                            onChange={(e) => setStartLocation(e.target.value)}
                            placeholder="Start Location"
                            required
                        />
                    </div>
                    <div className="col-md-2 text-center">
                        <FaArrowsAltH size={30} onClick={handleReverse} className="reverse-arrow" />
                    </div>
                    <div className="col-md-5">
                        <input
                            type="text"
                            className="form-control"
                            value={endLocation}
                            onChange={(e) => setEndLocation(e.target.value)}
                            placeholder="End Location"
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Find Routes
                </button>
            </form>
            <div className="routes-container">
                {routes.length > 0 &&
                    routes.map((route, index) => (
                        <div key={index} className="route-card">
                            <img src={back} alt={`Bus Route ${route.busNumber}`} className="route-image" />
                            <h2>Route {route.busNumber}</h2>
                            <p>Start: {route.startLocation}</p>
                            <p>End: {route.endLocation}</p>
                            <button
                                className="btn btn-success mt-2"
                                onClick={() => showIntermediateStops(route.intermediateRoutes)}
                            >
                                See Intermediate Stops
                            </button>
                        </div>
                    ))}
            </div>
            {showMap && (
                <div className="map-container">
                    <h3>Intermediate Stops</h3>
                    <Map stops={selectedStops} />
                </div>
            )}

            <button onClick={() => navigate('/index')} className="btn btn-secondary mt-3">
                Back to Home
            </button>
        </div>
    );
}
export default Discover;





// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import MapWithAnimatedBus from './MapWithAnimatedBus'; // Use the new component

// function Discover() {
//     const location = useLocation();
//     const { startLocation: start, endLocation: end } = location.state || {};
//     const [startLocation, setStartLocation] = useState(start || '');
//     const [endLocation, setEndLocation] = useState(end || '');
//     const [routes, setRoutes] = useState([]);
//     const [showMap, setShowMap] = useState(false);
//     const [selectedStops, setSelectedStops] = useState([]);
//     const navigate = useNavigate();

//     const handleRoutes = (event) => {
//         event.preventDefault();
//         const exampleRoutes = [
//             {
//                 busNumber: 277,
//                 startLocation: 'Ibrahimpatnam',
//                 endLocation: 'Jublie Bus Stop',
//                 intermediateRoutes: ['MANGALPALLI', 'Hastinapuram', 'LB NAGAR', 'UPPAL', 'SECUNDERABAD']
//             },
//             {
//                 busNumber: 300,
//                 startLocation: 'Mehedipatnam',
//                 endLocation: 'Jublie Bus Stop',
//                 intermediateRoutes: ['SRnagar', 'Sagar ring road', 'Lbnagar', 'Uppal', 'Secunderabad']
//             }
//         ];
//         setRoutes(exampleRoutes);
//     };

//     const handleReverse = () => {
//         setStartLocation(endLocation);
//         setEndLocation(startLocation);
//     };

//     const showIntermediateStops = (stops) => {
//         setSelectedStops(stops);
//         setShowMap(true);
//     };

//     return (
//         <div className="find-routes-page container">
//             <h1>Find Bus Routes</h1>
//             <form className="route-form" onSubmit={handleRoutes}>
//                 <div className="form-row align-items-center">
//                     <div className="col-md-5">
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={startLocation}
//                             onChange={(e) => setStartLocation(e.target.value)}
//                             placeholder="Start Location"
//                             required
//                         />
//                     </div>
//                     <div className="col-md-2 text-center">
//                         <FaArrowsAltH size={30} onClick={handleReverse} className="reverse-arrow" />
//                     </div>
//                     <div className="col-md-5">
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={endLocation}
//                             onChange={(e) => setEndLocation(e.target.value)}
//                             placeholder="End Location"
//                             required
//                         />
//                     </div>
//                 </div>
//                 <button type="submit" className="btn btn-primary mt-3">
//                     Find Routes
//                 </button>
//             </form>

//             <div className="routes-container">
//                 {routes.length > 0 &&
//                     routes.map((route, index) => (
//                         <div key={index} className="route-card">
//                             <h2>Route {route.busNumber}</h2>
//                             <p>Start: {route.startLocation}</p>
//                             <p>End: {route.endLocation}</p>
//                             <button
//                                 className="btn btn-success mt-2"
//                                 onClick={() => showIntermediateStops(route.intermediateRoutes)}
//                             >
//                                 See Intermediate Stops
//                             </button>
//                         </div>
//                     ))
//                 }
//             </div>

//             {showMap && (
//                 <div className="map-container">
//                     <h3>Intermediate Stops</h3>
//                     <MapWithAnimatedBus stops={selectedStops} /> {/* Add Path Animation */}
//                 </div>
//             )}

//             <button onClick={() => navigate('/index')} className="btn btn-secondary mt-3">
//                 Back to Home
//             </button>
//         </div>
//     );
// }

// export default Discover;
