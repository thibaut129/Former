_this = this

var nodemailer = require("nodemailer");



exports.sendmail = async function(req, res, next) {


    var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "formerpoly@gmail.com",
            pass: "polyformer"
        }
    });

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: "Thibaut Terris <formerpoly@gmail.com>", // sender address
        to: "thibaut129@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world ✔", // plaintext body
        html: "<b>Hello world ✔</b>" // html body
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