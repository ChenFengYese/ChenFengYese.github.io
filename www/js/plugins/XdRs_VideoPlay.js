//==================================================================================================================
/*:
 * @plugindesc 中途跳过视频播放 + 标题前播放视频  。
 * 
 * @author 芯☆淡茹水
 * 
 * @help  
 *
 * 〓 说明 〓
 *
 * 工程在 编辑/测试 时使用的是 webm 格式视频。
 *
 * 该插件显示制作好的 跳过视频 图片来提示跳过视频。 图片保存在 image/system 文件夹里。
 *
 * 〓 插件命令 〓
 *
 * 播放视频时显示并能够操作 跳过视频 。
 * 在播放视频前使用插件命令： ShowVideoSkip
 *
 * ※该命令只作用于当前播放视频（执行命令后第一个播放的视频）※
 * 
 * @param videoName
 * @desc 标题前播放的视频文件名（不播放就不写）。
 * @default 
 *
 * @param titVdSkip
 * @desc 是否可以跳过标题前播放的视频？ （是：ON；否：OFF）
 * @default ON
 * 
 * @param skipTit
 * @desc 是否跳过标题界面（是：ON; 否：OFF）。
 * @default OFF
 *
 * @param skipX
 * @desc 视频播放时，跳过提示显示的 X 坐标。
 * @default 640
 * 
 * @param skipY
 * @desc 视频播放时，跳过提示显示的 Y 坐标。
 * @default 88
 *
 * @param skipKey
 * @desc 跳过视频播放快捷键的键盘键值(不需要按键跳过就不写)。
 * @default 75
 * 
 * @param skipImage
 * @desc 用图片制作的 跳过提示 的图片名（图片保存在system文件夹）。
 * @default Video_Skip
 *
*/
//==================================================================================================================
;(function(){
var XdRsData = XdRsData  || {};
XdRsData.videoPlay = XdRsData.videoPlay || {};
XdRsData.videoPlay.parameters  =    PluginManager.parameters('XdRs_VideoPlay');
XdRsData.videoPlay.skipX       =   +XdRsData.videoPlay.parameters['skipX']       || 0;
XdRsData.videoPlay.skipY       =   +XdRsData.videoPlay.parameters['skipY']       || 0;
XdRsData.videoPlay.skipImage   = ''+XdRsData.videoPlay.parameters['skipImage']   || '';
XdRsData.videoPlay.name        = ''+XdRsData.videoPlay.parameters['videoName']   || '';
XdRsData.videoPlay.skipTit     = ''+XdRsData.videoPlay.parameters['skipTit'] === 'ON';
XdRsData.videoPlay.titVdSkip   = ''+XdRsData.videoPlay.parameters['titVdSkip'] === 'ON';
//==================================================================================================================
Input.keyMapper[+XdRsData.videoPlay.parameters['skipKey']] = 'skipVideo';
//==================================================================================================================
ConfigManager.videoSkipTip = false;
//==================================================================================================================
XdRsData.videoPlay.GraphicsPlayVideo = Graphics.playVideo;
Graphics.playVideo = function(src) {
    XdRsData.videoPlay.GraphicsPlayVideo.call(this, src);
    this._video.volume = ConfigManager.bgmVolume / 100;
    this._videoLoading = true;
};
Graphics.stopVideo = function() {
    SoundManager.playOk();
    this._video.currentTime = 0;
    this._video.pause();
    this._updateVisibility(false);
};
Graphics.videoIsLoading = function() {
    return this._videoLoading && !this.isVideoPlaying();
};
XdRsData.videoPlay.Graphics_createAllElements = Graphics._createAllElements;
Graphics._createAllElements = function() {
    XdRsData.videoPlay.Graphics_createAllElements.call(this);
    this._createSkipCanvas();
};
Graphics._createSkipCanvas = function() {
    this._skipCanvas = document.createElement('canvas');
    this._context = this._skipCanvas.getContext('2d');
    document.body.appendChild(this._skipCanvas);
    var rw = this._width - window.innerWidth;
    var rh = this._height - window.innerHeight - 1;
    window.resizeBy(rw, rh); window.resizeBy(rw, rh+1);
};
XdRsData.videoPlay.Graphics_onVideoLoad = Graphics._onVideoLoad;
Graphics._onVideoLoad = function() {
    XdRsData.videoPlay.Graphics_onVideoLoad.call(this);
    ConfigManager.videoSkipTip && this._showSkip();
};
XdRsData.videoPlay.Graphics_updateVisibility = Graphics._updateVisibility;
Graphics._updateVisibility = function(videoVisible) {
    XdRsData.videoPlay.Graphics_updateVisibility.call(this, videoVisible);
    this._skipCanvas.style.opacity = this._video.style.opacity;
    !videoVisible && this._clearContext();
    this._videoLoading = false;
};
Graphics._clearContext = function() {
    ConfigManager.videoSkipTip = false;
    this._skipW = this._skipH = null;
    this._context.clearRect(0, 0, this._width, this._height);
};
Graphics._showSkip = function() {
    if (!XdRsData.videoPlay.skipImage) return;
    var bitmap = ImageManager.loadSystem(XdRsData.videoPlay.skipImage);
    bitmap.addLoadListener(function() {
        this._context.globalCompositeOperation = 'source-over';
        this._skipW = bitmap.width; this._skipH = bitmap.height;
        var x = XdRsData.videoPlay.skipX, y = XdRsData.videoPlay.skipY;
        this._context.drawImage(bitmap._canvas, 0, 0, this._skipW, this._skipH, x, y, this._skipW, this._skipH);
    }.bind(this));
};
XdRsData.videoPlay.Graphics_updateAllElements = Graphics._updateAllElements;
Graphics._updateAllElements = function() {
    XdRsData.videoPlay.Graphics_updateAllElements.call(this);
    this._updateSkipCanvas();
};
Graphics._updateSkipCanvas = function() {
    this._skipCanvas.width = this._width;
    this._skipCanvas.height = this._height;
    this._skipCanvas.style.zIndex = 2;
    this._centerElement(this._skipCanvas);
};
Graphics._touchInSkip = function() {
    var x = XdRsData.videoPlay.skipX, y = XdRsData.videoPlay.skipY;
    return TouchInput.x > x && TouchInput.x < x + this._skipW &&
           TouchInput.y > y && TouchInput.y < y + this._skipH;
};
Graphics.isSkiped = function() {
    if (!this._skipW || !this._skipH) return false;
    return Input.isTriggered('skipVideo') || TouchInput.isTriggered() && this._touchInSkip();
};
//==================================================================================================================
XdRsData.videoPlay.SMupdateMain = SceneManager.updateMain;
SceneManager.updateMain = function() {
    XdRsData.videoPlay.SMupdateMain.call(this);
    Graphics.isVideoPlaying() && Graphics.isSkiped() && Graphics.stopVideo();
};
//==================================================================================================================
XdRsData.videoPlay.GIpluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    XdRsData.videoPlay.GIpluginCommand.call(this, command, args);
    if (command === 'ShowVideoSkip') ConfigManager.videoSkipTip = true;
};
//==================================================================================================================
Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
        SceneManager.goto(Scene_Map);
    } else {
        XdRsData.videoPlay.name && this.playVideo();
    }
    this.updateDocumentTitle();
};
Scene_Boot.prototype.startNewGame = function() {
    this.checkPlayerLocation();
    DataManager.setupNewGame();
    SceneManager.goto(XdRsData.videoPlay.skipTit ? Scene_Map : Scene_Title);
    Window_TitleCommand.initCommandPosition();
};
Scene_Boot.prototype.getVideoType = function() {
    return Graphics.canPlayVideoType('video/webm') && !Utils.isMobileDevice() ? '.webm' : '.mp4';
};
Scene_Boot.prototype.playVideo = function() {
    ConfigManager.videoSkipTip = XdRsData.videoPlay.titVdSkip;
    Graphics.playVideo('movies/' + XdRsData.videoPlay.name + this.getVideoType());
};
XdRsData.videoPlay.SBupdate = Scene_Boot.prototype.update;
Scene_Boot.prototype.update = function() {
    XdRsData.videoPlay.SBupdate.call(this);
    if (Graphics.videoIsLoading()) return;
    !Graphics.isVideoPlaying() && this.startNewGame();
};
}());
//==================================================================================================================
//==================================================================================================================