const jwt = require('jsonwebtoken')
const Authenticate = (req,res,next) => {
    const Token = req.headers.authorization.split(' ')[1];
    if(!Token){
        res.status(401).send({'Message':'Please login...!'});
    }
    jwt.verify(Token,'UserToken',async(error,decoded)=>{
        if(decoded){
            const {UserID} = decoded;
            req.userID = UserID;
            next();
        }
        else{
            req.status(401).send({'Message':'Invalid token, Please longin again...!'});
        }
    })
    
}

module.exports = {
    Authenticate
}