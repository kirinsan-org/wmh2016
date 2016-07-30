var _vt = {
    getUserMedia: (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia)
};
var Visualizr = (function () {
    function Visualizr() {
        var _this = this;
        this._el = {};
        this._fx = $("#fx").get(0);
        this.videoReadyHandle = $.Deferred();
        this.videoReady = this.videoReadyHandle.promise();
        this.startSeriously(Seriously);
        this.videoReady.then(function () {
            _this.startFx();
        });
    }
    Visualizr.prototype.startFx = function () {
        var _this = this;
        var CTX = this._fx.getContext("2d");
        setInterval(function () {
            _this._points = _this._ctrack.getCurrentPosition();
            if (!!_this._points) {
                console.log(_this._points[41]);
                CTX.clearRect(0, 0, _this._fx.width, _this._fx.height);
                CTX.beginPath();
                CTX.strokeStyle = "#FFF";
                CTX.arc(_this._points[41][0], _this._points[41][1], 60, 0, Math.PI * 2, false);
                CTX.stroke();
            }
        }, 100);
    };
    Visualizr.prototype.startSeriously = function (Seriously) {
        var _this = this;
        var gUM = _vt.getUserMedia;
        if (!gUM)
            document.body.removeChild(document.getElementById('camera'));
        var source = '#pencils';
        var ctx, grd, target, webCamStream;
        var SOL = new Seriously();
        this._video = document.getElementById('video');
        target = SOL.target('#canvas');
        var SOURCE = SOL.transform('reformat');
        gUM.call(navigator, { video: true }, function (stream) {
            function resize() {
                target.height = this._video.videoHeight;
                target.width = this._video.videoWidth;
            }
            if (window.webkitURL) {
                _this._video.src = window.webkitURL.createObjectURL(stream);
            }
            else {
                _this._video.src = stream;
            }
            _this._ctrack = new clm.tracker();
            _this._ctrack.init(pModel);
            _this._ctrack.start(_this._video);
            webCamStream = stream;
            _this._video.play();
            if (_this._video.videoWidth) {
                resize();
            }
            _this._video.onloadedmetadata = _this._video.onplay = resize;
            console.log(_this.videoReadyHandle);
            _this.videoReadyHandle.resolve();
            SOURCE.source = _this._video;
        }, function () {
            console.log('getUserMedia failed');
        });
        SOURCE.width = 960;
        SOURCE.height = 540;
        SOURCE.mode = 'cover';
        var ILLUST = SOL.effect('sketch');
        ILLUST.source = SOURCE;
        var OPF = SOL.effect('opticalflow');
        OPF.source = SOURCE;
        OPF.offset = 100;
        var GLITCH = SOL.effect('tvglitch');
        GLITCH.source = SOURCE;
        GLITCH.lineSync = 0;
        GLITCH.distortion = 0.025;
        GLITCH.bars = 0.2;
        var NVG = SOL.effect('nightvision');
        NVG.source = GLITCH;
        NVG.time = 10;
        NVG.luminanceThreshold = 0.2;
        var BLEND = SOL.effect('blend');
        BLEND.top = NVG;
        BLEND.bottom = OPF;
        BLEND.opacity = 0.6;
        BLEND.mode = "screen";
        target.source = BLEND;
        SOL.go();
    };
    return Visualizr;
}());
//# sourceMappingURL=main.js.map