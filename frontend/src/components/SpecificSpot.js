


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { Star, MapPin, Clock, Search, Bus } from "lucide-react";

// const SpecificSpot = () => {
//   const location = useLocation();
//   const spotName = location.state?.spotName || location.state?.query || "No spot selected";
//   const [mapType, setMapType] = useState("roadmap");
//   const [startLocation, setStartLocation] = useState("");
//   const [busRoutes, setBusRoutes] = useState([]);

//   useEffect(() => {
//     if (startLocation) {
//       fetchBusRoutes();
//     }
//   }, [startLocation]);

//   const fetchBusRoutes = async () => {
//     try {
//       const i = startLocation.toUpperCase();
//       const e = spotName.toUpperCase();

//       const startIdRes = await axios.get(`http://localhost:2000/api/stops/name/${i}`);
//       const endIdRes = await axios.get(`http://localhost:2000/api/stops/name/${e}`);

//       const sId = startIdRes.data._id;
//       const eId = endIdRes.data._id;

//       let response = await axios.get(`http://localhost:2000/api/users/${sId}/${eId}`);
//       let exampleRoutes = response.data;

//       if (exampleRoutes !== "a direct route is not available") {
//         const routes = await Promise.all(exampleRoutes.map((route) => processRoute(route)));
//         setBusRoutes(routes);
//       } else {
//         response = await axios.get(`http://localhost:2000/api/users/intermediate/${sId}/${eId}`);
//         exampleRoutes = response.data;

//         if (exampleRoutes !== "data does not match") {
//           const routes = await Promise.all(exampleRoutes.map((route) => processRoute(route)));
//           setBusRoutes(routes);
//         } else {
//           response = await axios.get(`http://localhost:2000/api/users/indirect/${sId}/${eId}`);
//           exampleRoutes = response.data;

//           if (exampleRoutes.length > 0) {
//             const routes = await Promise.all(exampleRoutes.map((route) => handleIndirect(route)));
//             setBusRoutes(routes);
//           } else {
//             setBusRoutes([]);
//           }
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching routes:", err);
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
//       startLocation,
//       endLocation: spotName,
//       intermediateRoutes: intermediateStops,
//     };
//   };

//   const mapSrc = startLocation
//     ? `https://www.google.com/maps/embed/v1/directions?key=AIzaSyAqjuHEXUhERkYhHd7zUMD8m6v7bzmxkP0&origin=${encodeURIComponent(
//         startLocation
//       )}&destination=${encodeURIComponent(spotName)}&mode=transit&maptype=${mapType}`
//     : `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
//         spotName
//       )}&maptype=${mapType}`;

//   return (
//     <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
//       {/* Google Maps Background */}
//       <iframe title="Google Maps" style={{ position: "absolute", width: "100%", height: "100%", border: "none", filter: "brightness(85%)" }} src={mapSrc} allowFullScreen></iframe>

//       {/* Search Bar */}
//       <div style={{ position: "absolute", top: "10px", left: "10px", width: "450px", backgroundColor: "rgba(255, 255, 255, 0.9)", padding: "12px", borderRadius: "10px", display: "flex", alignItems: "center" }}>
//         <input
//           type="text"
//           placeholder="Enter your start location..."
//           value={startLocation}
//           onChange={(e) => setStartLocation(e.target.value)}
//           style={{ width: "90%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "16px" }}
//         />
//         <Search size={20} style={{ marginLeft: "10px", cursor: "pointer", color: "#007bff" }} />
//       </div>

//       {/* Bus Information */}
//       {busRoutes.length > 0 && (
//         <div style={{ position: "absolute", bottom: "10px", left: "10px", backgroundColor: "rgba(255, 255, 255, 0.95)", padding: "12px", borderRadius: "10px", maxWidth: "450px" }}>
//           <h2>Available Buses:</h2>
//           {busRoutes.map((route, index) => (
//             <p key={index}><Bus size={16} /> Bus {route.busNumber} via {route.intermediateRoutes.join(", ")}</p>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SpecificSpot;





// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { Star, MapPin, Clock, Search, Bus } from "lucide-react";

// const SpecificSpot = () => {
//   const location = useLocation();
//   const spotName = location.state?.spotName || location.state?.query || "No spot selected";
//   const [mapType, setMapType] = useState("roadmap");
//   const [startLocation, setStartLocation] = useState("");
//   const [busRoutes, setBusRoutes] = useState([]);

//   useEffect(() => {
//     if (startLocation) {
//       fetchBusRoutes();
//     }
//   }, [startLocation]);

//   const fetchBusRoutes = async () => {
//     try {
//       const i = startLocation.toUpperCase();
//       const e = spotName.toUpperCase();

//       const startIdRes = await axios.get(`http://localhost:2000/api/stops/name/${i}`);
//       const endIdRes = await axios.get(`http://localhost:2000/api/stops/name/${e}`);

