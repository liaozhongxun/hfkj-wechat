<template>
	<view class="home-search">
		<view class="location" @click="$go('/pages/position/position')">
			{{ activeCentre }}
			<van-icon class="arrow-down" name="arrow-down" />
		</view>
		<view class="search">
			<van-search class="vsearch" disabled shape="round" placeholder="请输入商品/店铺/地点" />
		</view>
		<view class="scan">
			<van-icon class="van-icon" name="scan" size="60rpx" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				activeCentre: ''
			}
		},

		methods: {},
		created() {
			this.activeCentre = uni.getStorageSync('activeCentre') || '定位中心'
		}
	}
</script>

<style lang="scss" scoped>
	.home-search {
		width: 100%;
		background: #fff;
		height: 100rpx;
		display: flex;
		line-height: 100rpx;
		.location {
			width: 200rpx;
			text-align: center;
			height: 44rpx;
			font-size: 32rpx;
			font-weight: 400;
			color: #333333;
			position: relative;
			.arrow-down {
				position: absolute;
				right: -10rpx;
				top: 36rpx;
				font-weight: bold;
			}
		}
		.search {
			flex: 1;
			.vsearch {
				height: 100%;
				/deep/ > view {
					height: 100%;
					padding: 8rpx 18rpx;
					.van-search__content {
						height: 100%;
					}
				}
			}
		}
		.scan {
			width: 88rpx;
			.van-icon {
				width: 88rpx;
				height: 100rpx;
				text-align: left;
				line-height: 100rpx;
				color: #333;
			}
		}
	}
</style>
