// import extendVue from './utils';
import installMixins from './mixin'
// import installFilters from './filter';
// import installDirectives from './directive';
const plugin = {
	install(Vue) {
		// extendVue(Vue)
		installMixins(Vue)
		// installDirectives(Vue)
		// installFilters(Vue)
	}
}
export default plugin
