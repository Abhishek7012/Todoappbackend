const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("./dbconnection/connectionDB");
const User = require("./dbconnection/user");
const app = express();

app.use(cors());
app.use(express.json());
const saltRounds = 10;

app.post("/register" , async (req, res) => {
try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    let user =new User({
        name:req.body.name,
        email:req.body.email,
        fname:req.body.fname,
        phoneNumber:req.body.phoneNumber,
        password:hashedPassword,
    });
    let result = await user.save();
    result = result.toObject();
    delete result.password;

    res.send(result)
} catch (error) {
    console.log("error during registration",error );
    res.status(500).send("internal server error")
}
});


app.post("/login", async (req, res) =>{
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne({email:req.body.email}).select("-password");
        if (user) {
            res.send(user)
        } else {
            res.send({result: "no user found"})
        }
    }else{
        res.send({result: "no user found"})
    }
})

app.listen(8000, () => console.log(`started on port ${8000}`));