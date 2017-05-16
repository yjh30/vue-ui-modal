import Vue from 'vue';
import fastclick from 'fastclick';
import example from './components/index.vue';

fastclick.attach(document.body);

new Vue({
	components: {
		example
	}
}).$mount('#app');