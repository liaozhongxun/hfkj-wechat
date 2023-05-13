<template>
	<view class="index-page page">
		<HomeSearch class="search" v-if="reloadCpn"></HomeSearch>
		<view class="top-swiperbtntype">
			<HomeSwiper1 class="top-swiper"></HomeSwiper1>
		</view>
	</view>
</template>

<script>
	import HomeSearch from './index-cpn/index-search.vue'
	import HomeSwiper1 from './index-cpn/index-swiper.vue'
	export default {
		data() {
			return {
				reloadCpn: false
			}
		},
		components: {
			HomeSearch,
			HomeSwiper1
		},
		onLoad() {},
		onShow() {
			this.reloadCpn = true
		},
		onHide() {
			this.reloadCpn = false
		},
		methods: {},
		mounted() {
			console.log('fsfsf99', this.activeCentre)
			// this.activeCentre = uni.getStorage('activeCentre') || '定位中心'
			console.log('fsfsf99', this.activeCentre)
		}
	}
</script>

<style lang="scss" scoped>
	.top-swiperbtntype {
		width: 100%;
		padding: 24rpx;
		background-color: #fff;
		box-sizing: border-box;
	}
</style>
