export default (Vue) => {
	Vue.mixin({
		methods: {
			$go(url, params = '') {
				uni.navigateTo({
					url: params ? `${url}?${params}` : url,
					fail: (e) =>
						uni.switchTab({
							url
						})
				})
			},
			$back() {
				uni.navigateBack({
					fail: (e) => {
						uni.switchTab({
							url: '/pages/index/index'
						})
					}
				})
			},
			$home() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	})
}
