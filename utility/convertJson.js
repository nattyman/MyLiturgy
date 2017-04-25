var fs = require('fs');
var users = JSON.parse(fs.readFileSync('./YearA1617.json', 'utf8'));

//console.log(users[0]);
var today = new Date();
var year = today.getFullYear();
var month = ("0" + (today.getMonth() + 1)).slice(-2);
var day = today.getDate();
var date = year+''+month+''+day;

for (i=0; i<users.length; i++) {
  console.log(users[i].DTSTART);
  var lectDate = users[i].DTSTART
  if(lectDate <= date) {
    message =  users[i].SUMMARY;
    verseRefs = users[i].DESCRIPTION;
  }
}
console.log("Today is: " + date + ": " + message);

var verses = verseRefs.split("\\n");

console.log(verses);

// var file = require('./lectionaryTest.json');
//
// var lectionaryData = JSON.parse([file]);
// console.log(lectionaryData);
