<script>
	export default {
		onLaunch: function () {
			console.log('App Launch')
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import 'animate.css';
	@import './common/style/global.css';
	/*每个页面公共css */
	.hfkj-cell {
		width: 100%;
		background-color: #fff;
		height: 88rpx;
		display: flex;
		line-height: 88rpx;
		padding: 0 40rpx;
		.title {
			// width: 180rpx;
			color: #999;
		}
		.value {
			flex: 1;
			overflow: hidden;
		}
		.hanldbtn {
			width: 200rpx;
			color: #027db4;
		}
	}
</style>
