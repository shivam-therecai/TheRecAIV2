const mongoose = require('mongoose');

const StandardizedCollectionSchema = new mongoose.Schema({

  Role:String,
  Location:String,
  Technology:String,
  Skill:String
});

const StandardizedCollection = mongoose.model('StandardizedCollection', StandardizedCollectionSchema);

module.exports = StandardizedCollection;
