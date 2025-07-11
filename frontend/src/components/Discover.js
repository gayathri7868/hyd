

// import back from '../back.webp';
// import axios from 'axios';
// import { FaArrowsAltH } from 'react-icons/fa';
// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import '../css/discover.css';
// import Map from './Map';


// function Discover() {
//     const location = useLocation();
//     const { startLocation: start, endLocation: end } = location.state || {};
//     const [startLocation, setStartLocation] = useState(start || '');
//     const [endLocation, setEndLocation] = useState(end || '');
//     const [routes, setRoutes] = useState([]);
//     const [indirectRoutes, setIndirectRoutes] = useState([]);
//     const [showMap, setShowMap] = useState(false);
//     const [selectedStops, setSelectedStops] = useState([]);
//     const navigate = useNavigate();

//     const handleRoutes = async (event) => {
//         event.preventDefault();
//         try {

//             const i = startLocation.toUpperCase()
//             setStartLocation(i);
//             const e = endLocation.toUpperCase()
//             setEndLocation(e);
//             console.log(i + " " + e);
//             const startId = await axios.get(`http://localhost:2000/api/stops/name/${i}`);
//             const sId = startId.data._id;
//             const endId = await axios.get(`http://localhost:2000/api/stops/name/${e}`);
//             const eId = endId.data._id;

//             console.log(sId + " " + eId);
//             let exampleRoutes = await axios.get(`http://localhost:2000/api/users/${sId}/${eId}`)

//             exampleRoutes = exampleRoutes.data;

//             if (exampleRoutes != "a direct route is not available") {
//                 let rout = await Promise.all(exampleRoutes.map((route) => processRoute(route)));
//                 setRoutes(rout);

//             }
//             //console.log(exampleRoutes)


//             else if (exampleRoutes == "a direct route is not available") {
//                 //console.log(sId + " " + eId);

//                 const resRoutes = await axios.get(`http://localhost:2000/api/users/intermediate/${sId}/${eId}`);
//                 exampleRoutes = resRoutes.data;

//                 if (exampleRoutes != "data does not match") {
//                     let rout = await Promise.all(exampleRoutes.map((route) => processRoute(route)));
//                     setRoutes(rout);
//                 }
//                 else if (exampleRoutes == "data does not match") {
//                     const indirectRoutes = await axios.get(`http://localhost:2000/api/users/indirect/${sId}/${eId}`);
//                     exampleRoutes = indirectRoutes.data;
//                     // console.log(exampleRoutes)
//                     // console.log(201)
//                     let rout = await Promise.all(exampleRoutes.map((route) => handleIndirect(route)))
//                     //console.log(rout)
//                     setIndirectRoutes(rout)

//                     //console.log(exampleRoutes)
//                 }
//             }



//             // let rout = await Promise.all(exampleRoutes.map((route) => processRoute(route)));

//             //console.log(rout);

//         } catch (err) {
//             console.log(err);
//         }
//     };


//     const handleIndirect = async (route) => {

//         let commStop = await axios.get(`http://localhost:2000/api/stops/id/${route.commonStops}`);
//         commStop = commStop.data.name.replace(/[\[\]']/g, '')


//         return {
//             startBus: route.start,
//             commonStops: commStop,
//             endBus: route.end
//         }
//     }

//     const processRoute = async (route) => {
//         const inter = route.intermediateStops
//         const intermediateStopPromises = inter.map(async (id) => {
//             const stop = await axios.get(`http://localhost:2000/api/stops/id/${id}`);
//             const x = stop.data.name.replace(/[\[\]']/g, '')
//             //console.log(x)
//             return x;
//         });
//         // const start = await axios.get(`http://localhost:2000/api/stops/id/${route.startLocation}`)
//         // const end = await axios.get(`http://localhost:2000/api/stops/id/${route.endLocation}`)

//         const intermediateStops = await Promise.all(intermediateStopPromises);

//         console.log(intermediateStops)
//         return {
//             busNumber: route.number,
//             startLocation: startLocation,
//             endLocation: endLocation,
//             intermediateRoutes: intermediateStops
//         };
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



