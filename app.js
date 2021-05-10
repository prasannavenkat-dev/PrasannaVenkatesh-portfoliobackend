const express = require('express');
const app = express();

const nodemailer = require('nodemailer');
const multiparty = require('multiparty')
 const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()
 app.use(bodyParser.urlencoded({ extended: false }))

app.get('/',function(req,res){
    res.send("Hello there,This is server for Prasanna Venkatesh's Portfolio")
})



app.use(cors())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
console.log(process.env.MAIL)

    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        auth:{
            user:process.env.MAIL,
            pass:process.env.PASS
        }

    })
    transporter.verify(function(err,data){
        if(err){
            console.log(err);
        }
        else{
            console.log('server ready')
        }


      });

        app.post("/message", (req, res) => {
            //1.
            let form = new multiparty.Form();
            let data = {};
            form.parse(req, function (err, fields) {
              Object.keys(fields).forEach(function (property) {
                data[property] = fields[property].toString();
              });
              //2. You can configure the object however you want
              const mail = {
                from: data.name,
                to:process.env.MAIL,
                subject: data.subject,
                text: `${data.txtName} <${data.txtEmail}> \n${data.txtMsg}`,
              };
          
              //3.
              transporter.sendMail(mail, (err, data) => {
                if (err) {
                  res.redirect('https://www.youtube.com/')


                } else {
                  res.redirect('https://www.google.com/')
                }



              });

            });
      
          });


app.listen(process.env.PORT||5000,function(){
    console.log('server started');
})
