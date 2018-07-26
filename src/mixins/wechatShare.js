import Bridge from '../libs/Bridge'

// 异步加载js方法
function loadScript(url, callback) {
  var script  = document.createElement('script');
  script.type = 'text/javascript';
  if (typeof(callback) != 'undefined') {
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        callback();
      };
    }
  }
  script.src = url;
  document.body.appendChild(script);
}

/**
 * 微信分享，包括微信浏览器和native app 此方法在原来页面抽离
 */
const wechatShareMixin = {
  data () {
    return {
      // 根据wxconfig变化获取的wx-package
      wxConfig: null
    }
  },
  computed: {
    // 获取授权列表
    shareLinsters() {
      return [
        'onMenuShareTimeline', // 分享到朋友圈
        'onMenuShareAppMessage', // 分享给朋友
        'onMenuShareQQ', // 分享qq
        'onMenuShareWeibo', // 分享到腾讯微博
        'onMenuShareQZone' // 分享到qq空间
      ]
    },
    // 分享信息
    shareConfig() {
      console.warn('请定义computed.shareConfig return微信分享, 可配置项目如下')
      console.log(`{
        title,
        desc,
        link,
        imgUrl,
        success = () => {},
        cancel = () => {},
        type = '',
        dataUrl = ''
      }`)
      return {}
    },
    // brige初始话时methods需要合并的配置项
    // otherBrigeMethods() {
    //   return []
    // },
    // topFuncBtnConfig btnlist需要合并的配置项
    // otherBtnConfig() {
    //   return []
    // }
  },
  methods: {
    // 微信浏览器
    setBrowserShare() {
      const reqUrl_getWxConfig = this.mobileSite + 'wx/get-wx-package.json';
      if(navigator.userAgent.toUpperCase().indexOf('MICROMESSENGER') !== -1) {
        let currentUrl = document.location.href.split('#')[0];
        this.$http.get(reqUrl_getWxConfig + '?url=' + encodeURIComponent(currentUrl))
          .then(res => {
            let {data} = res;
            if (data.code == 0) {
              // 出发watchs
              this.wxConfig = data.data;
            }
          })
      }
    },
    /**
     * native app 外部手动调用
     * @param {object} bridge new Bridge 时候传入的配置，会合并methods
     * @param {object} topFuncBtnConfigBtnList bridge.call topFuncBtnConfig 时候传入的配置
     */
    setNativeShare(bridgeConfig = {}, topFuncBtnConfigBtnList = []) {
      // H5与原生交互
      if(navigator.userAgent.indexOf('yixinliApp') >= 0) {

        bridgeConfig = {
          ...bridgeConfig,
          methods: [
            ...bridgeConfig.methods,
            {
              method: 'topFuncBtn',
              callback: (ops) => {
                if (ops.name === 'shareReportBtn') {
                  var share_config = () => {
                    const {
                      title, desc, link, imgUrl
                    } = this.shareConfig
                    return {
                      title, desc, link, imgUrl
                    }
                  }
                  bridge.call('shareReport', share_config());
                }
              }
            }
          ]
        }
        var bridge = new Bridge(bridgeConfig)
        bridge.call('topFuncBtnConfig', {
          btnList:[
          ...topFuncBtnConfigBtnList,
          {
            name: 'shareReportBtn',
            visible: 1,
          }]
        })
        this.bridge = bridge
      }
    }
  },

  created() {
    this.setBrowserShare()
    // this.setNativeShare()
  },

	watch: {
    wxConfig(val, oldVal) {
      if (val === null) {
        return;
      }
      setTimeout(() => {
        loadScript('//res.wx.qq.com/open/js/jweixin-1.0.0.js', () => {
          const { shareLinsters, shareConfig } = this
          var { debug, appId, timestamp, nonceStr, signature } = val
          var _config = {
            debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId, // 必填，公众号的唯一标识
            timestamp, // 必填，生成签名的时间戳
            nonceStr, // 必填，生成签名的随机串
            signature,// 必填，签名，见附录1
            jsApiList:  [...shareLinsters]// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          }

          //微信基本配置信息
          wx.config(_config);
          const {
            title,
            desc,
            link,
            imgUrl,
            success = () => {},
            cancel = () => {},
            type = '',
            dataUrl = ''
          } = shareConfig

          wx.ready(() => {
            for (let i = 0; i < shareLinsters.length ;i++) {
              const method = shareLinsters[i]
              const conf = {...{
                title, link, desc, imgUrl,
                success() {
                  success({
                    method,
                    config: shareConfig
                  })
                },
                cancel() {
                  cancel({
                    method,
                    config: shareConfig
                  })
                }
              }, ...(method === 'onMenuShareAppMessage') ? {
                type, dataUrl
              } : {}}
              wx[method](conf)
            }
          });
        });
      }, 500) // 500毫秒我也不知道为什么.....
    }
	},
}

export default wechatShareMixin
