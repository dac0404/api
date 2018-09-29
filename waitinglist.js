var mysql = require("mysql");

module.exports = function(server, db_config){
	
	server.get("/StartTicket/",(req, res, next) =>{
		var query = "call StartTicket()";
		conectionDB();

		cnn.query(query,false, function(err, result, fields){
			if (err){
	          res.send(500, {message: err});
	          cnn.end();
	          return next(false);
	        }
	        
	        if(result != undefined && result[0] != undefined){
	        	//data: result[0] es el lugar del nodo json en el que mysql envia el dato
	          res.json({success:true , hasdata: true , data: result[0]});
	          cnn.end();
	          return next();
	        }else{
	          //missin parameter
	          res.json({success:true , hasdata: false});
	          cnn.end();
	          return next();
	        }
		})
	})

	server.post("/ListWaitingList/",(req, res, next) =>{
		var query = "call ShowGridWaitingList(?)";
		conectionDB();

		cnn.query(query,[req.body.TicketNumber], function(err, result, fields){
			if (err){
	          res.send(500, {message: err});
	          cnn.end();
	          return next(false);
	        }
	        
	        if(result != undefined && result[0] != undefined){
	        	//data: result[0] es el lugar del nodo json en el que mysql envia el dato
	          res.json({success:true , hasdata: true , data: result[0]});
	          cnn.end();
	          return next();
	        }else{
	          //missin parameter
	          res.json({success:true , hasdata: false});
	          cnn.end();
	          return next();
	        }
		})
	})


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
}