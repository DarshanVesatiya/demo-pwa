const env=process.env.NODE_ENV?process.env.NODE_ENV:'development';
const config=require(`./${env}.js`).config;
module.exports=config;
