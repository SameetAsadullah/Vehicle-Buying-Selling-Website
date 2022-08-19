const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Vehicle = new Schema({
   image: {
      type: String
   },
   title: {
      type: String
   },
   location: {
      type: String
   },
   make: {
      type: String
   },
   type: {
      type: String
   },
   price: {
      type: String
   },
   date: {
      type: String
   },
   rating: {
      type: String
   },
   model: {
      type: String
   },
   year: {
      type: String
   },
   transmission: {
      type: String
   },
   mileage: {
      type: String
   },
   color: {
      type: String
   },
   registeredIn: {
      type: String
   },
   assembly: {
      type: String
   },
   engineCapacity: {
      type: String
   },
   lastUpdated: {
      type: String
   },
   featuresList: {
      type: String
   },
   exteriorCondition: {
      type: String
   },
   interiorCondition: {
      type: String
   },
   engineCondition: {
      type: String
   },
   transmissionCondition: {
      type: String
   },
   suspensionCondition: {
      type: String
   },
   steeringCondition: {
      type: String
   },
   sellerContactNo: {
      type: String
   },
   sellerEmail: {
      type: String
   },
   sellerLocation: {
      type: String
   },
   sellerContactHours: {
      type: String
   },
   sellerComments: {
      type: String
   }
}, {
   collection: 'vehicles'
})
module.exports = mongoose.model('Vehicle', Vehicle)