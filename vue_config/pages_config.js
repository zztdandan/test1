const glob = require("glob");
const path = require("path");
var PAGE_PATH = path.resolve(__dirname, "../src/pages");

function generatePages() {
  let entryHtml = glob.sync(PAGE_PATH + "/*/*.html");
  let pagesObj = new Object();
  entryHtml.forEach(filePath => {
    let filename = filePath.substring(
      filePath.lastIndexOf("/") + 1,
      filePath.lastIndexOf(".")
    );
    let jsFilePath = filePath.substring(0, filePath.lastIndexOf(".")) + ".ts";
    let conf = {
      entry: jsFilePath,
      template: filePath,
      filename: filename + ".html"
    };
    pagesObj[filename] = conf;
  });
  // console.log(pagesObj);
  return pagesObj;
}
// let c = generatePages();
module.exports =  generatePages();

// pages: {
// index: {
// entry for the page
// entry: 'src/index/main.js',
// the source template
// template: 'public/index.html',
// output as dist/index.html
// filename: 'index.html'
// },
