var mysql = require('mysql');

module.exports = function(server, db_config){
	var cnn;

	server.post("/FillListEmployee", (req, res, next)=>{
		var query = "call ShowEmployee(?,?,?)";
		conectionDB();

		cnn.query(query, [req.body.wEmp, req.body.DirectionID, req.body.ShowInactive], function(err, result, fields){
			if (err){
	          res.send(500, {message: err});
	          cnn.end();
	          return next(false);
	        }

			if (result != undefined){
				res.send({success:true, hasdata:true, data:result[0]});
				cnn.end();
				return next();
			}
		});
	});

	server.post("/SaveSecurityCode", (req, res, next)=>{
		var query = "call SaveSecurityCode(?,?,@Result); select @Result";
		conectionDB();

		cnn.query(query, [req.body.wUserName, req.body.NumberSecurityCode], function(err, result, fields){
			if (err){
	          res.send(500, {message: err});
	          cnn.end();
	          return next(false);
	        }

			if (result != undefined){
				res.send({success:true, hasdata:true, data:result[1]});
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

}