<template>
	<view class="login-page page">
		<view class="content">养老商城</view>
		<van-button class="quick-login" block type="danger" @tap="userLogin" :disabled="!checked"
			>微信用户快捷登录</van-button
		>
		<view class="protocol animate__animated" :class="{ animate__bounceIn: hintUser }">
			<van-checkbox class="checkbox" :value="checked" @change="onChange" icon-size="30rpx"></van-checkbox>
			<text @click="onChange">点击登录即表示您同意</text>
			<navigator class="protocol-book" @click="$go('/pages/document/login-protocol')">{{ protocol }}</navigator>
		</view>
		<van-notify id="van-notify" />
	</view>
</template>

<script>
	import { authLogin, getOpenId } from '../../utils/wechat.js'

	export default {
		data() {
			return {
				protocol: '《用户服务协议》',
				openId: '',
				sessionKey: '',
				checked: false,
				hintUser: false
			}
		},
		onLoad() {},
		methods: {
			onChange() {
				this.checked = !this.checked
			},
			async userLogin() {
				if (!this.checked) {
					// this.$notify({ type: 'warning', message: '请勾选用户协议' })
					this.hintUser = true
					setTimeout(() => {
						this.hintUser = false
					}, 2000)
					return
				}

				// 跳过登录操作跳转
				this.$go('/pages/index/index')
				return

				let code = await authLogin()
				let cts = await getOpenId(code)
				if (cts) {
					this.openId = cts.data.openid
					this.sessionKey = cts.data.session_key
				}
				console.log(code, 333)
				console.log(cts, 444)
			},
			decryptPhoneNumber(e) {
				// getPhoneNumber:fail no permission 需要微信认证
				console.log(e.detail.errMsg) // 判断是否运行获取手机号
				console.log(this.sessionKey)
				let pc = new WXBizDataCrypt('wx3ffcef9fc255b0bc', this.sessionKey)
				let data = pc.decryptData(e.detail.encryptedData, e.detail.iv)
				console.log(data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-page {
		display: flex;
		flex-direction: column;
		padding: 40rpx;
		background: #fff;
		.content {
			height: 500rpx;
			width: 100%;
			text-align: center;
			line-height: 500rpx;
			font-weight: bold;
			font-size: 20px;
		}
		button {
			width: 100%;
		}
		.protocol {
			color: #777;
			margin-top: 40rpx;
			display: flex;
			font-size: 28rpx;
			.protocol-book {
				font-size: 26rpx;
				color: rgb(50, 113, 247);
				font-weight: bold;
			}
			.checkbox {
				position: relative;
				top: 6rpx;
				left: 4rpx;
				// margin-right: 6rpx;
			}
		}
	}
</style>
