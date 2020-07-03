const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();

app.use(express.static("public"));

app.get("/", function(req, res){
   res.sendFile(__dirname + "/signup.html")
});

app.use(bodyParser.urlencoded({extended: true}));

app.post("/", function(req, res){

const firstName = req.body.first;
const lastName = req.body.last;
const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/d7bbd11969";
    const options = {
        method : "POST",
        auth: "bharath_g:6e0ba2997ba63f342566c2615b0e0acb-us10"
    }
    
    // https.request(url, options, callback)
    const request = https.request(url, options, function(response){
       if(response.statusCode == 200){
           res.sendFile(__dirname + "/success.html")
       }
       else{
           res.sendFile(__dirname + "/failure.html")
       }
     response.on("data", function(data){
        console.log(JSON.parse(data));
     })   
    })
    
    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req, res){
    res.redirect("/");
})
//apikey
//6e0ba2997ba63f342566c2615b0e0acb-us10

//listId
//d7bbd11969
 
app.listen(3000, function(){
    console.log("server is started on 3000")
})