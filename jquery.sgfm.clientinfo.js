/**
 *$.sgfm.clientinfo或者$.sgfm.ci
 *获取客户端相关信息
 *$.sgfm.ci.sys:操作系统;winXp|win7|win8|linux|mac|unknown
 *$.sgfm.ci.browser:浏览器内核;ie|firefox|chrome|opera|unknown
 *$.sgfm.ci.version:浏览器版本;
 *$.sgfm.ci.screen:屏幕分辨率;h:高,w:宽
 */
(function ($) {
	/*
	 *chrome:Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4
	 *firefox:Mozilla/5.0 (Windows NT 6.1; rv:16.0) Gecko/20100101 Firefox/16.0
	 *opera:Opera/9.80 (Windows NT 6.1; Edition IBIS) Presto/2.12.388 Version/12.10
	 *safari:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2
	 *
	 *ie9:Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)
	 *ie8:Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)
	 *ie7:Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)
	 *ie6:Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)
	 */
	var _userAgent = navigator.userAgent.toLowerCase(),
	_browserType = getBrowserType(_userAgent),
	_browserVersion = getBrowserVersion(_userAgent, _browserType),
	_sys = getSys(_userAgent),
	_screen = getScreen(_browserType, _browserVersion),
	_clientInfo = {
		sys : _sys,
		browser : _browserType,
		version : _browserVersion,
		screen : _screen,
		toString:function(){
			return '$.sgfm.ci.sys:'+_sys
				+'\n$.sgfm.ci.browser:'+_browserType
				+'\n$.sgfm.ci.version:'+_browserVersion
				+'\n$.sgfm.ci.screen.w:'+_screen.w
				+'\n$.sgfm.ci.screen.h:'+_screen.h;
		}
	};
	
	//获得操作系统类型
	function getSys(ua) {
		var systemInfo = {
			'windows nt 5.1' : 'winXp',
			'windows nt 6.1' : 'win7',
			'windows nt 6.2' : 'win8',
			'linux' : 'linux',
			'mac os x' : 'mac',
			'unknown' : 'unknown'
		},
		systemIndex = ua.match(/windows\snt\s\d\.\d/g) ||
			ua.match(/mac\sos\sx/g) ||
			ua.match(/linux/g) ||
			['unknown'];
		return systemInfo[systemIndex];
		
	};
	
	//获得屏幕分辨率
	function getScreen(browserType, browserVersion) {
		var w = screen.width || 0,
		h = screen.height || 0;
		return {w : w,h : h};
	}
	
	//获得浏览器类型
	function getBrowserType(ua) {
		var browserType = ua.match(/msie/g) ||
			ua.match(/firefox/g) ||
			ua.match(/chrome/g) ||
			ua.match(/safari/g) ||
			ua.match(/opera/g) ||
			['unknown'];
		return browserType[0];
	};
	
	//获得浏览器版本
	function getBrowserVersion(ua, bt) {
		var arr = {
			'msie' : [/msie\s\d\.\d/, ' '],
			'firefox' : [/firefox.*/, '/'],
			'chrome' : [/chrome.*\s/, '/'],
			'safari' : [/safari.*/, '/'],
			'opera' : [/version\/.*/, '/']
		},
		param=arr[bt]||[null,null],regex=param[0],splitStr=param[1];
		return bt=='unknown'?bt:ua.match(regex)[0].split(splitStr)[1];
	};
	
	$.sgfm=$.sgfm||{};
	$.extend($.sgfm,{ci:_clientInfo,clientInfo:_clientInfo});
})(jQuery);
