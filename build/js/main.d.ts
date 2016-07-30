/// <reference path="../source/ts/d_ts/jquery.d.ts" />
/// <reference path="../source/ts/d_ts/waa.d.ts" />
declare var Seriously: any;
declare let _vt: {
    getUserMedia: NavigatorGetUserMedia;
};
declare class Visualizr {
    private _el;
    private _fx;
    private videoReady;
    private videoReadyHandle;
    private _video;
    private _ctrack;
    private _points;
    private faceAngle;
    HUE: any;
    note: number;
    rms: number;
    freq: number;
    constructor();
    startFx(): void;
    startSeriously(Seriously: any): void;
}
