var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var PORT = 3000;
app.use(bodyParser.urlencoded({
extended: true
}));

/**
 * URL to render the index page
 */
app.get("/",(req, res) => {
    return res.sendFile(path.join(__dirname, "index.html"))
});

/**
 * API to verify the token received
 */
app.post("/verify",async (req, res)=>{
    const { token } = req.body;
    var config = {
        apiKey: '<your-api-key>',
    };

    var ma = require('mojoauth-sdk')(config);
    try {
        const response = await ma.mojoAPI.verifyToken(token);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
})


app.listen(PORT, () => console.log('App can be accessed at localhost:' + PORT ));