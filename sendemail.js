var mysql = require('mysql');
var email 	= require("emailjs");

module.exports = function(server, db_config){
	server.put('/SendingEmail/', (req,res,next) =>{
		SendEmail();
		res.send(200, {message: 'email sender'});
	});
	function SendEmail(){
		var server 	= email.server.connect({
	   user:	"softgeli@hotmail.com", 
	   password:"kdm384cdf", 
	   host:	"smtp-mail.outlook.com", 
	   tls: {ciphers: "SSLv3"}
	});
	
	var message	= {
	   text:	"i yy hope this works", 
	   from:	"softgeli@hotmail.com", 
	   to:		"dac0404@gmail.com",
	   subject:	"testing emailjs",
	   attachment: 
	   [
	      {data:"<html><img src='http://pupiloagency.com/wp-content/uploads/2017/01/v7.logo_.png' style='width:200px; height:200px'/><br/><br/><p style='font-size:20px; color:red'>" + 'dsfsd23' + "</p></html>", alternative:true}
	      // ,
	      // {path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"}
	   ]
	};
	 
	// send the message and get a callback with an error or details of the message that was sent
	server.send(message, function(err, message) { console.log(err || message); });

	}

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

