import router from './router'
// import message from './message'
import request from './request'
export default (Vue) => {
	router(Vue)
	// message(Vue)
	request(Vue)
}