// import back from "../back.webp";
// import axios from "axios";
// import { FaArrowsAltH } from "react-icons/fa";
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "../css/discover.css";
// import Map from "./Map";
// import IndirectRoutes from "./IndirectRoutes"; // Importing IndirectRoutes

// function Discover() {
//   const location = useLocation();
//   const { startLocation: start, endLocation: end } = location.state || {};
//   const [startLocation, setStartLocation] = useState(start || "");
//   const [endLocation, setEndLocation] = useState(end || "");
//   const [routes, setRoutes] = useState([]);
//   const [indirectRoutes, setIndirectRoutes] = useState([]);
//   const [showMap, setShowMap] = useState(false);
//   const [selectedStops, setSelectedStops] = useState([]);
//   const navigate = useNavigate();

//   // const handleRoutes = async (event) => {
//   //   event.preventDefault();
//   //   try {
//   //     const i = startLocation.toUpperCase();
//   //     setStartLocation(i);
//   //     const e = endLocation.toUpperCase();
//   //     setEndLocation(e);

//   //     console.log("Searching routes for:", i, e);
//   //     const startId = await axios.get(`http://localhost:2000/api/stops/name/${i}`);
//   //     const sId = startId.data._id;
//   //     const endId = await axios.get(`http://localhost:2000/api/stops/name/${e}`);
//   //     const eId = endId.data._id;

//   //     //console.log("Start ID:", sId, "End ID:", eId);

//   //     let response = await axios.get(`http://localhost:2000/api/users/${sId}/${eId}`);
//   //     let exampleRoutes = response.data;

//   //     if (exampleRoutes !== "a direct route is not available") {
//   //       let rout = await Promise.all(exampleRoutes.map((route) => processRoute(route)));
//   //       setRoutes(rout);
//   //       setIndirectRoutes([]); // Clear indirect routes if direct route exists
//   //     } else {
//   //       console.log("No direct route found, checking indirect routes...");

//   //       response = await axios.get(`http://localhost:2000/api/users/intermediate/${sId}/${eId}`);
//   //       exampleRoutes = response.data;

//   //       if (exampleRoutes !== "data does not match") {
//   //         let rout = await Promise.all(exampleRoutes.map((route) => processRoute(route)));
//   //         setRoutes(rout);
//   //         setIndirectRoutes([]); 
//   //       } else {
//   //         console.log("No intermediate route found, checking for indirect routes...");

//   //         response = await axios.get(`http://localhost:2000/api/users/indirect/${sId}/${eId}`);
//   //         exampleRoutes = response.data;

//   //         if (exampleRoutes.length > 0) {
//   //           let rout = await Promise.all(exampleRoutes.map((route) => handleIndirect(route)));
//   //           setIndirectRoutes(rout);
//   //           setRoutes([]);
//   //         } else {
//   //           console.log("No indirect routes found.");
//   //           setRoutes([]);
//   //           setIndirectRoutes([]);
//   //         }
//   //       }
//   //     }
//   //   } catch (err) {
//   //     console.log("Error fetching routes:", err);
//   //   }
//   // };


//   const handleRoutes = async (event) => {
//     event.preventDefault();
//     try {
//       const i = startLocation.toUpperCase();
//       const e = endLocation.toUpperCase();
//       setStartLocation(i);
//       setEndLocation(e);
  
//       console.log("🔍 Searching routes for:", i, e);
  
//       // Fetch stop IDs
//       const startIdRes = await axios.get(`http://localhost:2000/api/stops/name/${i}`);
//       const endIdRes = await axios.get(`http://localhost:2000/api/stops/name/${e}`);
//       const sId = startIdRes.data._id;
//       const eId = endIdRes.data._id;
  
//       // 1. Try direct route
//       let response = await axios.get(`http://localhost:2000/api/users/${sId}/${eId}`);
//       let directRoutes = response.data;
  
//       if (directRoutes && directRoutes !== "a direct route is not available") {
//         console.log("✅ Found direct route");
//         const processedRoutes = await Promise.all(
//           directRoutes.map((route) => processRoute(route))
//         );
//         setRoutes(processedRoutes);
//         setIndirectRoutes([]);
//         return;
//       }
  
