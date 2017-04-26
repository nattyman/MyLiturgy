var date = new Date();
var month = ("0" + (date.getMonth() + 1)).slice(-2);
var year = date.getFullYear();
var day = date.getDate();
var today = (year + '' + month + '' + day);

console.log(today);
