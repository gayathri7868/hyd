

// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Carousel from 'react-bootstrap/Carousel';

// function TouristAttraction() {
//   const [selected, setSelected] = useState('All');

//   const categories = [
//     { name: 'All' },
//     { name: 'Temples', icon: '🛕' },
//     { name: 'Monuments', icon: '🏛️' },
//     { name: 'Parks', icon: '🌳' },
//     { name: 'Adventure Parks', icon: '🎢' },
//     { name: 'Museums', icon: '🏺' },
//     { name: 'Beaches', icon: '🏖️' }
//   ];

//   const touristSpots = {
//     All: [
//       {
//         name: 'Ramoji Film City',
//         images: [
//           'https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg',
//           'https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg',
//           'https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg',
//           'https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg',
//           'https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg',
//           'https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg',
//           'https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg',
//           'https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg'
//         ],
//         rating: 4.4,
//         timings: 'Opens 9 AM Sun',
//         description: "The world's largest film studio offering tours, live shows, on-site theme park and adventure zone.",
//       },
//       {
//         name: 'Charminar',
//         images: [
//           'https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg',
//           'https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg',
//           'https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg',
//           '/mnt/data/charminar4.jpg',
//           '/mnt/data/charminar5.jpg'
//         ],
//         rating: 4.5,
//         timings: 'Open 24 hours',
//         description: 'Historic monument and mosque known for its grand arches and bustling surrounding market.',
//       }
//     ]
//   };

//   return (
//     <div className="container mt-2 mx-auto" style={{ maxWidth: '1200px' }}>
//       {/* Search Bar */}
//       <div className="mb-1">
//         <input type="text" placeholder="Search..." className="form-control rounded-pill p-1" style={{ fontSize: '14px' }} />
//       </div>

//       {/* Category Buttons */}
//       <div className="d-flex flex-wrap gap-1 justify-content-center mb-1">
//         {categories.map((category) => (
//           <button
//             key={category.name}
//             onClick={() => setSelected(category.name)}
//             className={`btn d-flex align-items-center px-2 py-1 rounded-pill border-0 ${selected === category.name ? 'bg-dark text-white' : 'bg-light text-dark'}`}
//             style={{ minWidth: 'auto', maxWidth: '180px', fontSize: '15px' }}
//           >
//             <span className="me-1">{category.icon}</span>
//             {category.name}
//           </button>
//         ))}
//       </div>

//       {/* Tourist Spots */}
//       <div className="row justify-content-center">
//         {touristSpots[selected]?.map((spot, index) => (
//           <div className="col-md-8 mb-2" key={index}>
//             <div className="card border-0 shadow-sm">
//               <div className="d-flex overflow-auto" style={{ whiteSpace: 'nowrap', height: '130px' }}>
//                 {spot.images.slice(0, 5).map((image, imgIndex) => (
//                   <img 
//                     key={imgIndex} 
//                     src={image} 
//                     className="d-inline-block me-1" 
//                     style={{ width: '230px', height: '130px', borderRadius: '6px' }} 
//                     alt={`${spot.name} ${imgIndex + 1}`} 
//                   />
//                 ))}
//               </div>
//               <div className="card-body" style={{ padding: '8px' }}>
//                 <h6 className="card-title" style={{ fontSize: '14px' }}>{spot.name}</h6>
//                 <div className="d-flex justify-content-between" style={{ fontSize: '12px' }}>
//                   <span><strong>⭐ {spot.rating}</strong></span>
//                   <span>{spot.timings}</span>
//                 </div>
//                 <p className="card-text" style={{ fontSize: '12px', marginTop: '4px' }}>{spot.description}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TouristAttraction;









// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function TouristAttraction() {
//   const [selected, setSelected] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   const categories = [
//     { name: 'All' },
//     { name: 'Temples', icon: '🛕' },
//     { name: 'Monuments', icon: '🏛️' },
//     { name: 'Parks', icon: '🌳' },
//     { name: 'Adventure Parks', icon: '🎢' },
//     { name: 'Museums', icon: '🏺' },
//     { name: 'Beaches', icon: '🏖️' }
//   ];

//   const touristSpots = {
//     All: [
//       {
//         name: 'Ramoji Film City',
//         images: [
//           'https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg'
//         ],
//         rating: 4.4,
//         timings: 'Opens 9 AM Sun',
//         description: "The world's largest film studio offering tours, live shows, on-site theme park and adventure zone."
//       },
//       {
//         name: 'Charminar',
//         images: [
//           'https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg'
//         ],
//         rating: 4.5,
//         timings: 'Open 24 hours',
//         description: 'Historic monument and mosque known for its grand arches and bustling surrounding market.'
//       }
//     ]
//   };

//   const handleSpotClick = (spotName) => {
//     navigate(`/SpecificSpot`,{ state: { spotName } });
//   };

