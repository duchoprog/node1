require('dotenv').config({path:'./variables.env'})

console.log(process.env.DB_URL)
module.exports = {
    url: process.env.DB_URL
  };