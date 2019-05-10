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

	server.post("/VerifySecurity",(req, res, next)=>{
		var query = "call VerifySecurity(?,?)";
		conectionDB();

		cnn.query(query, [req.body.wUserName, req.body.wModule], function(err, result, fields){
			if (err){
				res.send(500, {message:err});
				cnn.end();
				return;
			}
			if (result != undefined){
				res.send({success:true, hasdata:true, data:result[0]});
				cnn.end();
				return;
			}
		})
	})

	server.post("/PermissionList",(req,res,next)=>{
		var query = "call ListaPermisos(?)";
		conectionDB();

		cnn.query(query, [req.body.wUserCode], function(err, result, fields){
			if (err){
				res.send(500, {message:err});
				cnn.end();
				return;
			}
			if (result != undefined){
				res.send({success:true, hasdata:true, data:result[3]});
				cnn.end();
				return;
			}
		})
	})

	server.post("/SaveSecurityPermission",(req, res, next)=>{
		var query = "call UpdateModulePermission(?,?,?,?)";
		conectionDB();

		cnn.query(query, [req.body.Allow, req.body.wEmpl, req.body.wModule,
						 req.body.wOpcAllow], function(err, result, fields){
			if (err){
				res.send(500, {message:err});
				cnn.end();
				return;
			}
			if (result != undefined){
				res.send({success:true});
				cnn.end();
				return;
			}
		})
	})

	server.post("/VerifyRegistedUser",(req, res, next)=>{
		var query = "call VerifyRegistedUser(?);"
		conectionDB();

		cnn.query(query, [req.body.empID], function(err, result, rows){
			if (err){
				res.send(500, {message:err});
				cnn.end();
				return;
			}
			if (result[0].length > 0) {
				res.send({hasdata:true, data:result[0]});
				cnn.end();
				return;
			}else
			{
				res.send({hasdata:false});
				cnn.end();
				return;
			}
		});
	})

	server.post("/SaveInfoEmployee",(req, res, next)=>{
		var query = "call SaveInfoEmployee(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
		conectionDB();

		cnn.query(query, [req.body.empID, 0, req.body.empName, req.body.empUserName, 
			req.body.empPassword, req.body.EmpActive, req.body.empMagPosi, req.body.wBulding, 
			req.body.wCountry, req.body.wDOB, req.body.Email,
			'','','','','','','',req.body.empContactGener,'','',0,0,'','','1900-01-01','','',0,'','','','','','','','','','','','','','','',
			req.body.LlaveSimetrica], function(err, result, field){
			if (err){
				res.send(500, {message:err});
				cnn.end();
				return;
			}
			res.send({success:true});
			cnn.end();
			return;
		})
	})

	server.post("/ResetPass", (req, res, next)=>{
		var query = "call EmployeeResetPass(?,?)";
		conectionDB();

		cnn.query(query, [req.body.EmpId, req.body.LlaveSimetrica], function(err, result, field){
			if (err){
				res.send(500, {message:err});
				cnn.end();
				return;
			}
			res.send({success:true});
			cnn.end();
			return;
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
	      console.log('db error register', err.code);
	    });                               
	  }
  function isInteger(str){
    var reg = /^\d+$/;
    return reg.test(str);
  }

}