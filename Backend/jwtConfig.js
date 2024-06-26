const jwt = require('jsonwebtoken')
const crypto =  require('crypto')


const secret = "chellooo"
console.log('Generated Secret Key:', secret);


const generateToken = (payload) => {
    const secretKey = secret; 
    const options = {
      expiresIn: '1h', // Token expiration time
    };
  
    const token = jwt.sign(payload, secretKey, options);
    return token;
  };
  
  
  
  module.exports={
      generateToken
  }