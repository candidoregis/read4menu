const recorder = require('node-record-lpcm16');
const speech = require('@google-cloud/speech');

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

const recognizeStream = client
    .streamingRecognize(request)
    .on('error', console.error)
    .on('data', data =>
        console.log(data.results[0]);
    // process.stdout.write(
    //   data.results[0] && data.results[0].alternatives[0]
    //     ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
    //     : `\n\nReached transcription time limit, press Ctrl+C\n`
    // )
  );

function parseResult(err, resp, body) {
    if (err) console.error(err)
    console.log(body)
}

const recording = recorder.record({
    recorder: 'rec'
})
console.log('Listening, press Ctrl+C to stop.');

recording
    .stream()
    .pipe(recognizeStream, parseResult);

setTimeout(() => {
    recording.stop()
}, 3000);