//       const sId = startIdRes.data._id;
//       const eId = endIdRes.data._id;

//       let response = await axios.get(`http://localhost:2000/api/users/${sId}/${eId}`);
//       let exampleRoutes = response.data;

//       if (exampleRoutes !== "a direct route is not available") {
//         const routes = await Promise.all(exampleRoutes.map((route) => processRoute(route)));
//         setBusRoutes(routes);
//       } else {
//         response = await axios.get(`http://localhost:2000/api/users/intermediate/${sId}/${eId}`);
//         exampleRoutes = response.data;

//         if (exampleRoutes !== "data does not match") {
//           const routes = await Promise.all(exampleRoutes.map((route) => processRoute(route)));
//           setBusRoutes(routes);
//         } else {
//           response = await axios.get(`http://localhost:2000/api/users/indirect/${sId}/${eId}`);
//           exampleRoutes = response.data;

//           if (exampleRoutes.length > 0) {
//             const routes = await Promise.all(exampleRoutes.map((route) => handleIndirect(route)));
//             setBusRoutes(routes);
//           } else {
//             setBusRoutes([]);
//           }
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching routes:", err);
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
//       startLocation,
//       endLocation: spotName,
//       intermediateRoutes: intermediateStops,
//     };
//   };

//   const touristSpot = {
//     name: spotName,
//     rating: 4.5,
//     reviews: 120,
//     category: "Tourist Attraction",
//     travelTime: "15 min",
//     openingTime: "6:00 AM",
//     closingTime: "7:00 PM",
//     nearestBusStop: "Sheriguda Bus Stop",
//     address: "6J48+5Q, Sheriguda, Telangana 501510",
//     images: [
//       "https://upload.wikimedia.org/wikipedia/commons/d/d1/Ramoji_Film_City.jpg",
//       "https://cdn.getyourguide.com/img/tour/593e732ead364.jpeg/146.jpg",
//       "https://source.unsplash.com/600x400/?river,forest",
//     ],
//   };

//   const mapSrc = startLocation
//     ? `https://www.google.com/maps/embed/v1/directions?key=AIzaSyAqjuHEXUhERkYhHd7zUMD8m6v7bzmxkP0&origin=${encodeURIComponent(
//         startLocation
//       )}&destination=${encodeURIComponent(spotName)}&mode=transit&maptype=${mapType}`
//     : `https://www.google.com/maps/embed/v1/place?key=AIzaSyAqjuHEXUhERkYhHd7zUMD8m6v7bzmxkP0&q=${encodeURIComponent(
//         spotName
//       )}&maptype=${mapType}`;

//   return (
//     <div style={styles.pageContainer}>
//       <iframe title="Google Maps" style={styles.mapBackground} src={mapSrc} allowFullScreen></iframe>

//       <div style={styles.searchContainer}>
//         <input
//           type="text"
//           placeholder="Enter your start location..."
//           value={startLocation}
//           onChange={(e) => setStartLocation(e.target.value)}
//           style={styles.searchInput}
//         />
//         <Search size={20} style={styles.searchIcon} />
//       </div>

