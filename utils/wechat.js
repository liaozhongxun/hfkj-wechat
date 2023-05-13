// auth 授权登陆
const authLogin = (API) => {
	// console.log(API.API)
	return new Promise((resolve, reject) => {
		uni.login({
			provider: 'weixin',
			success: (res) => {
				resolve(res.code)
				// 发送 res.code 到后台换取 openId, sessionKey, unionId(多个微信平台才能获取)
			}
		})
	})
}

// 获取openId
const getOpenId = (resCode) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'https://api.weixin.qq.com/sns/jscode2session',
			method: 'GET',
			data: {
				// appid: 'wx123ebe8443095b8ce91',
				// secret: '',
				appid: 'wx3ffcef9fc255b0bc',
				secret: '35bf50967199180f4bd9545acf4d8300',
				js_code: resCode,
				grant_type: 'authorization_code'
			},
			success: (cts) => {
				resolve(cts)
				console.log(cts.data.openid) // 用户唯一表示
				console.log(cts.data.unionid) // 开放平台唯一标识，公众号和小程序同时登录过才会有
				console.log(cts.data.session_key) // 会话秘钥
			}
		})
	})
}

// 获取手机号
// const getPhoneNumber = (e) => {
// 	console.log(e.detail.errMsg) // 判断是否运行获取手机号
// 	let pc = new WXBizDataCrypt('appid', this.session_key)
// 	let data = pc.decryptData(e.detail.encryptedData, e.detail.iv)
// 	console.log(data)
// }

module.exports = {
	authLogin,
	getOpenId
}
