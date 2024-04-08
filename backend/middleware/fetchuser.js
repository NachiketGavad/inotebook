const jwt = require('jsonwebtoken');
const jwt_Secret = "Nachiketis$good";

// middleware is just a function
const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error : "Use Valid token"});
    }

    try{
        // verify jwt
        const data = jwt.verify(token,jwt_Secret);
        req.user = data.user;
        next();
    }
    catch(error){
        res.status(401).send({error:"Use Valid Token"})
    }

}

module.exports = fetchuser;