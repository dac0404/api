var mysql = require('mysql');

module.exports = function(server, db_config) {
	var cnn;

	server.get("/ListBinWorkFlow/",(req, res, next) =>{
		var query = "call SelectBinWorkFlow()";
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

	server.post("/UpdateTicketTaxWorkFlow",(req,res, next)=>{
		var query = "call TicketTaxWorkFlow(?,?)";
		conectionDB();

		cnn.query(query,[req.body.IdTicket, req.body.tStatus], function(err, result, fields){
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
	          res.json({success:false , hasdata: false});
	          cnn.end();
	          return next();
	        }
		})
	});

	server.post("/UpdateBinPreparer",(req,res, next)=>{
	 	conectionDB();
		var query = "UPDATE tickets SET IdPreparer = ? WHERE IdTicket = ?";

		cnn.query(query,[req.body.IdPreparer, req.body.IdTicket], function(err, result, fields){
			//res.json({success:true});
		});

		cnn.query("UPDATE clients SET UsualTaxPreparer_EmployeeID = ? WHERE IdClient = ?",[req.body.IdPreparer, req.body.IdClient], function(err, result, fields){
			res.json({success:true});
		});

		

		 cnn.end();
	});

	server.post("/InComeTaxWorkFlow/",(req, res, next) =>{
		var query = "call InComeTaxWorkFlow(?,?,?)";
		conectionDB();

		cnn.query(query,[req.body.wBin, req.body.IdPreparer, req.body.IdTicket], function(err, result, fields){
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

	server.post('/ShowPostItNote/', (req, res, next) => {
		var query = "call ShowCommentPostIt(?)";
		conectionDB();
		cnn.query(query,[req.body.IdTicket], function(err, result, fields){

			if (err){
	          res.send(500, {message: err});
	          connection.end();
	          return next(false);
	        }

			if (result != undefined){
				res.send({success:true, hasdata:true, data: result[0]});
				cnn.end();
				return next();
			}
			else{
				res.json({success:true , hasdata: false});
	          	cnn.end();
	          	return next();
			}
		})
	});

	server.post('/FindClientWorkFlow',(req, res, next)=>{
		var query ="call FindClientWorkFlow(?,?)";
		conectionDB();

		cnn.query(query, [req.body.SSN, req.body.wYear], function(err, result, fields){
			if (result != undefined){
				
				res.send({success:true, hasdata:true, data:result[0]});
				cnn.end();
				return next();
			}
		})
	});

	server.post('/UpdatePostItNote',(req, res, next)=>{
		var query ="call UpdatePostItNote(?,?)";
		conectionDB();

		cnn.query(query, [req.body.IdTicket, req.body.wNote], function(err, result, fields){
			if (result != undefined){
				res.send({success:true});
				cnn.end();
				return next();
			}
		})
	})

	server.post('/SaveCommissionClaim', (req,res,next) => {
		var query = "call SaveCommissionClaim(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

		conectionDB();
		cnn.query(query,[req.body.IdClient, req.body.PreCommClaim, req.body.PreCommClaim2, req.body.PreCommClaim3, req.body.PreCommClaim4,
		req.body.PorcComm, req.body.PorcComm2, req.body.PorcComm3, req.body.PorcComm4,
		req.body.DateComm, req.body.DateComm2, req.body.DateComm3, req.body.DateComm4,
		req.body.CommentComm,req.body.CommentComm2,req.body.CommentComm3,req.body.CommentComm4],function(err, result, fields){
			if (err){
	          res.send(500, {message: err});
	          cnn.end();
	          return;
	        }
			if (result != undefined){
				res.send({success:true});
				cnn.end();
				return;
			}
		});
	});

	server.post('/GetInfoCommClaim', (req, res, next)=>{
		var query = "select idclient, idprep, idprep2, idprep3, idprep4, porccomm, porccomm2, porccomm3, porccomm4,date_format(datecomm,'%m/%d/%Y') as datecomm, date_format(datecomm2,'%m/%d/%Y') as datecomm2, date_format(datecomm3,'%m/%d/%Y') as datecomm3, date_format(datecomm4,'%m/%d/%Y') as datecomm4, commentcomm, commentcomm2, commentcomm3, commentcomm4 from commissionclaim where idclient = ? and idprep <> 47 limit 1"

		conectionDB();
		cnn.query(query, [req.body.IdClient], function(err, result, fields){
			if (err){
	          res.send(500, {message: err});
	          cnn.end();
	          return;
	        }
			if (result != undefined){
				res.send({success:true, hasdata:true, data:result});
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
	      console.log('db error', err.code);
	    });                               
	  }
  function isInteger(str){
    var reg = /^\d+$/;
    return reg.test(str);
  }

}