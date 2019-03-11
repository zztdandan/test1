const path=require("path");
function resolve(dir) {
  // console.log("alias转换",dir,path.join(__dirname, "..", dir))
  return path.join(__dirname, "..", dir);
}

function setAlias(config){
  config.resolve.alias
  .set("@",resolve("src"))
  .set("#pages",resolve("src/pages"))
  .set("#static",resolve('public'))
  .set("#components",resolve('src/components'))
}

module.exports=setAlias;