const express = require('express');
const app = express();
const vehicleRoute = express.Router();
var mongoose = require('mongoose');

// Vehicle model
let Vehicle = require('../models/Vehicle');
// Add Vehicle
vehicleRoute.route('/create').post((req, res, next) => {
  Vehicle.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});
// Get All Vehicles
vehicleRoute.route('/').get((req, res) => {
  Vehicle.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// Get single Vehicle
vehicleRoute.route('/read/:id').get((req, res) => {
  Vehicle.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Vehicle
vehicleRoute.route('/update/:id').put((req, res, next) => {
  Vehicle.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})
// Delete Vehicle
vehicleRoute.route('/delete/:id').delete((req, res, next) => {
  Vehicle.deleteOne(
    {"_id": mongoose.Types.ObjectId(req.params.id)}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = vehicleRoute;