//       <div style={styles.container}>
//         <h1 style={styles.title}>{touristSpot.name}</h1>
//         <p style={styles.ratingContainer}><Star size={18} color="gold" /> <span style={styles.ratingText}>{touristSpot.rating} ({touristSpot.reviews} reviews)</span></p>
//         <p style={styles.location}><MapPin size={18} /> {touristSpot.address}</p>
//         <p style={styles.closingTime}><Clock size={18} /> Opens at {touristSpot.openingTime} - Closes at {touristSpot.closingTime}</p>
//         <h2>Available Buses:</h2>
//         {busRoutes.length > 0 ? (
//           busRoutes.map((route, index) => (
//             <p key={index}><Bus size={16} /> Bus {route.busNumber} via {route.intermediateRoutes.join(", ")}</p>
//           ))
//         ) : (
//           <p>No buses available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   pageContainer: {
//     position: "relative",
//     width: "100vw",
//     height: "100vh",
//     fontFamily: "'Arial', sans-serif",
//   },
//   mapBackground: {
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//     border: "none",
//     filter: "brightness(85%)",
//   },
//   searchContainer: {
//     position: "absolute",
//     top: "10px",
//     left: "10px",
//     width: "450px",
//     backgroundColor: "rgba(255, 255, 255, 0.9)",
//     padding: "12px",
//     borderRadius: "10px",
//     boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
//     display: "flex",
//     alignItems: "center",
//     zIndex: 10,
//   },
//   searchInput: {
//     width: "90%",
//     padding: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "6px",
//     fontSize: "16px",
//     outline: "none",
//   },
//   searchIcon: {
//     marginLeft: "10px",
//     cursor: "pointer",
//     color: "#007bff",
//   },
//   container: {
//     position: "absolute",
//     top: "90px",
//     left: "10px",
//     width: "450px",
//     backgroundColor: "rgba(255, 255, 255, 0.95)",
//     padding: "20px",
//     borderRadius: "12px",
//     boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
//     textAlign: "center",
//   },
//   imageContainer: {
//     display: "flex",
//     gap: "5px",
//     overflowX: "auto",
//     marginBottom: "8px",
//     paddingBottom: "5px",
//   },
//   image: {
//     width: "100px",
//     height: "80px",
//     borderRadius: "8px",
//     objectFit: "cover",
//   },
//   title: {
//     fontSize: "22px",
//     fontWeight: "bold",
//   },
//   ratingContainer: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "5px",
//     marginBottom: "8px",
//   },
//   ratingText: {
//     fontWeight: "bold",
//   },
//   category: {
//     color: "#555",
//     fontSize: "14px",
//     marginBottom: "4px",
//   },
//   closingTime: {
//     fontSize: "16px",
//     fontWeight: "bold",
//     color: "#ff4757",
//     marginBottom: "4px",
//   },
//   location: {
//     fontSize: "14px",
//     color: "#333",
//   },
//   busInfo: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#007bff",
//     color: "white",
//     padding: "12px",
//     borderRadius: "8px",
//     marginTop: "10px",
//     fontSize: "16px",
//     fontWeight: "bold",
//   },
//   busText: {
//     marginLeft: "8px",
//   },
//   buttonContainer: {
//     position: "absolute",
//     top: "50px",
//     left: "50%",
//     transform: "translateX(-50%)",
//     display: "flex",
//     gap: "10px",
//     zIndex: 10,
//   },
//   button: {
//     padding: "8px 16px",
//     backgroundColor: "white",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },
// };

// export default SpecificSpot;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { Star, MapPin, Clock, Search, Bus } from "lucide-react";

// const SpecificSpot = () => {
//   const location = useLocation();
//   let spotName = location.state?.spotName || location.state?.query || "No spot selected";
//   const [mapType, setMapType] = useState("roadmap");
//   const [startLocation, setStartLocation] = useState("");
//   const [busRoutes, setBusRoutes] = useState([]);
//   const [touristSpot, setTouristSpot] = useState(null);


//   useEffect(()=>{
//     if(spotName)
//       {
//         fetchTouristSpot();
//       }
//   },[spotName]);


//   useEffect(() => {
//     if (startLocation) {
//       fetchBusRoutes();
//     }
//   }, [startLocation]);




//   const fetchTouristSpot = async () => {
//     try {
//       const response = await axios.get(`http://localhost:2000/api/tourists/name/${spotName}`);
//       setTouristSpot(response.data);
//     } catch (error) {
//       console.error("Error fetching tourist spot details:", error);
//     }
//   };

//   const fetchBusRoutes = async () => {
//     try {
//       const i = startLocation.toUpperCase();
//       const e = spotName.toUpperCase();

//       const startIdRes = await axios.get(`http://localhost:2000/api/stops/name/${i}`);
//       const endIdRes = await axios.get(`http://localhost:2000/api/stops/name/${e}`);

//       const sId = startIdRes.data._id;
//       const eId = endIdRes.data._id;

//       let response = await axios.get(`http://localhost:2000/api/users/${sId}/${eId}`);
//       let exampleRoutes = response.data;

//       if (exampleRoutes !== "a direct route is not available") {
//         const routes = await Promise.all(exampleRoutes.map((route) => processRoute(route)));
//         setBusRoutes(routes);
//       } else {
//         response = await axios.get(`http://localhost:2000/api/users/intermediate/${sId}/${eId}`);
//         exampleRoutes = response.data;

//         if (exampleRoutes !== "data does not match") {
//           const routes = await Promise.all(exampleRoutes.map((route) => processRoute(route)));
//           setBusRoutes(routes);
//         } else {
//           response = await axios.get(`http://localhost:2000/api/users/indirect/${sId}/${eId}`);
//           exampleRoutes = response.data;

//           if (exampleRoutes.length > 0) {
//             const routes = await Promise.all(exampleRoutes.map((route) => handleIndirect(route)));
//             setBusRoutes(routes);
//           } else {
//             setBusRoutes([]);
//           }
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching routes:", err);
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
//       startLocation,
//       endLocation: spotName,
//       intermediateRoutes: intermediateStops,
//     };
//   };



//   return (
//     <div style={styles.pageContainer}>
//       {/* Google Maps Background */}
//       <iframe title="Google Maps" style={styles.mapBackground} src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAqjuHEXUhERkYhHd7zUMD8m6v7bzmxkP0&q=${encodeURIComponent(spotName)}&maptype=${mapType}`} allowFullScreen></iframe>

