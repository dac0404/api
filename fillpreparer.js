//var cnn = require('dbconnection');
var mysql = require('mysql');

module.exports = function(server, db_config){

  var connection; 
  var table = 'employees';

  server.get('/frm_employees/', (req, res, next) => {
    //var query = "SELECT * FROM " + table;
    var query = 'CALL ShowPreparer(0)'; 
    conectionDB();
    
    connection.query(query, function (err, result, fields) {
        
        if (err){
          res.send(500, {message: err});
          connection.end();
          return next(false);
        }
        
        if(result != undefined){
          res.json({success:true , hasdata: true , data: result[0]});
          
          connection.end();
          return next();

        }else{
          //missin parameter
          res.json({success:true , hasdata: false});
          connection.end();
          return next();
        }

      });

   //return next();


    function conectionDB(){
    connection = mysql.createConnection(db_config);
    connection.connect(function(err) {              
      if(err) {                                     
        console.log('deyvi.. error when connecting to db:', err);
        throw err; 
      }                                     
    }); 

    connection.on('error', function(err) {
      console.log('db error fillpreparer', err.code);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') {
          //conectionDB();
          console.log("el erro fillpreparer");
        } else {
          throw err;
        }
      
    });                               
  }
  function isInteger(str){
    var reg = /^\d+$/;
    return reg.test(str);
  }
  });
};  