//   const handleSearch = (event) => {
//     if (event.key === 'Enter' && searchTerm.trim() !== '') {
//       navigate(`/SpecificSpot`,{ state: { query: searchTerm.trim() } });
//     }
//   };

//   return (
//     <div className="container mt-2 mx-auto" style={{ maxWidth: '1400px' }}>
//       {/* Search Bar */}
//       {/* <div className="mb-1">
//         <input
//           type="text"
//           placeholder="         Search..."
//           className="form-control rounded-pill p-1 m-3"
//           style={{ fontSize: '16px', width: '500px' }}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyDown={handleSearch}
//         />
//       </div> */}
//       <div className="text-center">
        
//       <input
//         type="text"
//         placeholder="Search..."
//         className="form-control  p-1 d-inline-block m-3 mb-4"
//         style={{ fontSize: "17.5px", width: "500px" ,textAlign:"center",border:"2px solid rgba(0,0,0,0.1)",borderRadius:"20px"}}
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         onKeyDown={handleSearch}
//       />
  
// </div>


//       {/* Category Buttons */}
//       <div className="d-flex flex-wrap gap-3 justify-content-center mb-3">
//         {categories.map((category) => (
//           <button
//             key={category.name}
//             onClick={() => setSelected(category.name)}
//             // className={`btn d-flex align-items-center px-2 py-1  border-0 ${selected === category.name ? 'bg-dark text-white' : 'bg-light text-dark'}`}
//             // style={{ minWidth: 'auto', maxWidth: '180px', fontSize: '16px',borderRadius:"7px" }}
//             className={`btn d-flex align-items-center justify-content-center gap-2 px-2 py-1 border-0 ${selected === category.name ? 'text-white' : 'text-dark bg-light'}`}
// style={{
//   backgroundColor: selected === category.name ? "rgb(62, 147, 237)" : "lightgray",
//   minWidth: "auto",
//   maxWidth: "180px",
//   fontSize: "16px",
//   borderRadius: "7px",
// }}

//           >
//             <span className="me-1">{category.icon}</span>
//             {category.name}
//           </button>
//         ))}
//       </div>

//       {/* Tourist Spots */}
//       <div className="d-flex flex-row   gap-5" style={{marginTop:"6rem"}}>
//         {touristSpots[selected]?.map((spot, index) => (
//           <div className="col-md-8 mb-4 h-100" key={index} style={{width:"450px",height:"250px"}}>
//             <div className="card border-0 shadow-sm">
//               <div 
//                 className="d-flex overflow-auto" 
//                 style={{ whiteSpace: 'nowrap', height: '150px', cursor: 'pointer' }}
//                 onClick={() => handleSpotClick(spot.name)}
//               >
//                 {spot.images.map((image, imgIndex) => (
//                   <img 
//                     key={imgIndex} 
//                     src={image} 
//                     className="d-inline-block me-1" 
//                     style={{ width: '120px', height: '140px', borderRadius: '6px' }} 
//                     alt={`${spot.name} ${imgIndex + 1}`} 
//                   />
//                 ))}
//               </div>
//               <div className="card-body" style={{ padding: '6px' }}>
//                 <h6 
//                   className="card-title" 
//                   style={{ fontSize: '14px', cursor: 'pointer' }} 
//                   onClick={() => handleSpotClick(spot.name)}
//                 >
//                   {spot.name}
//                 </h6>
//                 <div className="d-flex justify-content-between" style={{ fontSize: '12px' }}>
//                   <span><strong>⭐ {spot.rating}</strong></span>
//                   <span>{spot.timings}</span>
//                 </div>
//                 <p className="card-text" style={{ fontSize: '14px', marginTop: '6px' }}>{spot.description}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TouristAttraction;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// function TouristAttraction() {
//   const [selected, setSelected] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const categories = [
//     { name: "All" },
//     { name: "Temples", icon: "🛕" },
//     { name: "Monuments", icon: "🏛️" },
//     { name: "Parks", icon: "🌳" },
//     { name: "Adventure Parks", icon: "🎢" },
//     { name: "Museums", icon: "🏺" },
//     { name: "Beaches", icon: "🏖️" },
//   ];

//   const touristSpots = {
//     All: [
//       {
//         name: "Ramoji Film City",
//         images: [
//           "https://i0.wp.com/weekendyaari.in/wp-content/uploads/2024/09/weekend-yaari-ramoji-film-city-1.webp?fit=1921%2C1081&ssl=1",
//           "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/13/c4/26/a7.jpg",
//           "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2023/06/08171423/bahubali-set1-1024x576.jpg",
//           "https://content.jdmagicbox.com/v2/comp/hyderabad/j5/040pxx40.xx40.200627151343.t9j5/catalogue/ramoji-film-city-abdullapurmet-rangareddy-tourist-attraction-bpa97c1vwz.jpg",
//           "https://sceneloc8.com/wp-content/uploads/2024/03/Ramoji-Film-City-4.png",
          
