const dalNoSQL = require('./DAL/dalNoSQL.js');
//const dal = require('./DAL/dalNoSQL.js')


const snowboards = [{
  make: "capita",
  model: "mercury",
  msrp: "520.00",
  length: "157cm",
  flex: "medium_stiff",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "all_mountain",
  description: "snowboard"
},
{
  make: "flow",
  model: "blackout",
  msrp: "500.00",
  length: "156cm",
  flex: "medium_stiff",
  camber: "regular",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "all_mountain",
  description: "snowboard"
},
{
  make: "gnu",
  model: "zoid",
  msrp: "650.00",
  length: "158cm",
  flex: "medium_stiff",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "all_mountain",
  description: "snowboard"
},
{
  make: "libtech",
  model: "travis_rice_gold_member",
  msrp: "840.00",
  length: "155cm",
  flex: "medium_stiff",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "all_mountain",
  description: "snowboard"
},
{
  make: "nitro",
  model: "team",
  msrp: "500.00",
  length: "153cm",
  flex: "medium",
  camber: "regular",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "all_mountain",
  description: "snowboard"
},
{
  make: "ride",
  model: "berserker",
  msrp: "510.00",
  length: "159cm",
  flex: "medium_stiff",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "all_mountain",
  description: "snowboard"
},
{
  make: "rome",
  model: "mod_rocker",
  msrp: "580.00",
  length: "159cm",
  flex: "medium",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "all_mountain",
  description: "snowboard"
},
{
  make: "rossignol",
  model: "one_magtek",
  msrp: "500.00",
  length: "156cm",
  flex: "medium_stiff",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "all_mountain",
  description: "snowboard"
},
{
  make: "salomon",
  model: "super8",
  msrp: "430.00",
  length: "154cm",
  flex: "medium",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "all_mountain",
  description: "snowboard"
},
{
  make: "stepchild",
  model: "sleazy_rider",
  msrp: "470.00",
  length: "158cm",
  flex: "medium",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "all_mountain",
  description: "snowboard"
},
{
  make: "burton",
  model: "process_off_axis",
  msrp: "480.00",
  length: "157cm",
  flex: "medium",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "park",
  description: "snowboard"
},
{
  make: "capita",
  model: "ultrafear",
  msrp: "480.00",
  length: "155cm",
  flex: "medium",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "park",
  description: "snowboard"
},
{
  make: "gnu",
  model: "headspace",
  msrp: "440.00",
  length: "155cm",
  flex: "medium",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "park",
  description: "snowboard"
},
{
  make: "jones",
  model: "ultra_mountain_twin",
  msrp: "579.00",
  length: "158cm",
  flex: "medium_stiff",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "park",
  description: "snowboard"
},
{
  make: "libtech",
  model: "bertner_box_scratcher",
  msrp: "460.00",
  length: "157cm",
  flex: "medium",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "park",
  description: "snowboard"
},
{
  make: "nitro",
  model: "afterlife",
  msrp: "420.00",
  length: "156cm",
  flex: "soft",
  camber: "regular",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "park",
  description: "snowboard"
},
{
  make: "ride",
  model: "burnout",
  msrp: "560.00",
  length: "155cm",
  flex: "medium",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "park",
  description: "snowboard"
},
{
  make: "salomon",
  model: "villain",
  msrp: "480.00",
  length: "155cm",
  flex: "medium",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "park",
  description: "snowboard"
},
{
  make: "stepchild",
  model: "mai_tai",
  msrp: "380.00",
  length: "155cm",
  flex: "medium",
  camber: "regular",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "park",
  description: "snowboard"
}]

function callback(msgHeader) {
  return function(err, response) {
    if (err) return console.log('ERROR:\n', err.message)
    return console.log(msgHeader, response)
  }
}

snowboards.forEach(function(board) {
  dalNoSQL.createEntry(board, callback('BOARD CREATED:\n'))
})
