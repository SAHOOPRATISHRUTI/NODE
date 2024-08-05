const jwt = require('jsonwebtoken')
const secret="Nilu@2002"

function setUser(user) {
 return jwt.sign(user,secret)
}

function getUser(token) {
  if(!token){
    return null;
  }
  return jwt.verify(token,secret)
}

module.exports = {
  setUser,
  getUser,
};