//           "https://i0.wp.com/weekendyaari.in/wp-content/uploads/2024/09/weekend-yaari-ramoji-film-city-1.webp?fit=1921%2C1081&ssl=1",
//           "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/13/c4/26/a7.jpg",
//           "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2023/06/08171423/bahubali-set1-1024x576.jpg",
//           "https://content.jdmagicbox.com/v2/comp/hyderabad/j5/040pxx40.xx40.200627151343.t9j5/catalogue/ramoji-film-city-abdullapurmet-rangareddy-tourist-attraction-bpa97c1vwz.jpg",
//           "https://sceneloc8.com/wp-content/uploads/2024/03/Ramoji-Film-City-4.png",
          
          
//         ],
//         rating: 4.4,
//         timings: "Opens 9 AM Sun",
//         description:
//           "The world's largest film studio offering tours, live shows, on-site theme park and adventure zone.",
//       },
//       {
//         name: "Charminar",
//         images: [
//           "https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg",
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpEFOh6R7aNi_ghVnT1ubQVgTLPIw4whhzdw&s",
//           "https://cdn.siasat.com/wp-content/uploads/2024/03/ramzan-hyderabad-March11.jpg",
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk1FprwkFdifTw1UJjU2b5oefQKUqta0njMg&s",
      
//           "https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg",
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpEFOh6R7aNi_ghVnT1ubQVgTLPIw4whhzdw&s",
//           "https://cdn.siasat.com/wp-content/uploads/2024/03/ramzan-hyderabad-March11.jpg",
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk1FprwkFdifTw1UJjU2b5oefQKUqta0njMg&s",
      
//         ],
//         rating: 4.5,
//         timings: "Open 24 hours",
//         description:
//           "Historic monument and mosque known for its grand arches and bustling surrounding market.",
//       },
//     ],
//   };

//   const handleSpotClick = (spotName) => {
//     navigate(`/SpecificSpot`, { state: { spotName } });
//   };

//   const handleSearch = (event) => {
//     if (event.key === "Enter" && searchTerm.trim() !== "") {
//       navigate(`/SpecificSpot`, { state: { query: searchTerm.trim() } });
//     }
//   };

//   return (
//     <div className="container mt-2 mx-auto" style={{ maxWidth: "1400px" }}>
//       {/* Search Bar */}
//       <div className="text-center">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="form-control p-1 d-inline-block m-3 mb-4"
//           style={{
//             fontSize: "17.5px",
//             width: "500px",
//             textAlign: "center",
//             border: "2px solid rgba(0,0,0,0.1)",
//             borderRadius: "20px",
//           }}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyDown={handleSearch}
//         />
//       </div>

//       {/* Category Buttons */}
//       <div className="d-flex flex-wrap gap-3 justify-content-center mb-3">
//         {categories.map((category) => (
//           <button
//             key={category.name}
//             onClick={() => setSelected(category.name)}
//             className={`btn d-flex align-items-center justify-content-center gap-2 px-2 py-1 border-0 ${
//               selected === category.name ? "text-white" : "text-dark bg-light"
//             }`}
//             style={{
//               backgroundColor:
//                 selected === category.name ? "rgb(62, 147, 237)" : "lightgray",
//               minWidth: "auto",
//               maxWidth: "180px",
//               fontSize: "16px",
//               borderRadius: "7px",
//             }}
//           >
//             <span className="me-1">{category.icon}</span>
//             {category.name}
//           </button>
//         ))}
//       </div>