//       {/* Search Bar */}
//       <div style={styles.searchContainer}>
//         <input
//           type="text"
//           placeholder="Enter your start location..."
//           value={startLocation}
//           onChange={(e) => setStartLocation(e.target.value)}
//           style={styles.searchInput}
//         />
//         <Search size={20} style={styles.searchIcon} />
//       </div>

//       {/* Tourist Spot Info */}
//       <div style={styles.container}>
//         {/* Image Gallery */}
//         <div style={styles.imageContainer}>
//           {touristSpot.images.map((img, index) => (
//             <img key={index} src={img} alt="Tourist spot" style={styles.image} />
//           ))}
//         </div>

//         <h1 style={styles.title}>{touristSpot.name}</h1>
//         <div style={styles.ratingContainer}>
//           <Star size={18} color="gold" />
//           <span style={styles.ratingText}>{touristSpot.rating} ({touristSpot.reviews} reviews)</span>
//         </div>
//         <p style={styles.category}>{touristSpot.category} • {touristSpot.travelTime} away</p>
//         <p style={styles.closingTime}><Clock size={18} /> Closes at {touristSpot.closingTime}</p>
//         <p style={styles.location}><MapPin size={18} /> {touristSpot.address}</p>

//         {/* Bus Information */}
//         {startLocation && busRoutes.length > 0 && (
//           <div style={styles.busInfo}>
//             <Bus size={24} color="white" />
//             <span style={styles.busText}>Available Buses: {busRoutes.map(route => `Bus ${route.busNumber}`).join(", ")}</span>
//           </div>
//         )}

//         {/* Map Type Buttons (Moved to center) */}

//       </div>

//       <div style={styles.buttonContainer}>
//          <button style={styles.button} onClick={() => setMapType("roadmap")}>Roadmap</button>
//        <button style={styles.button} onClick={() => setMapType("satellite")}>Satellite</button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   pageContainer: {
//     position: "relative",
//     width: "100vw",
//     height: "100vh",
//     fontFamily: "'Arial', sans-serif",
//   },
//   mapBackground: {
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//     border: "none",
//     filter: "brightness(85%)",
//   },
//   searchContainer: {
//     position: "absolute",
//     top: "10px",
//     left: "10px",
//     width: "450px",
//     backgroundColor: "rgba(255, 255, 255, 0.9)",
//     padding: "12px",
//     borderRadius: "10px",
//     boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
//     display: "flex",
//     alignItems: "center",
//     zIndex: 10,
//   },
//   searchInput: {
//     width: "90%",
//     padding: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "6px",
//     fontSize: "16px",
//     outline: "none",
//   },
//   searchIcon: {
//     marginLeft: "10px",
//     cursor: "pointer",
//     color: "#007bff",
//   },
//   container: {
//     position: "absolute",
//     top: "90px",
//     left: "10px",
//     width: "450px",
//     backgroundColor: "rgba(255, 255, 255, 0.95)",
//     padding: "20px",
//     borderRadius: "12px",
//     boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
//     textAlign: "center",
//   },
//   imageContainer: {
//     display: "flex",
//     gap: "5px",
//     overflowX: "auto",
//     marginBottom: "8px",
//     paddingBottom: "5px",
//   },
//   image: {
//     width: "100px",
//     height: "80px",
//     borderRadius: "8px",
//     objectFit: "cover",
//   },
//   title: {
//     fontSize: "22px",
//     fontWeight: "bold",
//   },
//   ratingContainer: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "5px",
//     marginBottom: "8px",
//   },
//   ratingText: {
//     fontWeight: "bold",
//   },
//   category: {
//     color: "#555",
//     fontSize: "14px",
//     marginBottom: "4px",
//   },
//   closingTime: {
//     fontSize: "16px",
//     fontWeight: "bold",
//     color: "#ff4757",
//     marginBottom: "4px",
//   },
//   location: {
//     fontSize: "14px",
//     color: "#333",
//   },
//   busInfo: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#007bff",
//     color: "white",
//     padding: "12px",
//     borderRadius: "8px",
//     marginTop: "10px",
//     fontSize: "16px",
//     fontWeight: "bold",
//   },
//   busText: {
//     marginLeft: "8px",
//   },
//   buttonContainer: {
//         position: "absolute",
//         top: "10px",
//         left: "50%",
//         transform: "translateX(-50%)",
//         display: "flex",
//         gap: "10px",
//         zIndex: 10,
//       },
//       button: {
//         padding: "8px 16px",
//         backgroundColor: "white",
//         border: "1px solid #ccc",
//         borderRadius: "5px",
//         cursor: "pointer",
//         fontWeight: "bold",
//       },
// };

// export default SpecificSpot;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Star, MapPin, Clock, Search, Bus } from "lucide-react";
import { startCase, toLower } from 'lodash';



