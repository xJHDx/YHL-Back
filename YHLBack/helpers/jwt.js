const jwt = require('jsonwebtoken')

const generateJWT = ( _id , name) => {


    return new Promise( (resolve, reject)=>{
        const payload = {
            name,
            _id,            
        }
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '8h'
        }, (error , token) =>{
    
            if(error){
                console.log(error);
                reject('JWT was not generated')
            }else {
                resolve(token);
            }
    
        });
    });

}

module.exports = {
    generateJWT,
}