/* eslint-disable */
/**
 * 本sdk可独立使用，不依赖第三方插件
 * */
!(function (global) {
  // jsonp 回调 将 json ip 写入到之前接口 的全局变量
  global.returnCitySN = undefined
  global.getIP = function (json) {
    global.returnCitySN = {}
    global.returnCitySN.cip = json.ip
    global.returnCitySN.cid = '00'
  }
  var trackEvent = (global.trackEvent = {
    domainPro: '//buriedPoints.yunzhangfang.com', // 上报正式环境
    domianDev: '', // 上报测试环境 可配
    domain: '',
    pageIdList: [],  // 需要做页面停留时间上报的url和id 可配
    whiteDomainList: [], // 域名白名单，白名单内域名会上报数据到生产 可配
    // domain: '//172.35.1.28:9003',
    failTime: undefined,
    failNumber: 0,
    trackInitInfo: {
      appId: '',
      sessionId: '',
      userAgent: '',
      userId: '',
      userName: '',
      userType: '',
      accountName: '',
      companyId: '',
      clientIp: '',
      areaCode: '',
      provinceId: '',
      cityId: '',
      args1: '',
      reserve1: '',
      elementId: '',
      eventType: '',
      localTimestamp: '',
      localTime: '',
      pageId: '',
      pageUrl: '',
      prevPage: null, // 当前页面的 上一个页面信息
      pageLoadTime: '',
      screenWidth: '',
      screenHeight: '',
    },
    trackedData: [],
    trackTimer: null,
    trackCfg: {  // init fun 第二个参数的默认配置
      whiteDomainList: [
        'ali-taxservices.yunzhangfang.com',
        'daizhang99.yunzhangfang.com',
        'daizhang88.yunzhangfang.com',
        'daizhang.yunzhangfang.com',
        'dzpre.yunzhangfang.com',
      ],
      pageIdList: [
        {
          pageId: '012',
          pageUrl: '/ledger/invoice/importInvoice',
        },
        {
          pageId: '013',
          pageUrl: '/ledger/invoice/invoice',
        },
      ],
      domianDev: '//172.24.10.4:8080',
    },
    init: function (appId, initTrackCfg) {
      console.log('埋点初始化', appId, initTrackCfg)
      try {
        if (initTrackCfg && Object.prototype.toString.call(initTrackCfg) === '[object Object]') {
          initTrackCfg = trackEvent.assignCopy(trackEvent.trackCfg, initTrackCfg)
        } else {
          initTrackCfg = trackEvent.trackCfg
        }
      } catch (error) {
        initTrackCfg = trackEvent.trackCfg; // 初始化失败使用默认配置
        console.error('eventTrack init error: 请检查init初始化参数')
        console.error('eventTrack init error: ' + error)
      }
      // 初始化一些配置
      trackEvent.pageIdList = initTrackCfg.pageIdList
      trackEvent.whiteDomainList = initTrackCfg.whiteDomainList
      trackEvent.domianDev = initTrackCfg.domianDev

      //初始化方法
      try {
        trackEvent.domain = trackEvent.getDomain()

        trackInitInfo = JSON.parse(global.localStorage.getItem('trackInitInfo'))
      } catch (e) {
        global.sessionStorage.removeItem('trackInitInfo')
      }
      var trackInitInfo = global.localStorage.getItem('trackInitInfo')
        ? JSON.parse(global.localStorage.getItem('trackInitInfo'))
        : trackEvent.trackInitInfo
      if (!trackInitInfo.reserve1) {
        trackInitInfo.reserve1 = initTrackCfg.tempId || trackEvent.generateUUID()
      }
      try {
        trackInitInfo.appId = appId
        trackEvent.batchTrack()
        trackEvent.getIpData(trackInitInfo)
        trackEvent.cachedDataHandler() //先立刻发送一次，且不能是上次遗留
      } catch (e) {
        console.log(e)
        global.sessionStorage.removeItem('trackEventList')
      }
      global.localStorage.setItem('trackInitInfo', JSON.stringify(trackInitInfo))
      console.log(trackEvent)
      return trackInitInfo.reserve1
    },
    batchTrack: function () {
      //监听点击事件，把点击埋点用属性代替，不放入click事件中执行方法
      document.removeEventListener('click', trackEvent.batchTrackFunc)
      document.addEventListener('click', trackEvent.batchTrackFunc)
    },
    batchTrackFunc: function (e) {
      // e.stopPropagation()
      var trackid = trackEvent.getParentHasAttr(e.target)
      if (!!trackid) {
        trackEvent.trackData(trackid)
        trackEvent.trackBa(e, trackid)
      }
    },
    trackData: function (eventId, args1, time) {
      // eventId   114001012201   114001 项目id appId -012 页面码 pageId   - 201 功能
      // console.log('加载事件')
      trackEvent.trackBa('加载事件', eventId)

      if (trackEvent.isCacheDataOverflow()) {
        global.localStorage.setItem('trackDataList', [])
        return
      }
      let trackInitInfo = JSON.parse(global.localStorage.getItem('trackInitInfo')) //trackInitInfo 初始化时的公共信息{}
      try {
        trackEvent.pubDataGenerate(trackInitInfo) //统计全局的一些信息
        var trackedData = JSON.parse(global.localStorage.getItem('trackDataList') || '[]')
        var trackData = trackEvent.assignCopy(
          {},
          trackInitInfo,
          trackEvent.dataHandler(eventId, args1),
          { pageLoadTime: time ? time : '' }
        )
        trackedData.push(trackData)
        global.localStorage.setItem('trackInitInfo', JSON.stringify(trackInitInfo))
        global.localStorage.setItem('trackDataList', JSON.stringify(trackedData))
        //埋点逻辑修改：超过10个立刻发送，不足10个每间隔10分钟发送一次
        if (trackedData.length > 49) {
          trackEvent.uploadAllData(trackedData)
          window.clearInterval(trackEvent.trackTimer)
          trackEvent.trackTimer = null
        } else if (trackedData.length > 0) {
          if (!trackEvent.trackTimer) {
            window.clearInterval(trackEvent.trackTimer)
            trackEvent.trackTimer = null

            trackEvent.trackTimer = window.setInterval(() => {
              trackEvent.uploadAllData(trackedData)
              window.clearInterval(trackEvent.trackTimer)
              trackEvent.trackTimer = null
            }, 600000)
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    trackBa: function (event, eventId) {
      try {
        let __ndzWindow = window
        for (let i = 5; i > 0; i--) {
          if (!__ndzWindow.__NEWDZ__) {
            // @ts-ignore
            __ndzWindow = __ndzWindow.parent
          } else {
            break
          }
        }
        if (__ndzWindow._hmtNew) {
          __ndzWindow._hmtNew.push([
            '_trackEvent',
            typeof event === 'string' ? event : event.view.location.pathname,
            eventId,
          ])
        }
      } catch (error) {
        console.log(error)
      }
    },
    dataHandler: function (eventId, args1) {
      var date = new Date()
      var Y = date.getFullYear() + '/'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '

      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      var strDate = Y + M + D + h + m + s
      return {
        elementId: eventId || '',
        eventType: '',
        localTimestamp: new Date().getTime(),
        localTime: strDate,
        pageId: (eventId && eventId.length) > 10 ? eventId.substr(6, 3) : '',
        pageUrl: window.location.href,
        prevPage: window.location.prevPage ? window.location.prevPage.href : '', // location的自定义属性
        args1: args1 || '',
      }
    },
    pubDataGenerate: function (trackInitInfo) {
      if (!trackInitInfo.sessionId) {
        let sessionId = window['globalData']
          ? window['globalData'].access_token || trackInitInfo.reserve1 + new Date().getTime()
          : trackInitInfo.reserve1 + new Date().getTime()
        trackInitInfo.sessionId = sessionId
      }
      try {
        if (window.YZF.GlobalData.sysDzgsVO) {
          trackInitInfo.companyId = window.YZF.GlobalData.sysDzgsVO.gsid || ''
        }
        if (window.YZF.GlobalData.UserData) {
          trackInitInfo.userId = window.YZF.GlobalData.UserData.yhid || ''
          trackInitInfo.userName = window.YZF.GlobalData.UserData.yhxm || ''
          trackInitInfo.accountName = window.YZF.GlobalData.UserData.yhdlm || ''
          trackInitInfo.accountName = window.YZF.GlobalData.UserData.yhdlm || ''
          trackInitInfo.userType = window.YZF.GlobalData.UserData.userType
        }
        if (window.YZF.GlobalData.QyData) {
          trackInitInfo.cityId = window.YZF.GlobalData.QyData.cityId
          trackInitInfo.provinceId = window.YZF.GlobalData.QyData.provinceId
        }
      } catch (error) { }
      trackInitInfo.userAgent = global.navigator.userAgent
      trackInitInfo.screenWidth = window.screen.width
      trackInitInfo.screenHeight = window.screen.height
    },
    getDomain: function () {
      var thisHost = window.location.host
      var thisDomain = trackEvent.domianDev
      var hostInWhiteDomain = trackEvent.whiteDomainList.some((x) => thisHost.indexOf(x) !== -1)
      if (hostInWhiteDomain) {
        thisDomain = trackEvent.domainPro
      }
      return thisDomain
    },
    uploadAllData: function (data, cb) {
      console.log('发送埋点')
      if (trackEvent.failNumber >= 5) {
        return
      }
      if (
        trackEvent.failNumber > 0 &&
        trackEvent.failNumber < 5 &&
        new Date().getTime() - trackEvent.failTime < 60000
      ) {
        return
      }
      // global.localStorage.removeItem('trackDataList');
      // trackEvent.failNumber = 0;
      // trackEvent.failTime = undefined;
      // trackEvent.trackedData = [];
      // return //本地测试用，发版注释
      trackEvent.ajax({
        url: trackEvent.domain + '/userBurial/acceptUserBehaviorData',
        method: 'post',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ userBehaviorVos: data }),
        success: function (res) {
          trackEvent.failNumber = 0
          trackEvent.failTime = undefined
          trackEvent.trackedData = []
          global.localStorage.removeItem('trackDataList')
        },
        error: function (res) {
          console.log(res)
          trackEvent.failNumber += 1
          trackEvent.failTime = new Date().getTime()
          var curTrackedData = JSON.parse(global.localStorage.getItem('trackDataList') || '[]')
          if (!trackEvent.isCacheDataOverflow()) {
            global.localStorage.setItem('trackDataList', JSON.stringify(data))
          } else {
            global.localStorage.setItem('trackDataList', [])
          }
          if (trackEvent.domain === '//h5data.atclound.com') {
            window.sessionStorage.setItem('domainForbidden', JSON.stringify(true))
            trackEvent.domain = trackEvent.getDomain()
          }
        },
      })
    },

    cachedDataHandler: function () {
      // 初始化时检查是否有遗漏提交数据
      var trackedData = global.localStorage.getItem('trackDataList')
      if (trackEvent.isCacheDataOverflow()) {
        global.localStorage.setItem('trackDataList', [])
        return
      }
      if (!!trackedData) {
        // 验证缓存数据是否为上个会话遗留数据
        if (
          window['globalData'] &&
          JSON.parse(trackedData)[0].sessionId === window['globalData'].access_token
        ) {
          // trackEvent.trackedData = JSON.parse(trackedData);
          return
        }
        trackEvent.uploadAllData(JSON.parse(trackedData))
      }
    },

    assignCopy: function () {
      //实现一个基于es3代码的类Object.assign方法
      var objs = [].slice.call(arguments)
      var target
      if (objs.length >= 2) {
        target = objs.shift()
        for (var i = 0; i < objs.length; i++) {
          for (var item in objs[i]) {
            if (objs[i].hasOwnProperty(item)) {
              target[item] = objs[i][item]
            }
          }
        }
      }
      return target
    },
    getIpData: function (trackInitInfo) {
      var ipData = window.localStorage.getItem('ipData')
      var now = new Date().getTime()
      if (!ipData || (!!ipData && now - JSON.parse(ipData).time > 24 * 60 * 60 * 1000) || (!!ipData && !JSON.parse(ipData).cip)) {
        window.sessionStorage.removeItem('domainForbidden') // 清除域名ip切换标志位，重新启用域名
        var script = document.createElement('script')
        // script.src = '//pv.sohu.com/cityjson?ie=utf-8'
        script.src = '//api.ipify.org?format=jsonp&callback=getIP'
        script.onload = function () {
          setTimeout(function () {
            if (!returnCitySN) return
            returnCitySN.time = new Date().getTime()
            trackInitInfo.clientIp = returnCitySN.cip
            trackInitInfo.areaCode = returnCitySN.cid
            global.localStorage.setItem('trackInitInfo', JSON.stringify(trackInitInfo))
            window.localStorage.setItem('ipData', JSON.stringify(returnCitySN))
          }, 2000)
        }
        document.querySelector('head').appendChild(script)
      } else {
        ipData = JSON.parse(ipData)
        trackInitInfo.clientIp = ipData.cip
        trackInitInfo.areaCode = ipData.cid
        global.localStorage.setItem('trackInitInfo', JSON.stringify(trackInitInfo))
      }
    },
    getParentHasAttr: function (node) {
      try {
        // 事件委托向上查找是否含有trackid属性
        if (node.hasAttribute('customNew-trackid')) {
          return node.getAttribute('customNew-trackid')
        } else if (node.tagName === 'BODY') {
          return false
        } else if (
          !!node.parentNode &&
          node.parentNode.tagName !== 'BODY' &&
          node.parentNode.tagName !== 'body'
        ) {
          return this.getParentHasAttr(node.parentNode)
        } else {
          return false
        }
      } catch (error) {
        console.log('事件委托向上查找是否含有trackid属性', error, node)
      }
    },
    // 封装一个ajax方法
    ajax: function (opt) {
      /* 封装ajax函数
       * @param {string}opt.type http连接的方式，包括POST和GET两种方式
       * @param {string}opt.url 发送请求的url
       * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
       * @param {object}opt.data 发送的参数，格式为对象类型
       * @param {function}opt.success ajax发送并接收成功调用的回调函数
       */
      opt = opt || {}
      opt.method = (opt.method || 'POST').toUpperCase()
      opt.url = opt.url || ''
      opt.async = opt.async || true
      opt.data = opt.data || null
      opt.contentType = opt.contentType || 'application/x-www-form-urlencoded;charset=utf-8'
      opt.success = opt.success || function () { }
      var xmlHttp = null
      if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest()
      } else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
      }
      var postData
      var params = []
      if ((typeof opt.data).toLowerCase() === 'string') {
        postData = opt.data
      } else {
        for (var key in opt.data) {
          params.push(key + '=' + opt.data[key])
        }
        postData = params.join('&')
      }
      if (opt.method.toUpperCase() === 'POST') {
        xmlHttp.open(opt.method, opt.url, opt.async)
        xmlHttp.setRequestHeader('Content-Type', opt.contentType)
        xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*')
        xmlHttp.send(postData)
      } else if (opt.method.toUpperCase() === 'GET') {
        xmlHttp.open(opt.method, opt.url, opt.async)
        xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*')
        xmlHttp.send(null)
      }
      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
          console.log(xmlHttp, 'xmlHttp')
          if (xmlHttp.response.startsWith('<')) {
            opt.success(xmlHttp.response)
          } else {
            opt.success(JSON.parse(xmlHttp.response))
          }
        } else if (xmlHttp.status != 200) {
          opt.error(xmlHttp.response)
        }
      }
    },
    // 超时校验方法,timeInfo: 'L1_xxxxxxxxxxx',time: 校验的时间毫秒数，返回值true: 需要重新设置时间，false：无需重新设置时间
    timeoutCheck: function (timeInfo, time) {
      var lastTime
      if (!timeInfo) {
        return true
      } else {
        lastTime = Number(timeInfo.split('_')[1])
        return new Date().getTime() - lastTime >= time
      }
    },
    effectTime: function (pageId) {
      return () => {
        //查询旧时间信息
        const timeJSONOld = sessionStorage.getItem('trackStartTime')
        sessionStorage.removeItem('trackStartTime')
        if (timeJSONOld) {
          const timeObj = JSON.parse(timeJSONOld)
          const time = new Date().getTime() - timeObj.time
          const code = `${trackEvent.appId}${timeObj.pageId}999`
          trackEvent.trackData(code, '页面停留时间', time)
        }
        const timestamp = new Date().getTime()
        const timeJSON = JSON.stringify({
          pageId: pageId,
          time: timestamp,
        })
        sessionStorage.setItem('trackStartTime', timeJSON)
        return () => {
          const timeJSON = sessionStorage.getItem('trackStartTime')
          if (timeJSON) {
            sessionStorage.removeItem('trackStartTime')

            const timeObj = JSON.parse(timeJSON)
            if (timeObj.pageId === pageId) {
              const time = new Date().getTime() - timeObj.time
              const code = `${trackEvent.appId}${timeObj.pageId}999`
              trackEvent.trackData(code, '页面停留时间', time)
            }
          }
        }
      }
    },
    ledgerChange: function (url) {
      //查询旧时间信息
      const timeJSON = sessionStorage.getItem('trackStartTime')
      sessionStorage.removeItem('trackStartTime')
      if (timeJSON) {
        const timeObj = JSON.parse(timeJSON)
        const time = new Date().getTime() - timeObj.time
        const code =  `${trackEvent.appId}${timeObj.pageId}999`
        trackEvent.trackData(code, '页面停留时间', time)
      }
      // 新增进入页面的时间埋点
      const obj = trackEvent.pageIdList.find((item) => {
        return item.pageUrl === url
      })
      console.log(url, trackEvent.pageIdList, obj, 'objboj')
      if (obj) {
        const pageId = obj.pageId
        const timestamp = new Date().getTime()
        const NewTimeJSON = JSON.stringify({
          pageId: pageId,
          time: timestamp,
        })
        sessionStorage.setItem('trackStartTime', NewTimeJSON)
      }
    },
    isCacheDataOverflow: function () {
      var curTrackedData = JSON.parse(global.localStorage.getItem('trackDataList') || '[]')
      return curTrackedData.length >= 500
    },
    generateUUID: function (len) {
      let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
      let uuid = [],
        i
      let radix = chars.length
      if (!len) {
        len = 36
      }
      for (i = 0; i < len; i++) {
        uuid[i] = chars[Math.floor(Math.random() * radix)]
      }
      return uuid.join('')
    },
  })

  console.log('加载sdk完成')
  if (!!global.YZF) {
    global.YZF.trackEvent = global.trackEvent
  }
})(window)
