const express = require('express');
const app = express();

const nodemailer = require('nodemailer');
const multiparty = require('multiparty')

require('dotenv').config()


app.get('/',function(req,res){
    res.send("Hello there,This is server for Prasanna Venkatesh's Portfolio")
})


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
                  console.log('hi',err);
                  res.redirect('https://prasannavenkatesh.netlify.app/#failure')


                } else {
                  res.redirect('https://prasannavenkatesh.netlify.app/#success')
                }


              });

            });

      
          });








})


app.listen(process.env.PORT||3000,function(){
    console.log('server started');
})