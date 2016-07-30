function getUserMedia(opts) {
  return new Promise(function (resolve, reject) {
    navigator.webkitGetUserMedia(opts, resolve, reject);
  });
}

function calcRms(data) {
  let sum = 0;
  data.forEach(item => sum += item * item);
  return Math.sqrt(sum /= data.length);
}

function calcMaxIndex(data) {
  let max = -9999;
  let idx = -1;
  data.forEach((item, index) => {
    if (max < item) {
      max = item;
      idx = index;
    }
  });
  return idx;
}

class Wave {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  start() {
    let self = this;
    getUserMedia({ video: false, audio: true })
      .then(stream => {
        let audioContext = new AudioContext();
        let input = audioContext.createMediaStreamSource(stream);
        let analyser = audioContext.createAnalyser();
        let data = new Float32Array(analyser.fftSize / 2);

        input.connect(analyser);
        input.connect(audioContext.destination);

        let maxValue = -9999;
        let maxIndex = -1;
        let playing;
        let prevFreq = null;
        let prevNote = null;
        let noteOffThreshold = -33;
        let noteOnThreshold = -33;
        let running = true;
        let baseNoise = 0.5;

        requestAnimationFrame(function loop() {
          if (running) {
            requestAnimationFrame(loop);
          }

          analyser.getFloatTimeDomainData(data);
          self.draw(data);
          let rms = calcRms(data);
          vis.rms = rms;
          // console.log(vis.rms)
          /**
           * 音量
           */
          // // console.log(rms);

          if (rms < 0.05) {
            if (playing) {
              playing = false;
              prevFreq = null;
              prevNote = null;

              /*
               * 音がなくなった時
               */
              // $(this).trigger('noteOff');
              // console.log('note off')
            }
            return
          };

          if (!playing) {
            playing = true;

            /*
             * 音を検出した時
             */
            // $(this).trigger('noteOn');
            // console.log('note on')

          }

          // // console.log(rms)


          analyser.getFloatFrequencyData(data);

          let maxIndex = calcMaxIndex(data);
          let freq = audioContext.sampleRate * maxIndex / analyser.fftSize;
          let rawNote = 12 * (Math.log(freq / 440) / Math.log(2)) + 69;
          let note = Math.floor(rawNote);

          // notify changes
          if (freq !== prevFreq) {
            /*
             * 周波数が変わった時
             */
            // $(this).trigger('frequencyChange', [freq]);
            // console.log('frequencyChange', [freq, prevFreq]);
            vis.freq;
          }

          if (note !== prevNote) {
            /*
             * ノートナンバーが変わった時
             */
            // $(this).trigger('noteChange', [note, prevNote]);
            // console.log('noteChange', [note, prevNote] ,( note / 120 *2 -1) *2 ) ;
            vis.note = note;
            if(!!vis.HUE) vis.HUE.hue = ( note / 120 *2 -1) *3+0.2;
          }

          prevFreq = freq;
          prevNote = note;
        });
      })
  }

  draw(data) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#ddd';
    for (let i = 0; i < data.length; i++) {
      let x = i / data.length * this.canvas.width;
      this.ctx.fillRect(x, (data[i] + 0.5) * this.canvas.height, 2, 2);
    }
  }
}