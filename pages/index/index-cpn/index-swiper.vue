<template>
	<view class="swiper-up">
		<view class="uni-margin-wrap">
			<swiper
				class="swiper"
				indicator-color="#fff"
				indicator-active-color="#00CC71"
				circular
				:indicator-dots="indicatorDots"
				:autoplay="autoplay"
				:interval="interval"
				:duration="duration"
			>
				<swiper-item class="swiper-item" style="background: url('../../../static/image/banner1.jpg') no-repeat center/cover"> </swiper-item>
				<swiper-item class="swiper-item" style="background: url('../../../static/image/banner1.jpg') no-repeat center/cover"> </swiper-item>
				<swiper-item class="swiper-item" style="background: url('../../../static/image/banner1.jpg') no-repeat center/cover"> </swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.swiper-up {
		width: 702rpx;
		height: 320rpx;
		.uni-margin-wrap {
			height: 100%;
			.swiper {
				height: 100%;
				.swiper-item {
					border-radius: 14rpx;
				}
			}
		}
	}
	.uni-margin-wrap {
		image {
			width: 100%;
			border-radius: 20rpx;
		}
	}
</style>
