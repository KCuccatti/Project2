module.exports = {
  "development": {
    "username": process.env.MYSQL_DEV_USER,
    "password": process.env.MYSQL_DEV_KEY,
    "database": process.env.MYSQL_DEV_DBNAME,
    "host": process.env.MYSQL_DEV_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.MYSQL_PROD_USER,
    "password": process.env.MYSQL_PROD_KEY,
    "database": process.env.MYSQL_PROD_DBNAME,
    "host": process.env.MYSQL_PROD_HOST,
    "dialect": "mysql"
  },
}

