declare var Seriously: any;

let _vt = {
  getUserMedia : (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia)
}

class Visualizr {
  private _el: any = {};
  private _fx = $("#fx").get(0);
  private videoReady: any;
  private videoReadyHandle: any;
  private _video: any;
  private _ctrack : any;
  private _points: any;
  private faceAngle: any;

  constructor() {
    this.videoReadyHandle = $.Deferred();
    this.videoReady = this.videoReadyHandle.promise();
    
    this.startSeriously(Seriously);
    this.videoReady.then(() => {
      this.startFx()
    })
  }

  startFx(){
    const CTX = this._fx.getContext("2d");
    setInterval( () => {
      this._points = this._ctrack.getCurrentPosition();

      if(!!this._points){
        //this.faceAngle = (this._points[41][0] - this._points[1][0])/(this._points[13][0] - this._points[1][0])-0.5;
        console.log(this._points[41]);
        CTX.clearRect(0,0,this._fx.width,this._fx.height)
        CTX.beginPath();
        CTX.moveTo(0,0);
        CTX.lineTo(this._points[41][0],this._points[41][1]);
        CTX.stroke();
      }
      
    }, 100);

    
  }
  startSeriously(Seriously){

    const gUM = _vt.getUserMedia

		if (!gUM) document.body.removeChild(document.getElementById('camera'));

    // declare our variables
    const source = '#pencils';
    let ctx, grd, target , webCamStream;
    
    const SOL = new Seriously();
    this._video =  document.getElementById('video');
    
    target = SOL.target('#canvas');

    const SOURCE = SOL.transform('reformat');


    gUM.call(navigator, { video: true }, (stream) => {
        function resize() {
          target.height = this._video.videoHeight;
          target.width = this._video.videoWidth;
        }

        if (window.webkitURL) {
          this._video.src = window.webkitURL.createObjectURL(stream);
        } else {
          this._video.src = stream;
        }

        // 顔認識
        this._ctrack = new clm.tracker();
        this._ctrack.init(pModel);
        
        this._ctrack.start(this._video);
        
        webCamStream = stream;
        this._video.play();
        if (this._video.videoWidth) { resize(); }
        this._video.onloadedmetadata = this._video.onplay = resize;
        console.log(this.videoReadyHandle);
        this.videoReadyHandle.resolve();
        SOURCE.source = this._video;
      }, function() {
        console.log('getUserMedia failed');
      });
 
    //SOURCE.source = '#pencils';
    SOURCE.width = 960;
    SOURCE.height = 540;
    SOURCE.mode = 'cover';

    const NVG = SOL.effect('nightvision');
    NVG.source = SOURCE;

    const ILLUST = SOL.effect('sketch');
    var foo = true;
    ILLUST.source = SOURCE;

    setInterval(function(){
      target.source = foo ? ILLUST : NVG;
      foo = !foo;
    },1000)
    target.source = ILLUST;
 
    //render
    SOL.go();
  }
}