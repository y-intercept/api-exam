const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));

const db = new PouchDB('http://localhost:5984/api-exam2')

const dal = {
  createEntry: createEntry,
  editEntry: editEntry,
  //deleteEntry: deleteEntry,
  getBoardById: getBoardById,
  listAllBoards: listAllBoards,
  listByMake: listByMake,
  listByLength: listByLength,
  // listByMSRP: listByMSRP,
  // listByFlex: listByFlex,
  listByType: listByType,
  createView: createView,
}

/////////////////////////////////////
///////// Wrapper Functions /////////
/////////////////////////////////////

function getBoardById(boardId, callback) {
  getDocById(boardId, callback)
}

function listByType(type, callback) {
  queryBoardByType(type, callback)
}

function listByType(type, callback) {
  queryBoardByType(type, callback)
}

function listByMake(make, callback) {
  queryBoardByMake(make, callback)
}

function listByLength(length, callback) {
  queryBoardByLength(length, callback)
}

// function deleteEntry(data, callback) {
//   deleteDoc(data, callback)
// }
/////////////////////////////////////
////////// Base Functions ///////////
/////////////////////////////////////

////////// Create Entry /////////////

function createEntry(data, callback) {
  if (data.hasOwnProperty('make') !== true) {
    return callback(new Error('400 Missing manufacturer data'))
  }
  if (data.hasOwnProperty('model') !== true) {
    return callback(new Error('400 Missing model data'))
  }
  if (data.hasOwnProperty('length') !== true) {
    return callback(new Error('400 Missing length data'))
  }
  if (data.hasOwnProperty('_id') === true) {
    return callback(new Error('400 improper data field'))
  }
  if (data.hasOwnProperty('_rev') === true) {
    return callback(new Error('400 improper data field'))
  }

  data._id = "snowboard_" + data.make + "_" + data.model

  db.post(data, function(err, response) {
    if (err) return callback(err)
    if (response) return callback(null, response)
    console.log("201: Entry Created")
  })
};

///////////// Edit Entry ////////////////

function editEntry(data, callback) {
  if (data.hasOwnProperty('_id') !== true) {
    return callback(new Error('400 Missing _id property'))
  }
  if (data.hasOwnProperty('_rev') !== true) {
    return callback(new Error('400 Missing _rev property'))
  }

  db.put(data, function(err, response) {
    if (err) return callback(err)
    if (response) return callback(null, response)
    console.log('202 Edits Accepted')
  })
};

/////////////////////////////////////
///////// Delete Document ///////////
/////////////////////////////////////

// function deleteDoc(data, callback) {
//   if (data === undefined || data === null) {
//     return callback(new Error('400Missing data'))
//   }
//   if (data.hasOwnProperty('_id') !== true) {
//     return callback(new Error('400Missing _id property within data'))
//   }
//   if (data.hasOwnProperty('_rev') !== true) {
//     return callback(new Error('400Missing _rev property within data'))
//   }
//   // db.get(data, function(err, data){
//   //   if (err) {
//   //     return console.log(err)
//   //   }
//   db.remove(data, function(err, result) {
//       if (err) return callback(err)
//       if (result) return callback(null, result)
//     })
//     // })
// }
//////////// List All Snowboards /////////////

function listAllBoards(data, callback) {
  db.allDocs({
    include_docs: true,
    startkey: 'snowboard_',
    endkey: 'snowboard_\uffff',
    attachments: true
  }, function(err, response) {
    if (err) {
      return console.log(err);
    }
    if (response) {
      return callback(response)
    }
  })
};

/////////// Get Snowboard by ID ////////////

function getDocById(boardId, callback) {
  if (typeof boardId === "undefined" || boardId === null) {
    return callback(new Error('400Missing data parameter'));
  } else {
    db.get(boardId, function(err, response) {
      console.log("response:", response)
      if (err) {
        return callback(err)
      }
      if (response) {
        return callback(response)
      }
    })
  }
};

/////////////////////////////////////
///////Query Board by Type///////////
/////////////////////////////////////

const getType = function(queryRow) {
  queryRow.value.Type = queryRow.key
  return queryRow.value
};

function queryBoardByType(type, callback) {
//console.log("fnQueryBoardByType:", type)
  db.query('boardByType', {
    key: type
  }, function(err, result) {
    if (err) {
      return callback(err)
    }
    if (result) {
      console.log("result:", result, "end")
      return callback(null, result.rows.map(getType));
    }
  })
};

/////////////////////////////////////
///////Query Board by Make///////////
/////////////////////////////////////

const getMake = function(queryRow) {
  queryRow.value.Make = queryRow.key
  return queryRow.value
};

function queryBoardByMake(make, callback) {
console.log("fnQueryBoardByMake:", make)
  db.query('boardByMake', {
    key: make
  }, function(err, result) {
    if (err) {
      return callback(err)
    }
    if (result) {
      console.log("result:", result, "end")
      return callback(null, result.rows.map(getMake));
    }
  })
};

/////////////////////////////////////
/////// Query Board by Length ///////
/////////////////////////////////////

const getLength = function(queryRow) {
  queryRow.value.Length = queryRow.key
  return queryRow.value
};

function queryBoardByLength(length, callback) {
  console.log(length)
  db.query('boardByLength', {
    key: length
  }, function(err, result) {
    if (err) {
      return callback(err)
    }
    if (result) {
      console.log("result:", result, "end")
      return callback(null, result.rows.map(getLength));
    }
  })
};

/////////////////////////////////////
///////////Create View //////////////
/////////////////////////////////////

function createView(view) {
  db.put(view, function(err, response) {
    if (err) {
      return console.log(err)
    }
    if (response) {
      console.log("response: ", JSON.stringify(response, null, 4))
    }
  })
};

module.exports = dal
