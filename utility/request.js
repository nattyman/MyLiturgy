request = require('request-json');

var verseArray = [
  'Acts 2:14a, 22-32',
  'Psalm 16',
  '1 Peter 1:3-9',
  'John 20:19-31'
];

var response = [];

for (i = 0; i < verseArray.length; i++) {
  var scrubbedVerse = verseArray[i].replace(/(\d)[ab]/, '$1')
  var client = request.createClient('https://bible-api.com/');
  client.get(encodeURI(scrubbedVerse), function(err, res, body) {
    response[i] = {
      "reference": body.reference,
      "text": body.text
    };
    console.log(response[i].reference);
    console.log(response[i].text);
  });
}