//       // 2. Try indirect route
//       console.log("❌ No direct route. Trying indirect route...");
//       response = await axios.get(`http://localhost:2000/api/users/indirect/${sId}/${eId}`);
//       let indirectData = response.data;
  
//       if (Array.isArray(indirectData) && indirectData.length > 0) {
//         console.log("✅ Found indirect route");
//         const indirectProcessed = await Promise.all(
//           indirectData.map((route) => handleIndirect(route))
//         );
//         setIndirectRoutes(indirectProcessed);
//         setRoutes([]);
//         return;
//       }
  
//       // 3. Try intermediate route
//       console.log("❌ No indirect route. Trying intermediate route...");
//       response = await axios.get(`http://localhost:2000/api/users/intermediate/${sId}/${eId}`);
//       let intermediateRoutes = response.data;
  
//       if (intermediateRoutes && intermediateRoutes !== "data does not match") {
//         console.log("✅ Found intermediate route");
//         const processedRoutes = await Promise.all(
//           intermediateRoutes.map((route) => processRoute(route))
//         );
//         setRoutes(processedRoutes);
//         setIndirectRoutes([]);
//         return;
//       }
  
//       // ❌ Nothing found
//       console.log("❌ No routes found at all");
//       setRoutes([]);
//       setIndirectRoutes([]);
  
//     } catch (err) {
//       console.log("⚠️ Error fetching routes:", err);
//       setRoutes([]);
//       setIndirectRoutes([]);
//     }
//   };
  
//   const handleIndirect = async (route) => {
//     let commStop = await axios.get(`http://localhost:2000/api/stops/id/${route.commonStops}`);
//     commStop = commStop.data.name.replace(/[\[\]']/g, "");

//     return {
//       startBus: route.start,
//       commonStops: commStop,
//       endBus: route.end,
//     };
//   };

//   const processRoute = async (route) => {
//     const inter = route.intermediateStops;
//     const intermediateStopPromises = inter.map(async (id) => {
//       const stop = await axios.get(`http://localhost:2000/api/stops/id/${id}`);
//       return stop.data.name.replace(/[\[\]']/g, "");
//     });

//     const intermediateStops = await Promise.all(intermediateStopPromises);

//     return {
//       busNumber: route.number,
//       startLocation: startLocation,
//       endLocation: endLocation,
//       intermediateRoutes: intermediateStops,
//     };
//   };

//   const handleReverse = () => {
//     setStartLocation(endLocation);
//     setEndLocation(startLocation);
//   };

//   const showIntermediateStops = (stops) => {
//     setSelectedStops(stops);
//     setShowMap(true);
//   };

//   return (
//     <div className="find-routes-page container">
//       <h1>Find Bus Routes</h1>
//       <form className="route-form" onSubmit={handleRoutes}>
//         <div className="form-row align-items-center">
//           <div className="col-md-5">
//             <input
//               type="text"
//               className="form-control"
//               value={startLocation}
//               onChange={(e) => setStartLocation(e.target.value)}
//               placeholder="Start Location"
//               required
//             />
//           </div>
//           <div className="col-md-2 text-center">
//             <FaArrowsAltH size={30} onClick={handleReverse} className="reverse-arrow" />
//           </div>
//           <div className="col-md-5">
//             <input
//               type="text"
//               className="form-control"
//               value={endLocation}
//               onChange={(e) => setEndLocation(e.target.value)}
//               placeholder="End Location"
//               required
//             />
//           </div>
//         </div>
//         <button type="submit" className="btn btn-primary mt-3">
//           Find Routes
//         </button>
//       </form>

      
//       <div className="routes-container">
//         {routes.length > 0 &&
//           routes.map((route, index) => (
//             <div key={index} className="route-card">
//               <img src={back} alt={`Bus Route ${route.busNumber}`} className="route-image" />
//               <h2>Route {route.busNumber}</h2>
//               <p>Start: {route.startLocation}</p>
//               <p>End: {route.endLocation}</p>
//               <button
//                 className="btn btn-success mt-2"
//                 onClick={() => showIntermediateStops(route.intermediateRoutes)}
//               >
//                 See Intermediate Stops
//               </button>
//             </div>
//           ))}
//       </div>

     
//       {indirectRoutes.length > 0 && <IndirectRoutes indirectRoutes={indirectRoutes} />}

      
//       {showMap && (
//         <div className="map-container">
//           <h3>Intermediate Stops</h3>
//           <Map stops={selectedStops} />
//         </div>
//       )}

      
//     </div>
//   );
// }