// const SpecificSpot = () => {
//   const location = useLocation();
//   let spotName = location.state?.spotName || location.state?.query || "No spot selected";
//   const [mapType, setMapType] = useState("roadmap");
//   const [startLocation, setStartLocation] = useState("");
//   const [busRoutes, setBusRoutes] = useState([]);
//   const [touristSpot, setTouristSpot] = useState(null);

//   useEffect(() => {
//     if (spotName) {
//       fetchTouristSpot();
//     }
//   }, [spotName]);

//   useEffect(() => {
//     if (startLocation) {
//       fetchBusRoutes();
//     }
//   }, [startLocation]);

//   const fetchTouristSpot = async () => {
//     try {
//       const response = await axios.get(`http://localhost:2000/api/tourists/name/${spotName}`);
//       console.log("Fetched Tourist Spot:", response.data);
//       setTouristSpot(response.data);
//     } catch (error) {
//       console.error("Error fetching tourist spot details:", error);
//     }
//   };

//   const fetchBusRoutes = async () => {
//     try {
//       setBusRoutes([]); 

//       const i = startLocation.toUpperCase();
//  const p = touristSpot?.nearestBusStop[0]; 

// const e = p.toUpperCase() ;
// //const e=spotName.toUpperCase();


//       const startIdRes = await axios.get(`http://localhost:2000/api/stops/name/${i}`);
//       const endIdRes = await axios.get(`http://localhost:2000/api/stops/name/${e}`);

//       const sId = startIdRes.data._id;
//       const eId = endIdRes.data._id;

//       let allRoutes = []; 


//       let response = await axios.get(`http://localhost:2000/api/users/${sId}/${eId}`);
//       let directRoutes = response.data;
//       if (Array.isArray(directRoutes) && directRoutes.length > 0) {
//         const processedDirectRoutes = await Promise.all(directRoutes.map(processRoute));
//         allRoutes = [...allRoutes, ...processedDirectRoutes]; 
//       }
//       console.log(allRoutes+" 1203");

//       response = await axios.get(`http://localhost:2000/api/users/intermediate/${sId}/${eId}`);
//       let intermediateRoutes = response.data;
//       if (Array.isArray(intermediateRoutes) && intermediateRoutes.length > 0) {
//         const processedIntermediateRoutes = await Promise.all(intermediateRoutes.map(processRoute));
//         allRoutes = [...allRoutes, ...processedIntermediateRoutes];
//       }

//       console.log(allRoutes+" 1212");
//       response = await axios.get(`http://localhost:2000/api/users/indirect/${sId}/${eId}`);
//       let indirectRoutes = response.data;
//       if (Array.isArray(indirectRoutes) && indirectRoutes.length > 0) {
//         const processedIndirectRoutes = await Promise.all(indirectRoutes.map(handleIndirect));
//         allRoutes = [...allRoutes, ...processedIndirectRoutes];
//       }
//       console.log(allRoutes+" 1219");

//       setBusRoutes(allRoutes);

//       console.log(allRoutes+" 1223");
//     } catch (err) {
//       console.error("Error fetching routes:", err);
//       setBusRoutes([]);
//     }
//   };


//   const handleIndirect = async (route) => {
//     try {
//       let commStop = await axios.get(`http://localhost:2000/api/stops/id/${route.commonStops}`);
//       commStop = commStop.data.name.replace(/[\[\]']/g, "");

//       return {
//         startBus: route.start,
//         commonStops: commStop,
//         endBus: route.end,
//       };
//     } catch (error) {
//       console.error("Error processing indirect route:", error);
//       return null;
//     }
//   };
//   //spotName="nagole"
//   const processRoute = async (route) => {
//     try {
//       const inter = route.intermediateStops || [];
//       const intermediateStopPromises = inter.map(async (id) => {
//         const stop = await axios.get(`http://localhost:2000/api/stops/id/${id}`);
//         return stop.data.name.replace(/[\[\]']/g, "");
//       });

//       const intermediateStops = await Promise.all(intermediateStopPromises);

//       return {
//         busNumber: route.number,
//         startLocation,
//         endLocation: spotName,
//         intermediateRoutes: intermediateStops,
//       };
//     } catch (error) {
//       console.error("Error processing route:", error);
//       return null;
//     }
//   };


//   console.log(busRoutes)
//   return (
//     <div style={styles.pageContainer}>

// <iframe
//   title="Google Maps"
//   style={styles.mapBackground}
//   src={
//     startLocation
//       ? `https://www.google.com/maps/embed/v1/directions?key=AIzaSyAqjuHEXUhERkYhHd7zUMD8m6v7bzmxkP0&origin=${encodeURIComponent(
//           startLocation
//         )}&destination=${encodeURIComponent(spotName)}&mode=transit&maptype=${mapType}`
//       : `https://www.google.com/maps/embed/v1/place?key=AIzaSyAqjuHEXUhERkYhHd7zUMD8m6v7bzmxkP0&q=${encodeURIComponent(
//           spotName
//         )}&maptype=${mapType}`
//   }
//   allowFullScreen
// ></iframe>



