import Vue from 'vue';
import loading from './index.vue';

let lastVm;

export default msg => {
    if (lastVm && lastVm.status === 1) {
        lastVm.destroy();
    }

    var el = document.createElement('div');
    document.body.appendChild(el);

    lastVm = new Vue({
        el: el,
        data() {
            return {
                status: 1
            }
        },
        methods: {
            destroy() {
                this.status = 0;
                this.$el.parentNode.removeChild(this.$el);
            }
        },
        components: {
            loading: loading
        },
        /*eslint no-unused-vars: "off"*/
        render(h) {
            const options = {};
            options.on = {
                dismiss: this.destroy
            };

            options.props = {
                msg: msg || ''
            };

            if (this.status) {
                return (
                    <loading {...options}></loading>
                )
            }
        }
    });

    return lastVm;
}
