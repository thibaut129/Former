_this = this

var nodemailer = require("nodemailer");




exports.sendmail = async function(req, res, next) {

    var users = [];
    users=req.body;
    console.log(users);

    var table = "<h1>Votre sélection :</h1>";


    for ( var i = 0; i < users.data.length; i++ ) {

        var user = users.data[i];
        table=table.concat('<h3>'+user.user.firstname+' '+user.user.lastname+'</h3>');
        table=table.concat('<b>Département : </b>' +user.user.department+'<br/>');
        table=table.concat('<b>Option : </b>'+ user.user.option+'<br/>');
        table=table.concat('<b>Mail : </b>'+ user.user.email+'<br/>');
        table=table.concat('<b>Entreprise : </b>'+ user.company+ ' ('+user.location+')'+'<br/>');
        table=table.concat('<br/>');
    }

    console.log(table);


    var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "formerpoly@gmail.com",
            pass: "polyformer"
        }
    });

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: "Former Polytech <formerpoly@gmail.com>", // sender address
        to: users.mail, // list of receivers
        subject: "Former Polytech : Liste de contact", // Subject line
        text: table, // plaintext body
        html: table // html body
    };
// send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, response){
        if(error) {
            return res.status(400).json({status: 400, message: error});
        }else
            return res.status(200).json({status: 200, message: response});

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
}