// import React from "react";
// import PropTypes from "prop-types";

// const IndirectRoutes = ({ indirectRoutes }) => {
//   if (!indirectRoutes || indirectRoutes.length === 0) {
//     return null;
//   }

//   return (
//     <div className="indirect-routes-container">
//       <h3>Indirect Routes Available</h3>
//       {indirectRoutes.map((route, index) => (
//         <div key={index} className="indirect-route-card">
//           <p><strong>First Bus:</strong> {route.startBus}</p>
//           <p><strong>Transfer at:</strong> {route.commonStops}</p>
//           <p><strong>Second Bus:</strong> {route.endBus}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// IndirectRoutes.propTypes = {
//   indirectRoutes: PropTypes.arrayOf(
//     PropTypes.shape({
//       startBus: PropTypes.string.isRequired,
//       commonStops: PropTypes.string.isRequired,
//       endBus: PropTypes.string.isRequired,
//     })
//   ),
// };

// export default IndirectRoutes;




// import React from "react";
// import PropTypes from "prop-types";
// import back from "../back.webp";
// import "../css/indirectRoutes.css";

// const IndirectRoutes = ({ indirectRoutes }) => {
//   if (!indirectRoutes || indirectRoutes.length === 0) {
//     return null;
//   }

//   return (
//     <>
      
//       <div className="routes-container">
//         {indirectRoutes.map((route, index) => (
//           <div key={index} className="route-card">
//             <img
//               src={back}
//               alt={`Bus Route ${route.startBus}`}
//               className="route-image"
//             />
//             <p>FROM: {route.startLoc}</p>
//             <p>TAKE: {route.startBus}</p>
//             <p>GO TO: {route.commonStops}</p>
//           </div>
//         ))}
//        <img src="/sd1.png" alt="direction" className="direct"/>
//         {indirectRoutes.map((route, index) => (
//           <div key={index} className="route-card">
//             <img
//               src={back}
//               alt={`Bus Route ${route.endBus}`}
//               className="route-image"
//             />
//             <p>FROM: {route.commonStops}</p>
//             <p>TAKE: {route.endBus}</p>
//             <p>GO TO DESTINATION: {route.endLoc}</p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// IndirectRoutes.propTypes = {
//   indirectRoutes: PropTypes.arrayOf(
//     PropTypes.shape({
//       startBus: PropTypes.string.isRequired,
//       commonStops: PropTypes.string.isRequired,
//       endBus: PropTypes.string.isRequired,
//       startLoc: PropTypes.string.isRequired, // Assuming startLoc is a string
//       destination: PropTypes.string.isRequired, // Assuming destination is a string
//     })
//   ),
// };

// export default IndirectRoutes;



import React from "react";
import PropTypes from "prop-types";
import back from "../back.webp";
import "../css/indirectRoutes.css";

const IndirectRoutes = ({ indirectRoutes }) => {
  if (!indirectRoutes || indirectRoutes.length === 0) return null;

  // Remove duplicates
  const uniqueRoutes = indirectRoutes.filter(
    (route, index, self) =>
      index ===
      self.findIndex(
        (r) =>
          r.startBus === route.startBus &&
          r.endBus === route.endBus &&
          r.commonStops === route.commonStops
      )
  );

  return (
    <div className="indirect-container">
      {uniqueRoutes.map((route, index) => (
        <div key={index} className="indirect-route-pair">
          <div className="route-card">
            <img
              src={back}
              alt={`Bus Route ${route.startBus}`}
              className="route-image"
            />
            <p>FROM: {route.startLoc}</p>
            <p>TAKE: {route.startBus}</p>
            <p>GO TO: {route.commonStops}</p>
          </div>

          <img src="/sd1.png" alt="direction" className="direct-arrow" />

          <div className="route-card">
            <img
              src={back}
              alt={`Bus Route ${route.endBus}`}
              className="route-image"
            />
            <p>FROM: {route.commonStops}</p>
            <p>TAKE: {route.endBus}</p>
            <p>GO TO DESTINATION: {route.endLoc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

IndirectRoutes.propTypes = {
  indirectRoutes: PropTypes.arrayOf(
    PropTypes.shape({
      startBus: PropTypes.string.isRequired,
      commonStops: PropTypes.string.isRequired,
      endBus: PropTypes.string.isRequired,
      startLoc: PropTypes.string.isRequired,
      endLoc: PropTypes.string.isRequired, // fixed naming
    })
  ),
};

export default IndirectRoutes;
