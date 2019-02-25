const express = require('express')
const bodyParser = require("body-parser");
const cors=require("cors");
const { generateCaptcha, CaptchaMode } = require("@tuzhanai/captcha");

// console.log("验证码：%s，图片Buffer：%s", text, data);
const app = express()
const port = 3000
const log=console.log;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
 
let captchaText="";
app.get('/captcha', (req, res) => {
    const { text, data } = generateCaptcha(CaptchaMode.Medium);
    captchaText=text;
    // res.writeHead(200, {'Content-Type': 'image/gif' });
    // res.end(data, 'binary');
    res.send(Buffer.from(data).toString("base64"));
})
app.post("/captcha",(req,res)=>{
    log(captchaText);
    log(req.body);
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))