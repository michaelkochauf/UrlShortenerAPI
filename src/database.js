const Loki = require("lokijs");
const Route = require("./Route");
const Short = require("./Short");

const db = new Loki('demo.db',{
    autoload: true,
    autoloadCallback: databaseInit,
    autosave: true,
    autosaveInterval: 1000
});

function databaseInit(){
    var entries = db.getCollection('routes');
    if(entries === null)
    {
        entries = db.addCollection('routes');

        entries.insert(new Route("000","https://www.google.at",new Date()));
    }  
    
    var shorts = db.getCollection('shorts');
    if(shorts === null)
    {
        shorts = db.addCollection('shorts');
        entries.insert(new Short("000000"));
    }
}

module.exports = db;