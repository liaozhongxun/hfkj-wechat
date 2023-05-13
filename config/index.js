// 全局配置
export let common = {
	// baseUrl: process.env.NODE_ENV === 'development' ? 'http://192.168.3.54:8810/dev-api/app/' : 'https://scrm.huiheiot.com/prod-api/app/',
	baseUrl: 'https://scrm.huiheiot.com/prod-api/app/',
	// baseUrl: 'http://192.168.3.213:8810/dev-api/app/',
	// publicUrl: process.env.NODE_ENV === 'development' ? 'http://192.168.3.54:8810/dev-api/sys/common/static/' : 'https://scrm.huiheiot.com/prod-api/sys/common/static/',
	publicUrl: 'https://scrm.huiheiot.com/prod-api/sys/common/static/',
	header: {
		'Content-Type': 'application/json;charset=UTF-8'
	},
	data: {},
	method: 'GET',
	dataType: 'json',
	token: false
}

// https://vant-contrib.gitee.io/vant/#/zh-CN
// https://www.uviewui.com/
