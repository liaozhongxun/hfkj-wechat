<template>
	<view class="position-page page">
		<van-cell size="large" :title="city" icon="location-o" @click="selectCity" is-link> </van-cell>
		<view class="hfkj-cell">
			<view class="title">当前定位：</view>
			<view class="value">{{ activeCentre }}</view>
			<view class="hanldbtn" @tap="getLocation">重新获取</view>
		</view>

		<view class="select-othre">
			<text class="title">选择其他服务中心：</text>
			<view class="selectList">
				<view class="item" v-for="(item, index) in centerList" :key="index" @click="changeCenter(item)">
					{{ item }}
				</view>
			</view>
		</view>

		<van-popup :show="showPopup" position="bottom" custom-style="height: 60%;" @close="showPopup = false" @click-overlay="showPopup = false">
			<van-area :area-list="areaList" @cancel="selectFail" @confirm="selectSuccess" :columns-num="2" />
		</van-popup>
	</view>
</template>

<script>
	import { areaList } from '../../utils/city'
	export default {
		data() {
			return {
				city: '福州',
				areaList: {},
				showPopup: false,
				activeCentre: '仓山中心',
				centerList: ['仓山中心1', '仓山中心2', '仓山中心3', '仓山中心4'],
				type: ''
			}
		},
		onLoad() {},
		methods: {
			selectCity() {
				this.showPopup = true
			},
			selectSuccess(e) {
				console.log(e.target.values)
				if (e.target.values.includes(undefined)) {
					console.log('请选择市区')
				} else {
					this.showPopup = false
					let nameList = e.target.values.reduce((a, b) => {
						a.push(b.name)
						return a
					}, [])

					this.city = nameList.join('/')
				}
			},
			selectFail() {
				this.showPopup = false
			},
			changeCenter(item) {
				this.activeCentre = item
				uni.setStorageSync('activeCentre', this.activeCentre)
				this.$home('/pages/index/index')
			},

			getSetting: function () {
				return new Promise((resolve, reject) => {
					uni.getSetting({
						success: (res) => {
							if (res.authSetting['scope.userLocation'] === undefined) {
								resolve(0)
								return
							}
							if (res.authSetting['scope.userLocation']) {
								resolve(1)
							} else {
								resolve(2)
							}
						}
					})
				})
			},
			async getLocation() {
				let status = await this.getSetting()
				if (status === 2) {
					console.log('无法定位')
					return
				}

				// this.doGetLocation() // 获取经纬度
				this.doSelectLocation() // 选择位置
			},
			doSelectLocation() {
				wx.chooseLocation({
					success: function (res) {
						console.log(res)
					},
					fail: function () {},
					complete: function () {}
				})
			},
			doGetLocation() {
				uni.getLocation({
					success: (res) => {
						console.log(res.longitude, res.latitude)
					},
					fail: (err) => {
						// #ifdef MP-BAIDU
						if (err.errCode === 202 || err.errCode === 10003) {
							// 202模拟器 10003真机 user deny
							this.showConfirm()
						}
						// #endif
						// #ifndef MP-BAIDU
						if (err.errMsg.indexOf('auth deny') >= 0) {
							uni.showToast({
								title: '访问位置被拒绝'
							})
						} else {
							uni.showToast({
								title: err.errMsg
							})
						}
						// #endif
					}
				})
			}
		},
		mounted() {
			this.areaList = areaList
			this.activeCentre = uni.getStorageSync('activeCentre')
		}
	}
</script>

<style lang="scss" scoped>
	.custom-icon {
		margin-left: 40rpx;
	}
	.hfkj-cell {
		margin-top: 10rpx;
	}
	.select-othre {
		min-height: 100rpx;
		background-color: #fff;
		padding: 40rpx;
		margin-top: 10rpx;
		.title {
			color: #999;
		}
		.selectList {
			margin-top: 20rpx;
			.item {
				text-align: center;
				line-height: 60rpx;
				&:active {
					background: #f2f2f2;
				}
			}
		}
	}
</style>
