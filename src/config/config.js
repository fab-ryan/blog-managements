const dotenv = require('dotenv')
dotenv.config()
const getPrefix = () => {
  var env = process.env.NODE_ENV;
  if (!env) {
    return env = 'DEV'
  }
  return env
}

const databaseConfig = () => {
  const env = getPrefix();
  console.log(process.env[`${env}_USERNAME`])
  return {
    username: process.env[`${env}_USERNAME`] || '',
    database: process.env[`${env}_DATABASE`] || '',
    password: process.env[`${env}_PASSWORD`] || '',
    host: process.env[`${env}_HOST`] || '',
    port: process.env[`${env}_PORT`] || 5432,
    dialect: 'postgres'

  }
}

module.exports = databaseConfig