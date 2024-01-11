const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const playButton = document.getElementById('play');
let output = document.getElementById('output');

let audioRecorder;
let audioChunks = [];

navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        audioRecorder = new MediaRecorder(stream);
        audioRecorder.addEventListener('dataavailable', e => {
            audioChunks.push(e.data);
        })
        startButton.addEventListener('click', () => {
            audioChunks = [];
            audioRecorder.start();
            output.innerHTML = 'Recording Started! Speak now.';
        });

        stopButton.addEventListener('click', () => {
            audioRecorder.stop();
            output.innerHTML = 'Recording stopped! Click play to play the audio';
        })

        playButton.addEventListener('click', () => {
            const blobObj = new Blob(audioChunks, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(blobObj);
            const audio = new Audio(audioUrl);
            audio.play();
            output.innerHTML = 'Playing the recorded audio!';
        });
    }).catch(err => {
        console.log('Error: ' + err);
    })