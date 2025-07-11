const express = require('express')
const routes = express.Router()
const routeModel = require('../models/Routes.Model');


routes.get('/rt/:sid', async (req, res) => {
    const sid = req.params.sid

    console.log(sid)
    try {
        const routeStop = await routeModel.find({
            $or: [
                { startLocation: sid },
                { endLocation: sid },
                { intermediateStops: sid }
            ]
        });

        console.log(routeStop);

        res.status(200).json(routeStop)
    }
    catch (err) {
        res.status(404).json(err);
    }
})

routes.get('/:startId/:endId', async (req, res) => {
    const startId = req.params.startId
    const endId = req.params.endId
    try {

        const route = await routeModel.find({ startLocation: startId, endLocation: endId })
        //console.log(startId + " " + endId)
        if (route.length != 0) {
            //console.log(route + " 13")
            res.status(200).json(route);
        }
        else {
            res.status(200).json(`a direct route is not available`);
        }
    }
    catch (err) {
        res.status(404).json(`some error`);
    }
})
routes.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const route = await routeModel.find({ number: id })
        console.log(route)
        if (route) {
            res.status(200).json(route);
        }
        else {
            //console.log("123");
            res.status(200).json(`route not found`)
        }
    }
    catch (err) {
        res.status(400).json(`error`);
    }

})


routes.get('/intermediate/:sid/:eid', async (req, res) => {
    const sid = req.params.sid
    const eid = req.params.eid
    try {
        const route = await routeModel.find({ intermediateStops: { $all: [sid, eid] } })
        const r1 = await routeModel.find({ startLocation: sid, intermediateStops: { $all: [eid] } })
        // console.log(r1 + " %% ");
        const r2 = await routeModel.find({ intermediateStops: { $all: [sid] }, endLocation: eid })

        //console.log(r2 + " %%");

        const combinedRoutes = Array.from(new Set([...route, ...r1, ...r2]));
        if (combinedRoutes.length != 0) {
            //console.log(combinedRoutes + " 65")
            res.status(200).json(combinedRoutes);
        }
        else {
            res.status(200).json(`data does not match`);
        }
    }
    catch (err) {
        res.status(400).json(`error`);
    }

})


// routes.get('/indirect/:sid/:eid', async (req, res) => {
//     const sid = req.params.sid
//     const eid = req.params.eid
//     try {

//         const start = await routeModel.find({ intermediateStops: sid });
//         const end = await routeModel.find({ intermediateStops: eid });

//         // console.log(start);
//         let connectingRoutes = []
//         for (let startRoute of start) {
//             for (let endRoute of end) {
//                 // console.log(startRoute)
//                 //console.log(startRoute.number + " " + endRoute.number + " &&");
//                 if (startRoute.number != endRoute.number) {
//                     const commonStops = startRoute.intermediateStops.filter(stop =>
//                         endRoute.intermediateStops.includes(stop)
//                     );
//                     //console.log(commonStops + " ^^")
//                     if (commonStops.length > 0) {
//                         connectingRoutes.push({
//                             start: startRoute.number,
//                             end: endRoute.number,
//                             commonStops: commonStops[0]

//                         })
//                     }
//                 }
//             }
//         }
//         if (connectingRoutes.length > 0) {
//             console.log(connectingRoutes)
//             res.status(200).json(connectingRoutes);
//         }
//         else {
//             res.status(400).json(`cannot find the direct routes`);
//         }

//     }
//     catch (err) {
//         res.status(404).json(`internal server error`);
//     }
// })

routes.get('/indirect/:sid/:eid', async (req, res) => {
    const sid = req.params.sid;
    const eid = req.params.eid;
  
    try {
      const start = await routeModel.find({
        $or: [
          { startLocation: sid },
          { endLocation: sid },
          { intermediateStops: sid }
        ]
      });
  
      const end = await routeModel.find({
        $or: [
          { startLocation: eid },
          { endLocation: eid },
          { intermediateStops: eid }
        ]
      });
  
      let connectingRoutes = [];
      for (let startRoute of start) {
        for (let endRoute of end) {
          if (startRoute.number !== endRoute.number) {
            const commonStops = startRoute.intermediateStops.filter(stop =>
              endRoute.intermediateStops.includes(stop)
            );
            if (commonStops.length > 0) {
              connectingRoutes.push({
                start: startRoute.number,
                end: endRoute.number,
                commonStops: commonStops[0],
              });
            }
          }
        }
      }
  
      if (connectingRoutes.length > 0) {
        res.status(200).json(connectingRoutes);
      } else {
        res.status(200).json([]); 
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Internal server error");
    }
  });
  


routes.get('/', async (req, res) => {

    try {
        const route = await routeModel.find();
        // console.log(route);
        res.status(200).json(route);
    }
    catch (error) {
        res.status(400).json(`error`);
    }

})
module.exports = routes