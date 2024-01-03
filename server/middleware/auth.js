import jwt from 'jsonwebtoken'



export const verifyToken = (req,res,next) => {

    let token = req.header("Authorization");

    if(!token) res.status(401).json({ msg: "Access Denied" })

    if(token.startsWith('Bearer ')){
        token = token.slice(7,token.length).trimLeft();
        const verified = jwt.verify(token,process.env.JWT_SECRETKEY)
        req.user = verified
    }

   next()
}