// export default Discover;



// import back from "../back.webp";
// import axios from "axios";
// import { FaArrowsAltH } from "react-icons/fa";
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "../css/discover.css";
// import Map from "./Map";
// import IndirectRoutes from "./IndirectRoutes"; // Importing IndirectRoutes

// function Discover() {
//   const location = useLocation();
//   const { startLocation: start, endLocation: end } = location.state || {};
//   const [startLocation, setStartLocation] = useState(start || "");
//   const [endLocation, setEndLocation] = useState(end || "");
//   const [routes, setRoutes] = useState([]);
//   const [indirectRoutes, setIndirectRoutes] = useState([]);
//   const [showMap, setShowMap] = useState(false);
//   const [selectedStops, setSelectedStops] = useState([]);
//   const navigate = useNavigate();

//   const handleRoutes = async (event) => {
//     event.preventDefault();
//     try {
//       const i = startLocation.toUpperCase();
//       setStartLocation(i);
//       const e = endLocation.toUpperCase();
//       setEndLocation(e);

//       console.log("Searching routes for:", i, e);
//       const startId = await axios.get(`http://localhost:2000/api/stops/name/${i}`);
//       const sId = startId.data._id;
//       const endId = await axios.get(`http://localhost:2000/api/stops/name/${e}`);
//       const eId = endId.data._id;

//       console.log("Start ID:", sId, "End ID:", eId);

//       let response = await axios.get(`http://localhost:2000/api/users/${sId}/${eId}`);
//       let exampleRoutes = response.data;

//       if (exampleRoutes !== "a direct route is not available") {
//         let rout = await Promise.all(exampleRoutes.map((route) => processRoute(route)));
//         setRoutes(rout);
//         setIndirectRoutes([]); // Clear indirect routes if direct route exists
//       } else {
//         console.log("No direct route found, checking indirect routes...");

//         response = await axios.get(`http://localhost:2000/api/users/intermediate/${sId}/${eId}`);
//         exampleRoutes = response.data;

//         if (exampleRoutes !== "data does not match") {
//           let rout = await Promise.all(exampleRoutes.map((route) => processRoute(route)));
//           setRoutes(rout);
//           setIndirectRoutes([]); // Clear indirect routes if intermediate routes exist
//         } else {
//           console.log("No intermediate route found, checking for indirect routes...");

//           response = await axios.get(`http://localhost:2000/api/users/indirect/${sId}/${eId}`);
//           exampleRoutes = response.data;

//           if (exampleRoutes.length > 0) {
//             let rout = await Promise.all(exampleRoutes.map((route) => handleIndirect(route)));
//             setIndirectRoutes(rout);
//             setRoutes([]); // Clear direct routes if only indirect routes exist
//           } else {
//             console.log("No indirect routes found.");
//             setRoutes([]);
//             setIndirectRoutes([]);
//           }
//         }
//       }
//     } catch (err) {
//       console.log("Error fetching routes:", err);
//     }
//   };

//   const handleIndirect = async (route) => {
//     let commStop = await axios.get(`http://localhost:2000/api/stops/id/${route.commonStops}`);
//     commStop = commStop.data.name.replace(/[\[\]']/g, "");

//     return {
//       startLoc:startLocation,
//       startBus: route.start,
//       commonStops: commStop,
//       endBus: route.end,
//       endLoc:endLocation
//     };
//   };

//   const processRoute = async (route) => {
//     const inter = route.intermediateStops;
//     const intermediateStopPromises = inter.map(async (id) => {
//       const stop = await axios.get(`http://localhost:2000/api/stops/id/${id}`);
//       return stop.data.name.replace(/[\[\]']/g, "");
//     });

//     const intermediateStops = await Promise.all(intermediateStopPromises);

//     return {
//       busNumber: route.number,
//       startLocation: startLocation,
//       endLocation: endLocation,
//       intermediateRoutes: intermediateStops,
//     };
//   };

