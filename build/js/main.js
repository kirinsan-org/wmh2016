var _vt = {
    getUserMedia: (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia)
};
var Visualizr = (function () {
    function Visualizr() {
        this._el = {};
        this.startSeriously(Seriously);
    }
    Visualizr.prototype.startSeriously = function (Seriously) {
        var gUM = _vt.getUserMedia;
        if (!gUM) {
            document.body.removeChild(document.getElementById('camera'));
        }
        var source = '#pencils';
        var ctx, grd, target, webCamStream;
        var SOL = new Seriously();
        var video = document.getElementById('video');
        target = SOL.target('#canvas');
        var SOURCE = SOL.transform('reformat');
        gUM.call(navigator, { video: true }, function (stream) {
            function resize() {
                target.height = video.videoHeight;
                target.width = video.videoWidth;
            }
            if (window.webkitURL) {
                video.src = window.webkitURL.createObjectURL(stream);
            }
            else {
                video.src = stream;
            }
            webCamStream = stream;
            video.play();
            if (video.videoWidth) {
                resize();
            }
            video.onloadedmetadata = video.onplay = resize;
            SOURCE.source = video;
        }, function () {
            console.log('getUserMedia failed');
        });
        SOURCE.width = 960;
        SOURCE.height = 540;
        SOURCE.mode = 'cover';
        var NVG = SOL.effect('nightvision');
        NVG.source = SOURCE;
        target.source = NVG;
        SOL.go();
    };
    return Visualizr;
}());
//# sourceMappingURL=main.js.map