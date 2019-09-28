const textToSpeech = require('@google-cloud/text-to-speech');
const player = require('play-sound')(opts={});
const fs = require('fs');
const util = require('util');

module.exports = async function playText(text) {
  
  const client = new textToSpeech.TextToSpeechClient();

  const request = {
    input: {text: text},
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    audioConfig: {audioEncoding: 'MP3'},
  };

  const [response] = await client.synthesizeSpeech(request);
  
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  player.play('./output.mp3', function(err){
    if (err) throw err
  })
}