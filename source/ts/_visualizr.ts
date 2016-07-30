declare var Seriously: any;

let _vt = {
  getUserMedia : (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia)
}

class Visualizr {
  private _el: any = {};
  constructor() {
    this.startSeriously(Seriously);
  }

  startSeriously(Seriously){

    const gUM = _vt.getUserMedia

		if (!gUM) {
			document.body.removeChild(document.getElementById('camera'));
			//return;
		}

    // declare our variables
    const source = '#pencils';
    let ctx, grd, target , webCamStream;
    
    const SOL = new Seriously();
    const video =  document.getElementById('video');
    
    target = SOL.target('#canvas');

    const SOURCE = SOL.transform('reformat');


    gUM.call(navigator, { video: true }, function(stream) {
        function resize() {
          target.height = video.videoHeight;
          target.width = video.videoWidth;
        }

        if (window.webkitURL) {
          video.src = window.webkitURL.createObjectURL(stream);
        } else {
          video.src = stream;
        }

        webCamStream = stream;
        video.play();
        if (video.videoWidth) { resize(); }
        video.onloadedmetadata = video.onplay = resize;
        SOURCE.source = video;
      }, function() {
        console.log('getUserMedia failed');
      });
 
    //SOURCE.source = '#pencils';
    SOURCE.width = 960;
    SOURCE.height = 540;
    SOURCE.mode = 'cover';

    const NVG = SOL.effect('nightvision');
    NVG.source = SOURCE;
 
    target.source = NVG;
 
    //render
    SOL.go();
  }
}