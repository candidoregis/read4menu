// (function() {
//     var childProcess = require("child_process");
//     var oldSpawn = childProcess.spawn;
//     function mySpawn() {
//         console.log('spawn called');
//         console.log(arguments);
//         var result = oldSpawn.apply(this, arguments);
//         return result;
//     }
//     childProcess.spawn = mySpawn;
// })();

// const recorder = require('node-record-lpcm16');

// const speech = require('@google-cloud/speech');

// const client = new speech.SpeechClient();
// const encoding = 'LINEAR16';
// const sampleRateHertz = 16000;
// const languageCode = 'en-US';
// const request = {
//   config: {
//     encoding: encoding,
//     sampleRateHertz: sampleRateHertz,
//     languageCode: languageCode,
//   },
//   interimResults: false,
// };

// const recognizeStream = client
//   .streamingRecognize(request)
//   .on('error', console.error) 
//   .on('data', data =>
//     process.stdout.write(
//       data.results[0] && data.results[0].alternatives[0]
//         ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
//         : `\n\nReached transcription time limit, press Ctrl+C\n`
//     )
//   );
// recorder.record({
//     sampleRate: sampleRateHertz,
//     threshold: 0,
//     verbose: false,
//     recordProgram: 'rec', 
//     silence: '10.0',
//   })
//   .on('error', console.error)
//   .pipe(recognizeStream);
// console.log('Listening, press Ctrl+C to stop.');




const recorder = require('node-record-lpcm16');
// const request = require('request');
const speech = require('@google-cloud/speech');

//const witToken = process.env.WIT_TOKEN // get one from wit.ai!

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
};
 
const recognizeStream = client
  .streamingRecognize(request)
  .on('error', console.error) 
  .on('data', data =>
    process.stdout.write(
      data.results[0] && data.results[0].alternatives[0]
        ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
        : `\n\nReached transcription time limit, press Ctrl+C\n`
    )
  );

function parseResult (err, resp, body) {
  if (err) console.error(err)
  console.log(body)
}
 
const recording = recorder.record({
  recorder: 'rec'
})
console.log('Listening, press Ctrl+C to stop.');
// recording
//   .stream()
//   .pipe(request.post({
//     'url': 'https://api.wit.ai/speech?client=chromium&lang=en-us&output=json',
//     'headers': {
//       'Accept': 'application/vnd.wit.20160202+json',
//       'Authorization': `Bearer W6A5GMRGFPBRKAQCNJQNBKKRPZHBATT5`,
//       'Content-Type': 'audio/wav'
//     }
//   }, parseResult))
 
recording
  .stream()
  .pipe(recognizeStream)


// recorder.record({
//     sampleRate: sampleRateHertz,
//     threshold: 0,
//     verbose: false,
//     recordProgram: 'rec', 
//     silence: '10.0',
//   })
//   .on('error', console.error)
//   .pipe(recognizeStream);
// console.log('Listening, press Ctrl+C to stop.');



setTimeout(() => {
  recording.stop()
}, 3000) // Stop after three seconds of recording