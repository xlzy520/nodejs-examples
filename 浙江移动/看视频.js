const axios = require('axios');
// const https = require('https');
const Queue = require("queue-promise")

const queue = new Queue({
  concurrent: 1,
  interval: 3000,
  start: true,
});

axios.default.defaults.baseURL = 'https://wap.zj.10086.cn';
// axios.default.defaults.httpsAgent = new https.Agent({
//   rejectUnauthorized: false,
// });


const Users = {
  lzy: {
    Cookie: 'STSESSION=3BF23E47220F67DC7152FB6CD26F716F;SINOSESSION_ID_=626321fc09f7431a9639a976f042e9a9;CmWebtokenid=13588043792zj;Version=1;zjCityCode=571;_h5_control=13588043792101135711;wapserv_arrayid=wapserv_ec_81;JSESSIONID=704934A265DE38FD77BAB9F2A21A1E40;dq-wactnew-ec=dq-wactnew-ec_74',
    paramsString: 'nonce=DJ0im91c8t8q7Nf8&encpn=dff80372d6a48f3905bd2e3eb74ccb1b&cf=10113&session=7LPK232M53MVSASM5V9K7UC5'
  },
  xlz: {
    Cookie: 'STSESSION=8DF35E73C544C4C3C274348148349056;SINOSESSION_ID_=68428c66101144fc9aa4b729156ac1f2;CmWebtokenid=18458248021zj;Version=1;zjCityCode=571;_h5_control=18458248021101135711;wapserv_arrayid=wapserv_ec_24;JSESSIONID=5F5A3DC71980A6B30EE7AC1E922225E7;dq-wactnew-ec=dq-wactnew-ec_05',
    paramsString: 'nonce=H03BWxnn28X0Y4y0&encpn=86155901bbea09075fc1480d49c6b8e9&cf=10113&session=NM4QDV9EVP98BDZD4UCWRDYJ'
  },
}

axios.default.defaults.headers = {
  Cookie: Users.xlz.Cookie,
  Host: 'wap.zj.10086.cn',
  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat',
  Referer: 'https://servicewechat.com/wxea7759afc7853c05/203/page-frame.html'
}


let viewVideoCount = 0
let likeCount = 0
let num = 1
const maxLikeNum = 50

// {
//   body: { videoShareId: '6296f236146a3b4cbf74873c', sleepTime: '3000' },
//   head: { errorCode: '000', errorMsg: '查询成功' }
// }
const getConfigure = (id) => {
  axios.get('/weixin/shortVideo/getConfigure?toPage=0&').then(res => {
    console.log(res.data);
  })
}

const videoData = (user, videoId) => {
  console.log('videoId: ', videoId);
  axios.get(`/weixin/shortVideo/videoData?${user.paramsString}&type=1&videoId=${videoId}&videoShareId=`).then(res => {
    viewVideoCount += 1
    const data = res.data
    setTimeout(() => {
      setVideoOpera(user, videoId)
    }, 500)
    console.log(JSON.stringify(data));
  })
}

const setVideoOpera = async (user, playId) => {
  await axios.get(`/weixin/shortVideo/setVideoOpera?toPage=0&${user.paramsString}&state=N&type=1&playId=${playId}`)
  axios.get(`/weixin/shortVideo/setVideoOpera?toPage=0&${user.paramsString}&state=Y&type=1&playId=${playId}`).then(res => {
    likeCount += 1
    const data = res.data
    if (likeCount === num * 8) {
      num += 1
      if (likeCount < maxLikeNum) {
        getVideoList(user, num)
      }
    }
    console.log('点赞成功', JSON.stringify(data));
  })
}


