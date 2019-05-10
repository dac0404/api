var mysql = require("mysql");
var http = require('http');

module.exports = function(server, db_config){

	var cnn;

	server.post("/RegistraUsuarios/", (req, res, next) =>{
		var query = "call RegistraUsuarios(?,?,?)";
		//var wIp;
		conectionDB();

		//http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
			  //resp.on('data', function(ip) {
			    //wIp = ip;
			  //});
		  //});
		
		cnn.query(query,[req.body.wUserName, req.body.SymetriKey, req.body.wIp], function(err, result, fields){
			
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
	        if (err){
	          res.send(500, {message: err});
	          cnn.end();
	          return next(false);
	        }
		});
	});

	server.post("/VerifySecurityCode/", (req, res, next) =>{
		var query = "call VerifySecurityCode(?)";
		conectionDB();

		cnn.query(query,[req.body.wUserName], function(err, result, fields){
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

	server.post("/VerirySecurityCode/",(req, res,next) =>{
		var query = "SELECT true FROM usuarios WHERE NombreUsuario = ? and SecurityCode = ? limit 1";
		conectionDB();

		cnn.query(query,[req.body.wUserName, req.body.SecCode],function	(err,result,fields){
			if(result != undefined && result[0] != undefined){
	          res.json({success:true , hasdata: true});
	          cnn.end();
	          return next();
	        }else{
	          res.json({success:true , hasdata: false});
	          cnn.end();
	          return next();
	        }
		});
	});

	server.put("/ChangePass/", (req, res, next) =>{
		var query = "call ChangePassword(?,?,?)";
		conectionDB();

		cnn.query(query,[req.body.NewPass, req.body.wUser, req.body.SymetriKey], function(err, result, fields){
			if (err){
	          res.send(500, {message: err});
	          cnn.end();
	          return next(false);
	        }
	        
	        if(result != undefined && result[0] != undefined){
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

	server.post("/VerifyPrepPass/", (req, res, next)=>{
		var query = "SELECT EmployeeID from usuarios where clave = ?";
		conectionDB();

		cnn.query(query, [req.body.wPass], function(err, result, fiends){
			if (err){
				res.send(500, {message:err});
				cnn.end();
				return;
			}
			if (result.length > 0){
				res.json({success:true, data:result[0]});
				cnn.end();
				return;
			}else{
				res.json({success:false});
				cnn.end();
				return;
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
      console.log('db error login', err.code);
    });                               
  }
  function isInteger(str){
    var reg = /^\d+$/;
    return reg.test(str);
  }
}