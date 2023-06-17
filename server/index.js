const express =  require('express')
const db = require('./db/database')
const app = express()
const PORT = 3000
const cors = require("cors")
const {encrypt , decrypt } = require('./encryptionhandler')

app.use(cors())
app.use(express.json())



app.post('/addpassword',(req,res)=>{
    const {password, title } = req.body;

    const hashedPassword = encrypt(password)

    db.query("INSERT INTO passwords (passwords,title,iv ) VALUES (?,?,?)",[
        hashedPassword.password,
        title,
        hashedPassword.iv
    ],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            // res.send("Success")
            console.log(result)
        }
    });
})

app.get("/showpasswords",(req,res)=>{
    db.query("SELECT * FROM passwords;",(err,result)=>{
        if(err){
            console.log(err)
        }else {
            res.send(result)
        }
    })
})

app.post("/decryptpassword", (req, res) => {
    res.send(decrypt(req.body));
});

app.listen(PORT, ()=>{
    console.log('Server is running');
})