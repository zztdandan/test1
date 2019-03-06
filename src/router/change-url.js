// http(s)://或者/mockxxx/开头的(如/mock2/)或者/api/，直接返回,否则加前缀/api
const changeUrl = function(url) {
   return /^(http(s?):\/\/)|(\/mock.*\/)|(\/api\/)/.test(url) ? url : "/api" + url;
};

module.exports = changeUrl;
