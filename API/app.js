const http = require('http')
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const HTTPError = require('node-http-error')
const dal = require('../DAL/dalNoSQL.js')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const server = http.createServer(app)
server.listen(port, () => console.log('server opened on ', server.address(), 'port: ', port))


//////////////////////////////////
///////GET all snowboards/////////
//////////////////////////////////

app.get('/snowboards', function(req, res, next) {
  dal.listAllBoards(req.body, function(data, err) {
    if (err) {
      var responseError = BuildResponseError(err);
      return next(new HTTPError(responseError.status, responseError.message, responseError));
  }
    if (data) {
      res.append('Content-type', 'application/json')
      res.status(200).send(data)
    }
  })
});

//////////////////////////////////
///////GET snowboard by id////////
//////////////////////////////////

app.get('/snowboards/:id', function(req, res, next) {
  const boardId = req.params.id
  console.log("id:", boardId) //works
  dal.getBoardById(boardId, function(data, err) {
    if (err) {
      var responseError = BuildResponseError(err);
      return next(new HTTPError(responseError.status, responseError.message, responseError));
  }
    if (data) {
      res.append('Content-type', 'application/json')
      res.status(200).send(data)
    }
  })
});

//////////////////////////////////
//////////Create Entry////////////
//////////////////////////////////

app.post('/snowboards', function(req, res, next) {
  dal.createEntry(req.body, function(err, data) {
    if (err) {
      var responseError = BuildResponseError(err);
      return next(new HTTPError(responseError.status, responseError.message, responseError));
    }
    if (data) {
      res.append('Content-type', 'application/json')
      res.status(201).send(data)
    }
  })
});

//////////////////////////////////
////////////Edit Entry////////////
//////////////////////////////////

app.put('/snowboards/:id', function(req, res, next) {
  dal.editEntry(req.body, function(err, data) {
    if (err) {
      var responseError = BuildResponseError(err);
      return next(new HTTPError(responseError.status, responseError.message, responseError));
    }
    if (data) {
      res.append('Content-type', 'application/json')
      res.status(202).send(data)
    }
  })
});

////////// DELETE Entry //////////

// app.delete('/snoboards/:id', function(req, res, next) {
//   console.log('app.delete')
//   const BoardId = req.params.id
//   dal.getBoardById(BoardId, function(err, data) {
//     console.log('dal.getBoardById')
//     if (err) {
//       var responseError = BuildResponseError(err);
//         return next(new HTTPError(responseError.status, responseError.message, responseError));
//     }
//     if (data) {
//       dal.deleteEntry(data, function(deleteErr, deleteData) {
//         if (deleteErr) {
//           var responseError = BuildResponseError(deleteErr);
//           return next(new HTTPError(responseError.status, responseError.message, responseError));
//         }
//         if (deleteData) {
//           res.append('Content-type', 'application/json')
//           res.status(202).send(deleteData)
//         }
//       })
//     }
//   })
// });

//////////////////////////////////
//////list boards by type/////////
//////////////////////////////////

app.get('/snowboard_type', function(req, res, next) {
  const type = req.query.Type
  dal.listByType(type, function(err, data) {
    if (err) {
      var responseError = BuildResponseError(err);
      return next(new HTTPError(responseError.status, responseError.message, responseError));
    }
    if (data) {
      res.append('Content-type', 'application/json')
      res.status(200).send(data)
    }
  })
});

//////////////////////////////////
////// list boards by Make ///////
//////////////////////////////////

app.get('/snowboard_make', function(req, res, next) {
  const make = req.query.Make
  dal.listByMake(make, function(err, data) {
    if (err) {
      var responseError = BuildResponseError(err);
      return next(new HTTPError(responseError.status, responseError.message, responseError));
    }
    if (data) {
      res.append('Content-type', 'application/json')
      res.status(200).send(data)
    }
  })
});

//////////////////////////////////
///// list boards by Length //////
//////////////////////////////////

app.get('/snowboard_length', function(req, res, next) {
  const length = req.query.Length
  dal.listByLength(length, function(err, data) {
    //console.log(length)
    if (err) {
      var responseError = BuildResponseError(err);
      return next(new HTTPError(responseError.status, responseError.message, responseError));
    }
    if (data) {
      res.append('Content-type', 'application/json')
      res.status(200).send(data)
    }
  })
});

////////////////////////////
//// BuildResponseError ////
////////////////////////////

function BuildResponseError(err) {

  const statuscheck = isNaN(err.message.substring(0, 3)) === true ? "400" : err.message.substring(0, 3)
  const status = err.status ? Number(err.status) : Number(statuscheck)
  const message = err.status ? err.message : err.message.substring(3)
  const reason = "messagenan"
  const error = status === 400 ? "Bad Request" : err.name
  const name = error

  var errormsg = {}
  errormsg.error = error
  errormsg.reason = reason
  errormsg.name = name
  errormsg.status = status
  errormsg.message = message
  return errormsg
};

/////////////////////////////
////// Error Handling ///////
/////////////////////////////

// app.get('*', function(req, res, next) {
//   console.log('in get *')
//   next(new HTTPError(404, 'Invalid path'));
// })
//
// app.put('*', function(req, res, next) {
//   console.log('in put *')
//   next(new HTTPError(404, 'Invalid path'));
// })
//
// app.post('*', function(req, res, next) {
//   console.log('in post *')
//   next(new HTTPError(404, 'Invalid path'));
// })
//
// app.delete('*', function(req, res, next) {
//   console.log('in delete *')
//   next(new HTTPError(404, 'Invalid path'));
// })
//
// app.use(function(err, req, res, next) {
//   console.log(req.method, " ", req.path, " ", err)
//   res.status(err.status || 500)
//   res.send(res.method, " ", res.path, " ", err)
// })
