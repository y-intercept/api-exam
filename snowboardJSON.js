const dalNoSQL = require('./DAL/dalNoSQL.js');

const snowboards = [{
  make: "capita",
  model: "mercury",
  msrp: "520.00",
  length: 157,
  flex: "medium-stiff",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "snowboard",
  description: "all_mountain"
},
{
  make: "flow",
  model: "blackout",
  msrp: "500.00",
  length: 156,
  flex: "medium-stiff",
  camber: "regular",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "snowboard",
  description: "all_mountain"
},
{
  make: "gnu",
  model: "zoid",
  msrp: "650.00",
  length: 158,
  flex: "medium-stiff",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "snowboard",
  description: "all_mountain"
},
{
  make: "libtech",
  model: "travis_rice_gold_member",
  msrp: "840.00",
  length: 155,
  flex: "medium-stiff",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "snowboard",
  description: "all_mountain"
},
{
  make: "nitro",
  model: "team",
  msrp: "500.00",
  length: 153,
  flex: "medium",
  camber: "regular",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "snowboard",
  description: "all_mountain"
},
{
  make: "ride",
  model: "berserker",
  msrp: "510.00",
  length: 159,
  flex: "medium-stiff",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "snowboard",
  description: "all_mountain"
},
{
  make: "rome",
  model: "mod_rocker",
  msrp: "580.00",
  length: 159,
  flex: "medium",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "snowboard",
  description: "all_mountain"
},
{
  make: "rossignol",
  model: "one_magtek",
  msrp: "500.00",
  length: 156,
  flex: "medium-stiff",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "snowboard",
  description: "all_mountain"
},
{
  make: "salomon",
  model: "super8",
  msrp: "430.00",
  length: 154,
  flex: "medium",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "snowboard",
  description: "all_mountain"
},
{
  make: "stepchild",
  model: "sleazy_rider",
  msrp: "470.00",
  length: 158,
  flex: "medium",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "snowboard",
  description: "all_mountain"
},
{
  make: "burton",
  model: "process_off_axis",
  msrp: "480.00",
  length: 157,
  flex: "medium",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "snowboard",
  description: "park"
},
{
  make: "capita",
  model: "ultrafear",
  msrp: "480.00",
  length: 155,
  flex: "medium",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "snowboard",
  description: "park"
},
{
  make: "gnu",
  model: "headspace",
  msrp: "440.00",
  length: 155,
  flex: "medium",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "snowboard",
  description: "park"
},
{
  make: "jones",
  model: "ultra_mountain_twin",
  msrp: "579.00",
  length: 158,
  flex: "medium-stiff",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "snowboard",
  description: "park"
},
{
  make: "lib_tech",
  model: "bertner_box_scratcher",
  msrp: "460.00",
  length: 157,
  flex: "medium",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "snowboard",
  description: "park"
},
{
  make: "nitro",
  model: "afterlife",
  msrp: "420.00",
  length: 156,
  flex: "soft",
  camber: "regular",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "snowboard",
  description: "park"
},
{
  make: "ride",
  model: "burnout",
  msrp: "560.00",
  length: 155,
  flex: "medium",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "snowboard",
  description: "park"
},
{
  make: "salomon",
  model: "villain",
  msrp: "480.00",
  length: 155,
  flex: "medium",
  camber: "hybrid",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "snowboard",
  description: "park"
},
{
  make: "stepchild",
  model: "mai_tai",
  msrp: "380.00",
  length: 155,
  flex: "medium",
  camber: "regular",
  date_available: "fall_2015",
  in_stock: "yes",
  type: "snowboard",
  description: "park"
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

createView(boardByType)
