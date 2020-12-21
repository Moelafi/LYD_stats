//providing configuration data for an SQL connection to our DB

const mysql = require('mysql');

DBconfig = {

    host: "localhost",
    user: "ubuntu",
    password: "Mm0925219354*",
    
    database: 'LYD_Exrates'
  }

var con = mysql.createConnection(DBconfig);

//mySQL server connection object.
//connection remains open throught the runtime of the APP. 

con.connect(function(err) {  
  if (err) throw err;   
  console.log('connected to sql!')
      
  });    

exports.con = con;
