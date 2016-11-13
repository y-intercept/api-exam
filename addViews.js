const dal = require('./DAL/dalNoSQL.js');

/////////////////////////////////////
///////////// Views /////////////////
/////////////////////////////////////

const boardByType = {
  _id: "_design/boardByType",
  views: {
    boardByType: {
      map: function(doc) {
        if (doc.description === "snowboard") {
          emit(doc.type, {
            "make": doc.make,
            "model": doc.model,
            "length": doc.length,
            "flex": doc.flex,
            "_id": doc._id
          });
        }
      }.toString()
    }
  }
};

const boardByMake = {
  _id: "_design/boardByMake",
  views: {
    boardByMake: {
      map: function(doc) {
        if (doc.description === "snowboard") {
          emit(doc.make, {
            "model": doc.model,
            "length": doc.length,
            "type": doc.type,
            "flex": doc.flex,
            "_id": doc._id
          });
        }
      }.toString()
    }
  }
};

const boardByLength = {
  _id: "_design/boardByLength",
  views: {
    boardByLength: {
      map: function(doc) {
        if (doc.description === "snowboard") {
          emit(doc.length, {
            "make": doc.make,
            "model": doc.model,
            "type": doc.type,
            "flex": doc.flex,
            "_id": doc._id
          });
        }
      }.toString()
    }
  }
};

dal.createView(boardByType)
dal.createView(boardByMake)
dal.createView(boardByLength)

// dal.createView(boardByType, function callback(err, data) {
//     if (err) return console.log(err);
//     if (data) {
//         console.log(data);
//     }
// })
//
// dal.createView(boardByMake, function callback(err, data) {
//     if (err) return console.log(err);
//     if (data) {
//         console.log(data);
//     }
// })
//
// dal.createView(boardByLength, function callback(err, data) {
//     if (err) return console.log(err);
//     if (data) {
//         console.log(data);
//     }
// })
