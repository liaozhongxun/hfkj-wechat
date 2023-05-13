<template>
	<view class="from-address">
		<van-cell-group>
			<van-field size="large" title-width="140rpx" label="收 货 人" :value="username" placeholder="请输入收货人姓名" />
			<van-field size="large" title-width="140rpx" label="联系电话" :value="username" placeholder="请输入联系电话" />
			<van-cell size="large" is-link @click="selectCity">
				<view slot="title">
					<view class="van-cell-text"
						>所在地区
						<text class="citynote"> {{ sityval }}</text>
					</view>
				</view>
			</van-cell>
			<van-field
				size="large"
				title-width="140rpx"
				label="联系地址"
				:value="username"
				placeholder="请输入联系地址"
				type="textarea"
				:autosize="{ maxHeight: 60, minHeight: 60 }"
			/>
			<van-cell size="large">
				<view slot="title" class="set-default">
					<view class="van-cell-text"
						>默认地址
						<van-switch class="van-switch" :checked="isDefault" size="50rpx" active-color="#00D068" @change="changeDefaultState" />
					</view>
				</view>
			</van-cell>
		</van-cell-group>
		<view class="save-warp">
			<van-button class="save-btn" type="primary" block>保 存</van-button>
		</view>
		<van-popup :show="showPopup" position="bottom" custom-style="height: 60%;" @close="showPopup = false" @click-overlay="showPopup = false">
			<van-area :area-list="areaList" @cancel="selectFail" @confirm="selectSuccess" />
		</van-popup>
	</view>
</template>

<script>
	import { areaList } from '../../../utils/city'
	export default {
		data() {
			return {
				addressId: '',
				username: '',
				isDefault: false,
				sityval: '省、市、区',
				citycode: '',
				areaList: {},
				showPopup: false
			}
		},
		onLoad(data) {
			if (data) {
				this.addressId = data.id

				uni.setNavigationBarTitle({
					title: data.id ? '编辑地址' : '新增地址'
				})
			}
			this.areaList = areaList
			console.log(this.areaList, 45646)
		},
		methods: {
			selectCity() {
				this.showPopup = true
			},
			onClose() {},
			changeDefaultState() {
				this.isDefault = !this.isDefault
			},
			selectSuccess(e) {
				console.log(e.target.values)
				if (e.target.values.includes(undefined)) {
					console.log('请选择市区')
				} else {
					this.showPopup = false
					let res = e.target.values.reduce((a, b) => {
						a.push(b.name)
						return a
					}, [])
					this.sityval = res.join('/')
				}
			},
			selectFail() {
				this.showPopup = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.citynote {
		margin-left: 40rpx;
		color: #cacbce;
	}
	.set-default {
		position: relative;
		.van-switch {
			position: absolute;
			left: 170rpx;
		}
	}
	.save-warp {
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		margin-top: 50rpx;
		.save-btn {
			/deep/ button {
				background: linear-gradient(90deg, #17d2bd 0%, #00cc71 100%);
				border-color: #fff;
				border-radius: 16rpx;
			}
		}
	}
</style>