//       <div style={styles.searchContainer}>
//         <input
//           type="text"
//           placeholder="Enter your start location..."
//           value={startLocation}
//           onChange={(e) => setStartLocation(e.target.value)}
//           style={styles.searchInput}
//         />
//         <Search size={20} style={styles.searchIcon} />
//       </div>


//       {touristSpot && (
//         <div style={styles.container}>

//           <div style={styles.imageContainer}>
//             {touristSpot.url?.map((img, index) => (
//               <img key={index} src={img} alt="Tourist spot" style={styles.image} />
//             ))}
//           </div>

//           <h1 style={styles.title}>{touristSpot.name || "Unknown Name"}</h1>
//           <div style={styles.ratingContainer}>
//             <Star size={18} color="gold" />
//             <span style={styles.ratingText}>
//               {touristSpot.rating || "N/A"} ({touristSpot.reviews || "No reviews"})
//             </span>
//           </div>
//           <p style={styles.category}>
//             {touristSpot.category || "Unknown Category"} • {touristSpot.travelTime || "Unknown time"} away
//           </p>
//           <p style={styles.closingTime}>
//             <Clock size={18} /> Closes at {touristSpot.closingTime || "Unknown"}
//           </p>
//           <p style={styles.location}>
//             <MapPin size={18} /> {touristSpot.nearestBusStop || "Address not available"}
//           </p>


//           {startLocation && busRoutes.length > 0 && (
//             <div style={styles.busInfo}>
//               <Bus size={24} color="white" />
//               <span style={styles.busText}>
//                 Available Buses:{" "}
//                 {busRoutes
//                   .filter((route) => route !== null)
//                   .map((route) => `Bus ${route.busNumber}`)
//                   .join(", ")}
//               </span>
//             </div>
//           )}
//         </div>
//       )}

//       <div style={styles.buttonContainer}>
//         <button style={styles.button} onClick={() => setMapType("roadmap")}>
//           Roadmap
//         </button>
//         <button style={styles.button} onClick={() => setMapType("satellite")}>
//           Satellite
//         </button>
//       </div>
//     </div>
//   );
// };


