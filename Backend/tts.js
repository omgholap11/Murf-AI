const axios = require('axios');
let data = JSON.stringify({
"text": "In this experiential elearning module, you'll master the basics of using this Text to Speech widget. Choose a voice, experiment with styles, explore languages, customize text, and play with various use-cases for a view into all that Murf offers.",
  "voiceId": "en-US-natalie"
});

let config = {
method: 'post',
url: 'https://api.murf.ai/v1/speech/generate',
headers: {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': 'ap2_e661ca33-a166-41d4-813a-0e786bc9a885'
},
data : data
};

axios(config)
.then((response) => {
console.log(JSON.stringify(response.data));
})
.catch((error) => {
console.log(error);
});
