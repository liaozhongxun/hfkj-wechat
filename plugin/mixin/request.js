// import $store from '@/store/index.js';
import { common } from '@/config'
export default (Vue) => {
	Vue.mixin({
		methods: {
			// 请求 返回promise
			request(options = {}) {
				// 组织参数
				options.url = common.baseUrl + options.url
				options.header = options.header || common.header
				options.data = options.data || common.data
				options.method = options.method || common.method
				options.dataType = options.dataType || common.dataType
				// options.token = options.token === true ? true : common.token

				// 请求
				return new Promise((res, rej) => {
					// 请求之前验证...
					// token验证

					let token = uni.getStorageSync('token')
					// 往header头中添加token
					if (token) options.header['X-Access-Token'] = token
					// 请求中...
					// console.log(options.header);
					uni.request({
						...options,
						success: (result) => {
							console.log(result)
							// 返回原始数据
							// if (options.native) return res(result)
							// 服务端失败
							// if (result.data.code == 401) {
							// 	// this.$fail('Token 令牌不合法!');
							// 	console.log('Token 令牌不合法!')
							// 	uni.removeStorageSync('token')
							// 	uni.reLaunch({
							// 		url: '/pages/index/index'
							// 	})
							// 	return rej('请先登录')
							// } else if (result.data.code == 402) {
							// 	uni.removeStorageSync('token')
							// 	this.$fail(result.data.message)
							// 	this.$store.commit('setState', true)
							// 	return rej(result.data)
							// } else if (result.data.code == 403) {
							// 	uni.removeStorageSync('token')
							// 	this.$fail(result.data.message)
							// 	this.$store.commit('setState', true)
							// 	return rej(result.data)
							// } else if (result.data.code == 405) {
							// 	// this.$store.commit('setPermission', false);
							// 	this.$fail('没有权限使用该功能')
							// 	return rej(result.data)
							// } else if (result.data.code == 500) {
							// 	this.$fail(result.data.message || '服务端失败')
							// 	return rej(result.data)
							// }
							// 其他验证...
							// 成功
							res(result.data.result)
						},
						fail: (error) => {
							uni.showToast({
								title: error.errMsg || '请求失败',
								icon: 'none'
							})
							return rej(error)
						}
					})
				})
			},
			// get请求
			$get(url, data = {}, options = {}) {
				options.url = url
				options.data = data
				options.method = 'GET'
				return this.request(options)
			},
			// post请求
			$post(url, data = {}, options = {}) {
				console.log(options)
				options.url = url
				options.data = data
				options.method = 'POST'
				return this.request(options)
			},
			// put请求
			$put(url, data = {}, options = {}) {
				options.url = url
				options.data = data
				options.method = 'PUT'
				return this.request(options)
			},
			// delete请求
			$del(url, data = {}, options = {}) {
				options.url = url
				options.data = data
				options.header = {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
				options.method = 'DELETE'
				return this.request(options)
			},
			// 上传文件
			$upload(url, data, onProgress = false) {
				return new Promise((resolve, reject) => {
					// 上传
					const uploadTask = uni.uploadFile({
						url: common.baseUrl + url,
						filePath: data.filePath,
						name: data.name || 'file',
						formData: data.formData || {
							file: ''
						},
						success: (res) => {
							if (res.statusCode !== 200) {
								resolve(false)
								return this.$fail('上传失败')
							}
							let { result } = JSON.parse(res.data)
							resolve(result)
						},
						fail: (err) => {
							console.log(err)
							reject(err)
						}
					})

					uploadTask.onProgressUpdate((res) => {
						if (typeof onProgress === 'function') {
							onProgress(res.progress)
						}
					})
				})
			}
		}
	})
}
