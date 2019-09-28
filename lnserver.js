const recorder = require('node-record-lpcm16');
const speech = require('@google-cloud/speech');
const textToSpeech = require('@google-cloud/text-to-speech');
const player = require('play-sound')(opts={});

const fs = require('fs');
const util = require('util');
const client = new speech.SpeechClient();
const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';
const request = {
    config: {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
    },
    interimResults: false,
    single_utterance: true,
};

// Get the transcription made and send to play
const recognizeStream = client
    .streamingRecognize(request)
    .on('error', console.error)
    .on('data', data =>
        // console.log(data.results[0].alternatives[0].transcript)
        playText(data.results[0].alternatives[0].transcript)
  );

function parseResult(err, resp, body) {
    if (err) console.error(err)
    console.log(body)
}

// Create the recorder instance and set up the type used
const recording = recorder.record({
    recorder: 'rec'
})
console.log('Listening, press Ctrl+C to stop.');

// Keep listening to user's microphone and 
recording
    .stream()
    .pipe(recognizeStream, parseResult);

// Play the text received
async function playText(text) {

  const client = new textToSpeech.TextToSpeechClient();

  const request = {
    input: {text: text},
    // Select the language and SSML Voice Gender (optional)
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    // Select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the Text-to-Speech request
  const [response] = await client.synthesizeSpeech(request);
  
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');

  // Play the audio file
  player.play('./output.mp3', function(err){
    if (err) throw err
  })
}