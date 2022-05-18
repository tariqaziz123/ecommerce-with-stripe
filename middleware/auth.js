const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token = req.header('X-Auth-Token');

    if(!token){
        return res.status(401).json({msg:'No token, authorization denied'});
    }

    try{
        const decoded = jwt.verify(token, config.get('jwtsecret'));

        req.user = decoded;
        next();
    }catch(e){
        res.status(400).json({msg:'Token is not valid'});
    }
}