const SpecificSpot = () => {
  const location = useLocation();
  let spotName = location.state?.spotName || location.state?.query || "No spot selected";
  spotName = startCase(toLower(spotName));
  console.log(spotName)

  const [mapType, setMapType] = useState("roadmap");
  const [startLocation, setStartLocation] = useState("");
  const [busRoutes, setBusRoutes] = useState([]);
  const [touristSpot, setTouristSpot] = useState(null);

  const [showOverlay, setShowOverlay] = useState(false);
  const [searchText, setSearchText] = useState("");


  useEffect(() => {
    if (spotName) {
      fetchTouristSpot();
    }
  }, [spotName]);

  useEffect(() => {
    if (startLocation && touristSpot) {
      fetchBusRoutes();
    }
  }, [startLocation, touristSpot]);

  const fetchTouristSpot = async () => {
    try {
      const response = await axios.get(`http://localhost:2000/api/tourists/name/${spotName}`);
      setTouristSpot(response.data);
    } catch (error) {
      console.error("Error fetching tourist spot details:", error);
    }
  };

  const fetchBusRoutes = async () => {
    try {
      setBusRoutes([]);

      const origin = startLocation.toUpperCase();
      const nearestStop = touristSpot?.nearestBusStop[0]?.toUpperCase();

      const startIdRes = await axios.get(`http://localhost:2000/api/stops/name/${origin}`);
      const endIdRes = await axios.get(`http://localhost:2000/api/stops/name/${nearestStop}`);

      const sId = startIdRes.data._id;
      const eId = endIdRes.data._id;

      let allRoutes = [];

      // Direct
      const directRes = await axios.get(`http://localhost:2000/api/users/${sId}/${eId}`);
      if (Array.isArray(directRes.data)) {
        const processed = await Promise.all(directRes.data.map(processRoute));
        allRoutes.push(...processed);
      }

      // Intermediate
      const intermediateRes = await axios.get(`http://localhost:2000/api/users/intermediate/${sId}/${eId}`);
      if (Array.isArray(intermediateRes.data)) {
        const processed = await Promise.all(intermediateRes.data.map(processRoute));
        allRoutes.push(...processed);
      }

      // Indirect
      const indirectRes = await axios.get(`http://localhost:2000/api/users/indirect/${sId}/${eId}`);
      if (Array.isArray(indirectRes.data)) {
        const processed = await Promise.all(indirectRes.data.map(handleIndirect));
        allRoutes.push(...processed);
      }

      setBusRoutes(allRoutes.filter(Boolean));
    } catch (err) {
      console.error("Error fetching routes:", err);
      setBusRoutes([]);
    }
  };

  const processRoute = async (route) => {
    try {
      const stops = await Promise.all(
        (route.intermediateStops || []).map(async (id) => {
          const res = await axios.get(`http://localhost:2000/api/stops/id/${id}`);
          return res.data.name;
        })
      );

      return {
        type: "direct" in route ? "direct" : "intermediate",
        busNumber: route.number,
        startLocation,
        endLocation: spotName,
        intermediateRoutes: stops,
      };
    } catch (error) {
      console.error("Error processing route:", error);
      return null;
    }
  };

  const handleIndirect = async (route) => {
    try {
      const stopRes = await axios.get(`http://localhost:2000/api/stops/id/${route.commonStops}`);
      return {
        type: "indirect",
        startBus: route.start,
        endBus: route.end,
        commonStops: stopRes.data.name,
      };
    } catch (error) {
      console.error("Error processing indirect route:", error);
      return null;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchText.trim() !== "") {
      setStartLocation(searchText.trim());
      setShowOverlay(true);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <iframe
        title="Google Maps"
        style={styles.mapBackground}
        src={
          startLocation
            ? `https://www.google.com/maps/embed/v1/directions?key=AIzaSyAqjuHEXUhERkYhHd7zUMD8m6v7bzmxkP0&origin=${encodeURIComponent(
              startLocation
            )}&destination=${encodeURIComponent(spotName)}&mode=transit&maptype=${mapType}`
            : `https://www.google.com/maps/embed/v1/place?key=AIzaSyAqjuHEXUhERkYhHd7zUMD8m6v7bzmxkP0&q=${encodeURIComponent(
              spotName
            )}&maptype=${mapType}`
        }
        allowFullScreen
      ></iframe>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search location..."
          style={styles.searchInput}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setStartLocation(searchText.trim());
              setShowOverlay(true);
            }
          }}
        />

        <Search size={20} style={styles.searchIcon} />
      </div>

      {/* {touristSpot && (
        <div style={styles.container}>
          <div style={styles.imageContainer}>
            {touristSpot.url?.map((img, index) => (
              <img key={index} src={img} alt="Tourist spot" style={styles.image} />
            ))}
          </div>

          <h1 style={styles.title}>{touristSpot.name || "Unknown Name"}</h1>
          <div style={styles.ratingContainer}>
            <Star size={18} color="gold" />
            <span style={styles.ratingText}>
              {touristSpot.rating || "N/A"} ({touristSpot.reviews || "No reviews"})
            </span>
          </div>
          <p style={styles.category}>
            {touristSpot.category || "Unknown Category"} • {touristSpot.travelTime || "Unknown time"} away
          </p>
          <p style={styles.closingTime}>
            <Clock size={18} /> Closes at {touristSpot.closingTime || "Unknown"}
          </p>
          <p style={styles.location}>
            <MapPin size={18} /> {touristSpot.nearestBusStop || "Address not available"}
          </p>

          {startLocation && busRoutes.length > 0 && (
            <div style={styles.busInfo}>
              <Bus size={24} color="white" />
              <span style={styles.busText}>
                Available Buses:
                <ul>
                <ul>
  {busRoutes.map((route, index) => (
    <li key={index}>
      {route.type === "indirect" ? (
        <>
          Bus {route.startBus} → {route.commonStops} → Bus {route.endBus}
        </>
      ) : (
        <>
          Bus {route.busNumber}
          
        </>
      )}
    </li>
  ))}
</ul>

                </ul>
              </span>
            </div>
          )}
        </div>
      )} */}


      {touristSpot && (
        <div style={styles.container}>
          <div style={styles.imageContainer}>
            {touristSpot.url?.map((img, index) => (
              <img key={index} src={img} alt={`Tourist spot ${index + 1}`} style={styles.image} />
            ))}
          </div>

          <h1 style={styles.title}>{touristSpot.name || "Unknown Name"}</h1>

          <div style={styles.ratingContainer}>
            <Star size={18} color="gold" />
            <span style={styles.ratingText}>
              {touristSpot.rating || "N/A"} ({touristSpot.reviews || "No reviews"})
            </span>
          </div>

          <p style={styles.timing}>
            <Clock size={18} /> Open: {touristSpot.openingTime || "Unknown"} – Closes at {touristSpot.closingTime || "Unknown"}
          </p>

          <p style={styles.description}>
            {touristSpot.description || "No description available."}
          </p>

          {/* <p style={styles.location}>
      <MapPin size={18} /> Nearest Bus Stop:
      {Array.isArray(touristSpot.nearestBusStop) && touristSpot.nearestBusStop.length > 0 ? (
        <ul>
          {touristSpot.nearestBusStop.map((stop, idx) => (
            <li key={idx}>{stop}</li>
          ))}
        </ul>
      ) : (
        " Not available"
      )}
    </p> */}

          <div style={styles.location}>
            <MapPin size={18} /> Nearest Bus Stop:
            {Array.isArray(touristSpot.nearestBusStop) && touristSpot.nearestBusStop.length > 0 ? (
              <ul>
                {touristSpot.nearestBusStop.map((stop, idx) => (
                  <li key={idx}>{stop}</li>
                ))}
              </ul>
            ) : (
              " Not available"
            )}
          </div>


          {/* {startLocation && busRoutes.length > 0 && (
      <div style={styles.busInfo}>
        <Bus size={24} color="white" />
        <span style={styles.busText}>
          Available Buses:
          <ul>
            {busRoutes.map((route, index) => (
              <li key={index}>
                {route.type === "indirect" ? (
                  <>Bus {route.startBus} → {route.commonStops} → Bus {route.endBus}</>
                ) : (
                  <>Bus {route.busNumber}</>
                )}
              </li>
            ))}
          </ul>
        </span>
      </div>
    )} */}

          {startLocation && busRoutes.length > 0 && showOverlay && (
            <div style={styles.busInfo}>
              <button style={styles.closeButton} onClick={() => setShowOverlay(false)}>❌</button>
              <Bus size={20} color="white" style={{ marginRight: "5px" }} />
              <span style={styles.busText}>
                <strong>Available Buses:</strong>
                <ul>
                  {busRoutes.map((route, index) => (
                    <li key={index}>
                      {route.type === "indirect" ? (
                        <>Bus {route.startBus} → {route.commonStops} → Bus {route.endBus}</>
                      ) : (
                        <>Bus {route.busNumber}</>
                      )}
                    </li>
                  ))}
                </ul>
              </span>
            </div>
          )}

        </div>
      )}


      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => setMapType("roadmap")}>
          Roadmap
        </button>
        <button style={styles.button} onClick={() => setMapType("satellite")}>
          Satellite
        </button>
      </div>
    </div>
  );
};




