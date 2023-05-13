<template>
	<view class="mine-page page">
		<view class="userinfo"></view>
		<view class="order-status"></view>
		<view class="menuitem">
			<van-cell title="设置" is-link />
			<van-cell title="收货地址" is-link @click="$go('/pages/address/address')" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '首页'
			}
		},
		onLoad() {},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.userinfo {
		background: #fff;
		margin-bottom: 20rpx;
		height: 336rpx;
	}
	.order-status {
		background-color: #fff;
		height: 254rpx;
		margin-bottom: 20rpx;
	}
	.menuitem {
	}
</style>
