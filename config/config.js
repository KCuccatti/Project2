module.exports = {
  "development": {
    "username": process.env.MYSQL_DEV_USER,
    "password": process.env.MYSQL_DEV_KEY,
    "database": process.env.MYSQL_DEV_DBNAME,
    "host": process.env.MYSQL_DEV_HOST,
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "mysql://pamysw9v1f4y4hgn:kl7ht97s9kv59xb7@o61qijqeuqnj9chh.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/orj8u4w0uedyt9zo",
    "dialect": "mysql"
    }
}