//   const handleReverse = () => {
//     setStartLocation(endLocation);
//     setEndLocation(startLocation);
//   };

//   const showIntermediateStops = (stops) => {
//     setSelectedStops(stops);
//     setShowMap(true);
//   };

//   return (
//     <div className="find-routes-page container">
//       <p className="title">FIND YOUR BUS</p>
//       <form className="route-form" onSubmit={handleRoutes}>
//         <div className="form-row align-items-center">
        
//           <div className="d-flex align-items-center justify-content-center gap-3 ">
//           <p className="field">START :</p>
//             <input
//               type="text"
//               className="form-control"
//               value={startLocation}
//               style={{width:"250px",fontSize:"15px",padding:"0",paddingLeft:"10px",paddingTop:"5px",paddingBottom:"5px"}}
//               onChange={(e) => setStartLocation(e.target.value)}
//               placeholder=""
//               required
//             />
//           </div>
//           <div className="col-md-2 text-center">
//             <FaArrowsAltH size={30} onClick={handleReverse} className="reverse-arrow" />
//           </div>
//           <div className="d-flex align-items-center justify-content-center gap-3 ">
            
//           <p className="field">END :</p>
//             <input
//               type="text"
//               className="form-control"
//               value={endLocation}
//               style={{width:"250px",fontSize:"15px",padding:"0",paddingLeft:"10px",paddingTop:"5px",paddingBottom:"5px"}}
//               onChange={(e) => setEndLocation(e.target.value)}
//               placeholder=""
//               required
//             />
//           </div>
//         </div><center>
//         <button type="submit" className="search">
//           SEARCH
//         </button>
//         </center>
//       </form>

//       {/* Display Direct Routes */}
//       <div className="routes-container">
//         {routes.length > 0 &&
//           routes.map((route, index) => (
//             <div key={index} className="route-card">
//               <img src={back} alt={`Bus Route ${route.busNumber}`} className="route-image" />
//               <h2>Route {route.busNumber}</h2>
//               <p>Start: {route.startLocation}</p>
//               <p>End: {route.endLocation}</p>
//               <button
//                 className="btn btn-success mt-2"
//                 onClick={() => showIntermediateStops(route.intermediateRoutes)}
//               >
//                 See Intermediate Stops
//               </button>
//             </div>
//           ))}
//       </div>

//       {/* Display Indirect Routes */}
//       {indirectRoutes.length > 0 && <IndirectRoutes indirectRoutes={indirectRoutes} />}

//       {/* Display Map */}
//       {showMap && (
//         <div className="map-container">
//           <h3>Intermediate Stops</h3>
//           <Map stops={selectedStops} />
//         </div>
//       )}
// <center>
//       <button onClick={() => navigate("/index")} style={{width:"90%"}} className="btn btn-secondary mt-5 mb-3">
//         BACK
//       </button>
//       </center>
//     </div>
//   );
// }

// export default Discover;



import back from "../back.webp";
import axios from "axios";
import { FaArrowsAltH } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/discover.css";
import Map from "./Map";
import IndirectRoutes from "./IndirectRoutes"; // Importing IndirectRoutes

