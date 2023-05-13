<template>
	<view class="address-page page">
		<view class="address-list">
			<view v-if="list.length > 0">
				<view class="item" v-for="item in list" :key="item.id">
					<view class="left-info">
						<view class="addres-info">{{ item.address }}</view>
						<view class="user-info">
							<text class="name">{{ item.name }}</text>
							<text class="tel">{{ item.tel | encrypt }}</text>
							<text class="default" v-if="item.default"> 默认 </text>
						</view>
					</view>
					<view class="editico clt" @click="$go('/pages/address/children-page/from', `id=${item.id}`)">
						<image src="@/static/image/address-edit.png"></image>
					</view>
				</view>
			</view>
			<van-empty v-else class="custom-image" :image="require('@/static/image/address-empty.png')" description="您还没有收获地址" />
		</view>
		<view class="add-warp">
			<van-button class="add-btn" type="primary" block @click="$go('/pages/address/children-page/from')">+新增地址</van-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chosenAddressId: '1',
				list: [
					{
						id: '1',
						name: '张三',
						tel: '13000000000',
						address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
						isDefault: true,
						default: true
					},
					{
						id: '2',
						name: '李四',
						tel: '18060849356',
						address: '浙江省杭州市拱墅区莫干山路 50 号'
					},
					{
						id: '3',
						name: '王五',
						tel: '17356565848',
						address: '浙江省杭州市滨江区江南大道 15 号'
					},
					{
						id: '4',
						name: '李四',
						tel: '18060849356',
						address: '浙江省杭州市拱墅区莫干山路 50 号'
					},
					{
						id: '5',
						name: '王五',
						tel: '17356565848',
						address: '浙江省杭州市滨江区江南大道 15 号'
					},
					{
						id: '6',
						name: '李四',
						tel: '18060849356',
						address: '浙江省杭州市拱墅区莫干山路 50 号'
					},
					{
						id: '7',
						name: '王五',
						tel: '17356565848',
						address: '浙江省杭州市滨江区江南大道 15 号'
					},
					{
						id: '8',
						name: '李四',
						tel: '18060849356',
						address: '浙江省杭州市拱墅区莫干山路 50 号'
					},
					{
						id: '9',
						name: '王五',
						tel: '17356565848',
						address: '浙江省杭州市滨江区江南大道 15 号'
					}
				]
			}
		},
		filters: {
			encrypt(val) {
				return val.replace(/(?<=\d{3})\d{4}(?=\d{4})/, '****')
			}
		},
		methods: {
			onAdd() {
				console.log('新增地址')
			},
			onEdit(item, index) {
				console.log('编辑地址:' + index)
			}
		},
		onLoad() {}
	}
</script>

<style lang="scss" scoped>
	.address-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.address-list {
		flex: 1;
		overflow: auto;
		.item {
			background: #fff;
			height: 144rpx;
			border-bottom: 1rpx solid #f2f2f2;
			padding: 20rpx 32rpx;
			box-sizing: border-box;
			// display: flex;
			position: relative;
			&:active {
				background-color: #f7f5f5;
			}
			.addres-info {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
				width: 520rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-bottom: 14rpx;
				position: relative;
			}
			.user-info {
				color: #999;
				width: 520rpx;
				.name {
					width: 120rpx;
					display: inline-block;
				}
				.tel {
					margin-right: 10px;
				}
				.default {
					color: #00cc72;
					font-size: 10px;
					border: 2px solid #00cc72;
					padding: 0 5rpx;
					border-radius: 6rpx;
					position: relative;
					top: -2px;
				}
			}
			.editico {
				width: 144rpx;
				height: 144rpx;
				position: absolute;
				top: 0;
				right: 0;

				image {
					width: 56rpx;
					height: 56rpx;
				}
			}
		}
		/deep/ .custom-image .van-empty__image {
			width: 480rpx;
			height: 480rpx;
		}
	}
	.add-warp {
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		.add-btn {
			font-weight: bold;
			font-size: 32rpx;
			letter-spacing: 3rpx;
			/deep/ button {
				background: linear-gradient(90deg, #17d2bd 0%, #00cc71 100%);
				border-color: #fff;
				border-radius: 16rpx;
			}
		}
	}
</style>