// /usr/local/bin/node /Users/lvzongyuan/Documents/webstormProjects/nodejs-examples/浙江移动/看视频.js
// [{"BBBBBB":"114","likesNum":"1.0w","userPhoto":"https://wap.zj.10086.cn/synchroNg/images/2020/dszbjtxshaoxing.png","CCCCCC":"800","sharePhoto":"https://wap.zj.10086.cn/synchroNg/images/2022/04/19/TTDDDW.jpg","coverPhoto":"https://wap.zj.10086.cn/synchroNg/images/2022/04/19/TTDDDW.jpg","visitNum":"9.2w","goodsList":[],"userPath":"/pages/sinova/livelist/city/city?areaCode=575","type":"1","title":"春天天气里都弥漫着甜甜的味道","userName":"绍兴移动直播间","userId":"575","shareNum":"862","url":"http://apm/video/TTDDDW.mp4","shareWords":"春天天气里都弥漫着甜甜的味道","isTop":2,"name":"甜甜的钉钉舞","id":"000369","AAAAAA":"267"},{"BBBBBB":"121","likesNum":"9973","userPho10086.cn/synchroNg/images/2020/dszbjtxshaoxing.png","CCCCCC":"850","sharePhoto":"https://wap.zj.10086.cn/synchroNg/images/2022/04/19/ZCSBYSZCGS.jpg","coverPhoto":"https://wap.zj.10086.cn/synchroNg/images/2022/04/19/ZCSBYSZCGS.jpg","visitNum":"9.2w","goodsList":[],"userPath":"/pages/sinova/livelist/city/city?areaCode=575","type":"1","title":"小白变高手","userName":"绍兴移动直播间","userId":"575","shareNum":"842","url":"http://app.v.zj.chinamobile.com/video/ZCXBVSZCGS.MP4","shareWords":"小白变高手","i场小白VS职场高手","id":"000370","AAAAAA":"283"},{"BBBBBB":"70","likesNum":"8993","userPhoto":"https://wap.zj.10086.cn/synchroNg/images/14644457067489245.png","CCCCCC":"harePhoto":"https://wap.zj.10086.cn/synchroNg/images/2022/04/19/DZXSZ.jpg","coverPhoto":"https://wap.zj.10086.cn/synchroNg/images/2022/04/19/DZXSZ.jpg","visitNum":"9.2w","goodsList":[{"goodsPhoto":"https://wap.zj.10086.cn/synchroNg/images/2022/04/19/ZXDJspt.jpg","goodsUrl":"/pages/sinova/yiwebview/index?src=https%3A%2F%2Ffsp-wz.zj.chinamobile.com%2Fgwwzcaiyun10Gweb%2Fdzxsz","goodsId":"000033","price":18,"appId":"wxea7759afc7853c05","showType":"1","details":"","title":"咨询登记","type":"2"}],"userPat/pages/sinova/livelist/city/city?areaCode=577","type":"1","title":"没有游戏功能，放心！","userName":"温州移动直播间","userId":"577","shareNum":"753","url":"http://app.vom/video/DZXSZ_01.mp4","shareWords":"没有游戏功能，放心！","isTop":2,"name":"电子学生证","id":"000374","AAAAAA":"162"},{"BBBBBB":"86","likesNum":"8936","userPhoto":"htt86.cn/synchroNg/images/2020/dszbjtxtaizhou.png","CCCCCC":"600","sharePhoto":"https://wap.zj.10086.cn/synchroNg/images/2022/05/7/FZXKTYQKDZP.jpg","coverPhoto":"https://wap.zj.10086.cn/synchroNg/images/2022/05/7/FZXKTYQKDZP.jpg","visitNum":"9.0w","goodsList":[{"goodsPhoto":"https://wap.zj.10086.cn/synchroNg/images/2022/05/7/TZFLS.png","goodsUrl":"/pages/sinova/yiwebview/index?src=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FCgqGL_v2XqckNIkaRsRjJA","goodsId":"000037","price":0,"appId":"wxea7759afc7853c05","showType":"1","details":"","title":"台州福利社","type":"2"}],"userPath":"/pages/sinova/livelist/city/city?areaCode=576","type":"1","title":"反诈小课堂开课啦！谨防新型疫情诈直播间","userId":"576","shareNum":"772","url":"http://app.v.zj.chinamobile.com/video/FZXKT-YQKDZP.mp4","shareWords":"反诈小课堂开课啦！谨防新型疫情诈骗！","isTop":2,"nad":"000400","AAAAAA":"200"},{"BBBBBB":"201","likesNum":"9820","userPhoto":"https://wap.zj.10086.cn/synchroNg/images/14644457067489245.png","CCCCCC":"1407","sharePhoto":"https://wap.zj.10086.cn/synchroNg/images/2022/05/11/Y5G.jpg","coverPhoto":"https://wap.zj.10086.cn/synchroNg/images/2022/05/11/Y5G.jpg","visitNum":"9.0w","goodsList":[{"goodsPhoto":"https://wap.zj.10086.cn/synchroNg/images/2022/05/11/GCK.jpg","goodsUrl":"/sinova_sub/pages/midpage/midpage?channelid=1&versionid=7.0.1&goodsId=4fac95790a6b436181d043b6be9dba66&action=1&url=https%3A%2F%2Fwap.zj.10086.cn%2Fai%2Fmshop%2Fdwz%2FHyDQO7t837","goodsId":"000040","price":0,"appId":"wxea7759afc7853c05","showType":"1","details":"","title":"流量礼包","type":"2"}],"userPath":"/pages/sinova/livelist/city/city?areaCode=577","type":"1","title":"用5G 更畅快","userName":"温州移动直播间","shareNum":"862","url":"http://app.v.zj.chinamobile.com/video/Y5G.mp4","shareWords":"用5G 更畅快","isTop":2,"name":"用5G 更畅快","id":"000408","AAAAAA":"603"},{"BBBBBB"likesNum":"8319","userPhoto":"https://wap.zj.10086.cn/synchroNg/images/2020/dszbjtxtaizhou.png","CCCCCC":"800","sharePhoto":"https://wap.zj.10086.cn/synchroNg/images/2022/05/7/YDZSXKTLLQDKQSYBF.jpg","coverPhoto":"https://wap.zj.10086.cn/synchroNg/images/2022/05/7/YDZSXKTLLQDKQSYBF.jpg","visitNum":"8.6w","goodsList":[{"goodsPhoto":"https://wap.zj.10086.cn/synchroNg/images/2022/05/7/TZFLS.png","goodsUrl":"/pages/sinova/yiwebview/index?src=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FCgqGL_v2XqckNIkaRsRjJA","goodsId":"000039","price":0,"appId":"wxea7759afc7853c05","showType":"1","details":"","title":"台州福利社","type":"2"}],"userPath":"/pages/sinova/livelist/city/city?area576","type":"1","title":"移动知识小课堂来咯！教你如何正确使用流量券、抵扣券","userName":"台州移动直播间","userId":"576","shareNum":"646","url":"http://app.v.zj.chinamob.MP4","shareWords":"移动知识小课堂来咯！教你如何正确使用流量券、抵扣券","isTop":2,"name":"移动知识小课堂-流量券、抵扣券使用办法","id":"000402","AAAAAA":"267"},{"BBBBBB"://wap.zj.10086.cn/synchroNg/images/2470031603547938.png","CCCCCC":"835","sharePhoto":"https://wap.zj.10086.cn/synchroNg/images/2022/05/5/RHKSCXHSCYD.png","coverPhoto":"https://wap.zj.10086.cn/synchroNg/images/2022/05/5/RHKSCXHSCYD.png","visitNum":"8.2w","goodsList":[],"userPath":"/pages/sinova/livelist/starDetail/starDetail?starId=S1090","type":"1","title":"无论您在浙江哪里，这样做，就可以查到离您最近最空的核酸采样点。","userName":"秒懂百科","userId":"S1090","shareNum":"594","url":"http://app.v.zj.p4","shareWords":"无论您在浙江哪里，这样做，就可以查到离您最近最空的核酸采样点。","isTop":2,"name":"如何快速查询核酸采样点","id":"000395","AAAAAA":"278"},{"BBBBBB":"143ap.zj.10086.cn/synchroNg/images/2469996147579744.png","CCCCCC":"1000","sharePhoto":"https://wap.zj.10086.cn/synchroNg/images/2022/05/07/ZGYDMQJ.jpg","coverPhoto":"https://wap.zj.10086.cn/synchroNg/images/2022/05/07/ZGYDMQJ.jpg","visitNum":"8.0w","goodsList":[],"userPath":"/pages/sinova/livelist/starDetail/starDetail?starId=S1089","type":"1","title":"妈妈这个词，只是叫一叫，也能触动心弦。","userName":"心级服务","userId":"S1089","shareNum":"665","url":"http://app.v.zj.chinamobile.com/video/ZGYDMQJ.mp4是叫一叫，也能触动心弦。","isTop":2,"name":"中国移动母亲节","id":"000405","AAAAAA":"333"}]
//
// 进程已结束,退出代码0
const getVideoList = (user, num) => {
  const paramsString = user.paramsString
  axios.get(`/weixin/shortVideo/getVideoList?toPage=0&${paramsString}&queryType=2&num=${num}&sortType=3`).then(res => {
    const data = res.data
    if (data.errorCode === '901') {
      console.log(data.errorMsg);
    } else {
      const videoList = res.data.body.videoList
      console.log(`获取视频列表, 第${num}页, 列表长度：`, videoList.length)
      
      videoList.forEach(v => {
        queue.enqueue(() => videoData(user, v.id))
      })
      console.log(JSON.stringify(videoList.map(v => ({id: v.id, name: v.name}))));
    }
  })
}

const newLogin = (user) => {
  axios.get(`/ssoauth/NewLogin?code=021KbLFa1okQiD0CNHJa1jK39g3KbLFA&sc=11&spid=949a91f46a4d1da7016a90ea14e00002`).then(res => {
    console.log(res);
    console.log(JSON.stringify(res.headers));
  })
}

const miniAppManager = (user) => {
  axios.get(`/mobileStore/miniappsNew/miniAppManager.do?${user.paramsString}&version=2&businessIds=wx_bt00001%2Cwx_bt00002`).then(res => {
    console.log(res);
    console.log(JSON.stringify(res.headers));
  })
}

// Object.keys(Users).forEach(key=> {
//   const user = Users[key]
//   getVideoList(user, num)
// })


const user = Users.lzy

// miniAppManager(user)
// miniAppManager(user)
getVideoList(user, num)
// setVideoOpera()
