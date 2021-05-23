const express = require('express');
const { use } = require('.');
const router = express.Router();
const db = require('../src/database');
const Route = require('../src/Route');
const Short = require('../src/Short');
let routeCollection = db.getCollection('routes');
let shortCollection = db.getCollection('shorts');



router.get('/:short', showItem);
function showItem(request, response) 
{
  checkCollection();
  let short = request.params.short;

  let route = routeCollection.findOne({short: short});
  response.json(route);
}


router.get('/', listItems);
function listItems(request, response) 
{
  checkCollection();

  let users = routeCollection.find();

  response.json(users);
}

router.post('/', createUser);

function createUser(request, response) 
{
  checkCollection();
  let url = request.body.url;
  let short = generateShort();

  let newUser = new Route(short,url,new Date());

  let insertedData = routeCollection.insert(newUser);

  response.json(insertedData);
}

router.delete('/:id', deleteUser);

function deleteUser(request, response) 
{
  checkCollection();
  let id = request.params.id;
  
  let user = routeCollection.get(id);

  let responseCode = 200;
  if(user !== null)
  {
    routeCollection.remove(user);
  }
  else
  {
      responseCode = 404;
  }
  

  response.send(responseCode);
}

function checkCollection(){
  if(routeCollection === null)
  {
    routeCollection = db.getCollection('routes');
  }
  if(shortCollection === null)
  {
    shortCollection = db.getCollection('shorts');
  }
}

function generateShort()
{
  let possibleChars="1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let value = "";
  for(let i = 0;i<6;i++)
  {
    let number = Math.floor(Math.random() * possibleChars.length);

    value += possibleChars.charAt(number);
  }

  let item = shortCollection.findOne({short: value});
  if(item === undefined || item === null)
  {
    shortCollection.insert(new Short(value));
    return value;
  }
  else
  {
    return generateShort();
  }
}

module.exports = router;