//       {/* Tourist Spots (One Card Per Row) */}
//       <div
//         className="d-flex flex-column align-items-center"
//         style={{ marginTop: "4rem", width: "100%" }}
//       >
//         {touristSpots[selected]?.map((spot, index) => (
//           <div
//             className="mb-4"
//             key={index}
//             style={{
//               width: "70%",
//               maxWidth: "1000px",
//               height: "auto",
//               display: "block",
//             }}
//           >
//             <div className="card border-0 shadow-sm">
//               <div
//                 className="d-flex overflow-auto"
//                 style={{
//                   whiteSpace: "nowrap",
//                   height: "200px",
//                   cursor: "pointer",
//                   padding: "10px",
//                 }}
//                 onClick={() => handleSpotClick(spot.name)}
//               >
//                 {spot.images.map((image, imgIndex) => (
//                   <img
//                     key={imgIndex}
//                     src={image}
//                     className="d-inline-block me-2"
//                     style={{
//                       width: "180px",
//                       height: "130px",
//                       borderRadius: "8px",
//                     }}
//                     alt={`${spot.name} ${imgIndex + 1}`}
//                   />
//                 ))}
//               </div>
//               <div className="card-body" style={{ padding: "12px" }}>
//                 <h5
//                   className="card-title"
//                   style={{ fontSize: "18px", cursor: "pointer" }}
//                   onClick={() => handleSpotClick(spot.name)}
//                 >
//                   {spot.name}
//                 </h5>
//                 <div
//                   className="d-flex justify-content-between"
//                   style={{ fontSize: "14px" }}
//                 >
//                   <span>
//                     <strong>⭐ {spot.rating}</strong>
//                   </span>
//                   <span>{spot.timings}</span>
//                 </div>
//                 <p
//                   className="card-text"
//                   style={{ fontSize: "16px", marginTop: "8px" }}
//                 >
//                   {spot.description}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TouristAttraction;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function TouristAttraction() {
  const [selected, setSelected] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [touristSpots, setTouristSpots] = useState([]);
  const navigate = useNavigate();

  const categories = [
    { name: "All" },
    { name: "Temples", icon: "🛕" },
    { name: "Monuments", icon: "🏛️" },
    { name: "Parks", icon: "🌳" },
    { name: "Adventure Parks", icon: "🎢" },
    { name: "Museums", icon: "🏺" },
    { name: "Beaches", icon: "🏖️" },
  ];

  useEffect(() => {
    const fetchTouristSpots = async () => {
      try {
        const response = await fetch("http://localhost:2000/api/tourists");
        const data = await response.json();
        setTouristSpots(data);
      } catch (error) {
        console.error("Error fetching tourist places:", error);
      }
    };

    fetchTouristSpots();
  }, []);


  const filteredSpots =
    selected === "All"
      ? touristSpots
      : touristSpots.filter((spot) => spot.category === selected);

  const handleSpotClick = (spotName) => {
    navigate(`/SpecificSpot`, { state: { spotName } });
  };

  const handleSearch = (event) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/SpecificSpot`, { state: { query: searchTerm.trim() } });
    }
  };

  return (
    <div className="container mt-2 mx-auto" style={{ maxWidth: "1400px" }}>
      
      <div className="text-center">
        <input
          type="text"
          placeholder="Search..."
          className="form-control p-1 d-inline-block m-3 mb-4"
          style={{
            fontSize: "17.5px",
            width: "500px",
            textAlign: "center",
            border: "2px solid rgba(0,0,0,0.1)",
            borderRadius: "20px",
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      
      <div className="d-flex flex-wrap gap-3 justify-content-center mb-3">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelected(category.name)}
            className={`btn d-flex align-items-center justify-content-center gap-2 px-2 py-1 border-0 ${
              selected === category.name ? "text-white" : "text-dark bg-light"
            }`}
            style={{
              backgroundColor:
                selected === category.name ? "rgb(62, 147, 237)" : "lightgray",
              minWidth: "auto",
              maxWidth: "180px",
              fontSize: "16px",
              borderRadius: "7px",
            }}
          >
            <span className="me-1">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

     
      <div
        className="d-flex flex-column align-items-center"
        style={{ marginTop: "4rem", width: "100%" }}
      >
        {filteredSpots.length > 0 ? (
          filteredSpots.map((spot, index) => (
            <div
              className="mb-4"
              key={index}
              style={{
                width: "70%",
                maxWidth: "1000px",
                height: "auto",
                display: "block",
              }}
            >
              <div className="card border-0 shadow-sm">
                <div
                  className="d-flex overflow-auto"
                  style={{
                    whiteSpace: "nowrap",
                    height: "200px",
                    cursor: "pointer",
                    padding: "10px",
                  }}
                  onClick={() => handleSpotClick(spot.name)}
                >
                  {spot.url.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      className="d-inline-block me-2"
                      style={{
                        width: "180px",
                        height: "130px",
                        borderRadius: "8px",
                      }}
                      alt={`${spot.name} ${imgIndex + 1}`}
                    />
                  ))}
                </div>
                <div className="card-body" style={{ padding: "12px" }}>
                  <h5
                    className="card-title"
                    style={{ fontSize: "18px", cursor: "pointer" }}
                    onClick={() => handleSpotClick(spot.name)}
                  >
                    {spot.name}
                  </h5>
                  <div
                    className="d-flex justify-content-between"
                    style={{ fontSize: "14px" }}
                  >
                    <span>
                      <strong>⭐ {spot.rating || "N/A"}</strong>
                    </span>
                    <span>
                      {spot.openingTime} - {spot.closingTime}
                    </span>
                  </div>
                  <p
                    className="card-text"
                    style={{ fontSize: "16px", marginTop: "8px" }}
                  >
                    {spot.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No places found for this category.</p>
        )}
      </div>
    </div>
  );
}

export default TouristAttraction;






