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
///////GET snowboard by id////////
//////////////////////////////////

app.get('/snowboards/:id', function(req, res, next) {
  const boardId = req.params.id
  console.log("id:", boardId) //works
  dal.getBoardById(boardId, function(data, err) {
    if (err) {
    return console.log(err.message)
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
      return console.log(err.message)
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
      return console.log(err.message)
    }
    if (data) {
      res.append('Content-type', 'application/json')
      res.status(202).send(data)
    }
  })
});

//////////////////////////////////
//////list boards by type/////////
//////////////////////////////////

app.get('/snowboards_by_type', function(req, res, next) {
  const type = req.query.type
  dal.listByType(type, function(err, data) {
    if (err) {
      return err.message
    }
    if (data) {
      res.append('Content-type', 'application/json')
      res.status(200).send(data)
    }
  })
});

/////////////////////////////
////// Error Handling ///////
/////////////////////////////

app.get('*', function(req, res, next) {
  next(new HTTPError(404, 'Path not found', {
    placeholderObject: "future errors"
  }))
  return next(routeError)
})

app.put('*', function(req, res, next) {
  next(new HTTPError(404, 'Path not found', {
    placeholderObject: "future errors"
  }))
  return next(routeError)
})

app.post('*', function(req, res, next) {
  next(new HTTPError(404, 'Path not found', {
    placeholderObject: "future errors"
  }))
  return next(routeError)
})

app.delete('*', function(req, res, next) {
  next(new HTTPError(404, 'Path not found', {
    placeholderObject: "future errors"
  }))
  return next(routeError)
})

app.use(function(err, req, res, next) {
  console.log(req.method, " ", req.path, " ", err)
  res.status(err.status || 500)
  res.send('path not valid')
})