function Discover() {
  const location = useLocation();
  const { startLocation: start, endLocation: end } = location.state || {};
  const [startLocation, setStartLocation] = useState(start || "");
  const [endLocation, setEndLocation] = useState(end || "");
  const [routes, setRoutes] = useState([]);
  const [indirectRoutes, setIndirectRoutes] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [selectedStops, setSelectedStops] = useState([]);
  const navigate = useNavigate();

  const handleRoutes = async (event) => {
    event.preventDefault();
    try {
      const i = startLocation.toUpperCase();
      setStartLocation(i);
      const e = endLocation.toUpperCase();
      setEndLocation(e);

      console.log("Searching routes for:", i, e);
      const startId = await axios.get(`http://localhost:2000/api/stops/name/${i}`);
      const sId = startId.data._id;
      const endId = await axios.get(`http://localhost:2000/api/stops/name/${e}`);
      const eId = endId.data._id;

      console.log("Start ID:", sId, "End ID:", eId);

      let response = await axios.get(`http://localhost:2000/api/users/${sId}/${eId}`);
      let exampleRoutes = response.data;

      if (exampleRoutes !== "a direct route is not available") {
        let rout = await Promise.all(exampleRoutes.map((route) => processRoute(route)));
        setRoutes(rout);
        setIndirectRoutes([]); // Clear indirect routes if direct route exists
      } else {
        console.log("No direct route found, checking indirect routes...");

        response = await axios.get(`http://localhost:2000/api/users/intermediate/${sId}/${eId}`);
        exampleRoutes = response.data;

        if (exampleRoutes !== "data does not match") {
          let rout = await Promise.all(exampleRoutes.map((route) => processRoute(route)));
          setRoutes(rout);
          setIndirectRoutes([]); // Clear indirect routes if intermediate routes exist
        } else {
          console.log("No intermediate route found, checking for indirect routes...");

          response = await axios.get(`http://localhost:2000/api/users/indirect/${sId}/${eId}`);
          exampleRoutes = response.data;

          if (exampleRoutes.length > 0) {
            let rout = await Promise.all(exampleRoutes.map((route) => handleIndirect(route)));
            setIndirectRoutes(rout);
            setRoutes([]); // Clear direct routes if only indirect routes exist
          } else {
            console.log("No indirect routes found.");
            setRoutes([]);
            setIndirectRoutes([]);
          }
        }
      }
    } catch (err) {
      console.log("Error fetching routes:", err);
    }
  };

  const handleIndirect = async (route) => {
    let commStop = await axios.get(`http://localhost:2000/api/stops/id/${route.commonStops}`);
    commStop = commStop.data.name.replace(/[\[\]']/g, "");

    return {
      startLoc:startLocation,
      startBus: route.start,
      commonStops: commStop,
      endBus: route.end,
      endLoc:endLocation
    };
  };

  const processRoute = async (route) => {
    const inter = route.intermediateStops;
    const intermediateStopPromises = inter.map(async (id) => {
      const stop = await axios.get(`http://localhost:2000/api/stops/id/${id}`);
      return stop.data.name.replace(/[\[\]']/g, "");
    });

    const intermediateStops = await Promise.all(intermediateStopPromises);

    return {
      busNumber: route.number,
      startLocation: startLocation,
      endLocation: endLocation,
      intermediateRoutes: intermediateStops,
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
      <p className="title">FIND YOUR BUS</p>
      <form className="route-form" onSubmit={handleRoutes}>
        <div className="form-row align-items-center">
        
          <div className="d-flex align-items-center justify-content-center gap-3 ">
          <p className="field">START :</p>
            <input
              type="text"
              className="form-control"
              value={startLocation}
              style={{width:"250px",fontSize:"15px",padding:"0",paddingLeft:"10px",paddingTop:"5px",paddingBottom:"5px"}}
              onChange={(e) => setStartLocation(e.target.value)}
              placeholder=""
              required
            />
          </div>
          <div className="col-md-2 text-center">
            <FaArrowsAltH size={30} onClick={handleReverse} className="reverse-arrow" />
          </div>
          <div className="d-flex align-items-center justify-content-center gap-3 ">
            
          <p className="field">END :</p>
            <input
              type="text"
              className="form-control"
              value={endLocation}
              style={{width:"250px",fontSize:"15px",padding:"0",paddingLeft:"10px",paddingTop:"5px",paddingBottom:"5px"}}
              onChange={(e) => setEndLocation(e.target.value)}
              placeholder=""
              required
            />
          </div>
        </div><center>
        <button type="submit" className="search">
          SEARCH
        </button>
        </center>
      </form>

      {/* Display Direct Routes */}
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

      {/* Display Indirect Routes */}
      {indirectRoutes.length > 0 && <IndirectRoutes indirectRoutes={indirectRoutes} />}

      {/* Display Map */}
      {showMap && (
        <div className="map-container">
          <h3>Intermediate Stops</h3>
          <Map stops={selectedStops} />
        </div>
      )}
<center>
      <button onClick={() => navigate("/index")} style={{width:"90%"}} className="btn btn-secondary mt-5 mb-3">
        BACK
      </button>
      </center>
    </div>
  );
}

export default Discover;


