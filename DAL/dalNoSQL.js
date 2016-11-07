const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));


const db = new PouchDB('http://localhost:5984/api-exam')

const dal = {
  createEntry: createEntry,
  editEntry: editEntry,
  // deleteEntry: deleteEntry,
  getBoardById: getBoardById,
  // listByMake: listByMake,
  // listBySize: listBySize,
  // listByMSRP: listByMSRP,
  // listByFlex: listByFlex,
  listByType: listByType
}

function getBoardById(boardId, callback) {
  getDocById(boardId, callback)
}
function listByType(type, callback) {
  queryBoardByType(type, callback)
}

/////////////////////////////////////
////////// Base Functions ///////////
/////////////////////////////////////

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
  queryRow.value.type = queryRow.key
  return queryRow.value
};

function queryBoardByType(type, callback) {
console.log("fnQueryBoardByType:", type)
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
}


/////////////////////////////////////
////////////// Views ////////////////
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

const boardByType = {
  _id: "_design/boardByType",
  views: {
    boardByType: {
      map: function(doc) {
        if (doc.type === "snowboard") {
          emit(doc.description, {
            "make": doc.make,
            "model": doc.model,
            "length": doc.length,
            "flex": doc.flex
          });
        }
      }.toString()
    }
  }
};

module.exports = dal