const styles = {
  pageContainer: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  mapBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    border: "none",
    filter: "brightness(85%)",
  },
  searchContainer: {
    position: "absolute",
    top: "10px",
    left: "10px",
    width: "450px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "10px 14px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    display: "flex",
    alignItems: "center",
    zIndex: 10,
  },
  searchInput: {
    width: "90%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
  },
  searchIcon: {
    marginLeft: "10px",
    cursor: "pointer",
    color: "#007bff",
  },
  container: {
    position: "absolute",
    top: "80px",
    left: "10px",
    width: "420px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    fontSize: "13px",
  },
  imageContainer: {
    display: "flex",
    gap: "6px",
    overflowX: "auto",
    marginBottom: "10px",
    paddingBottom: "6px",
  },
  image: {
    width: "90px",
    height: "70px",
    borderRadius: "6px",
    objectFit: "cover",
    flexShrink: 0,
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "6px",
    color: "#222",
  },
  ratingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    marginBottom: "8px",
  },
  ratingText: {
    fontSize: "13px",
    fontWeight: "500",
  },
  timing: {
    fontSize: "13px",
    marginBottom: "6px",
  },
  description: {
    fontSize: "13px",
    color: "#444",
    marginBottom: "10px",
    lineHeight: "1.4",
  },
  category: {
    fontSize: "13px",
    color: "#555",
    marginBottom: "6px",
  },
  location: {
    fontSize: "13px",
    color: "#333",
    marginBottom: "10px",
    textAlign: "center",
  },


  // busInfo: {
  //   position: "fixed",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   backgroundColor: "rgba(255, 255, 255, 0.95)", 
  //   color: "#333",
  //   padding: "30px",
  //   borderRadius: "16px",
  //   boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
  //   zIndex: 999,
  //   width: "80%",
  //   maxWidth: "500px",
  //   maxHeight: "70vh",
  //   overflowY: "auto",
  // },



  // closeButton: {
  //   position: "absolute",
  //   top: "10px",
  //   right: "10px",
  //   background: "transparent",
  //   border: "none",
  //   fontSize: "20px",
  //   cursor: "pointer",
  //   color: "#333",
  // },



  // busText: {
  //   fontSize: "16px",
  //   lineHeight: "1.6",
  // },

  busInfo: {
    position: "fixed",
    top: "55%",
    left: "18%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    color: "#333",
    padding: "24px 28px",
    borderRadius: "20px",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
    zIndex: 999,
    width: "50%",
    maxWidth: "450px",
    maxHeight: "75vh",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  closeButton: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "transparent",
    border: "none",
    fontSize: "22px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#555",
  },

  busText: {
    fontSize: "16px",
    lineHeight: "1.6",
    textAlign: "left",
  },

  buttonContainer: {
    position: "absolute",
    top: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "10px",
    zIndex: 10,
  },
  button: {
    padding: "6px 12px",
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
    transition: "0.2s ease",
  },
};


export default SpecificSpot;

