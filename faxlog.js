var mysql = require('mysql');

module.exports = function(server, db_config){
  var cnn;  

  server.post('/GetDataFaxLog/', (req, res, next) => {
    //var query = "SELECT * FROM " + table;
    var query = 'CALL GetFaxLog(?)'; 
    conectionDB();
    cnn.query(query,[req.body.wYear], function (err, result, fields) {
        
        if (err){
          res.send(500, {message: err});
          cnn.end();
          return next(false);
        }
        
        if(result != undefined && result[0] != undefined){
          res.json({success:true , hasdata: true , data: result[0]});
          
          cnn.end();
          return next();

        }else{
          //missin parameter
          res.json({success:true , hasdata: false});
          cnn.end();
          return next();
        }

      });
  });

  server.post('/SaveFaxLogs/', (req, res, next) => {
    var query = 'CALL savefaxlog(?,?,?,?,?,?,?,?,?)'; 
    conectionDB();
    
    cnn.query(query,[req.body.IdFax,req.body.FaxDate,req.body.FaxNumber,req.body.FaxTime,req.body.FaxPages,req.body.FaxSender,req.body.FaxReceiver,req.body.FaxAction,req.body.TaxYear], function (err, result, fields) {
        
        if (err){
          res.send(500, {message: err});
          cnn.end();
          return next(false);
        }
        
        if(result != undefined){
          res.json({success:true});
          
          cnn.end();
          return next();

        }else{
          //missin parameter
          res.json({success:true , hasdata: false});
          cnn.end();
          return next();
        }

      });
  });

  server.post('/ \/', (req, res, next) => {
    var query = 'DELETE FROM faxlog where IdFaxLog = ?'; 
    conectionDB();
    
    cnn.query(query,[req.body.IdFax], function (err, result, fields) {
        
        if (err){
          res.send(500, {message: err});
          cnn.end();
          return next(false);
        }
        
        if(result != undefined){
          res.json({success:true});
          
          cnn.end();
          return next();

        }else{
          //missin parameter
          res.json({success:true , hasdata: false});
          cnn.end();
          return next();
        }

      });
  });



  function conectionDB(){
    cnn = mysql.createConnection(db_config);
    cnn.connect(function(err) {              
      if(err) {                                     
        console.log('error when connecting to db:', err);
        throw err; 
      }                                     
    }); 

    cnn.on('error', function(err) {
      console.log('db error', err.code);
    });                               
  }
  function isInteger(str){
    var reg = /^\d+$/;
    return reg.test(str);
  }
};  
