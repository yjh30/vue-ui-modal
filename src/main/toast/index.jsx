import Vue from 'vue';
import toast from './index.vue';

let lastVm;
const _toString = Object.prototype.toString;

export default arg => {
    if (typeof arg === 'undefined') {
        console.warn('vue-ui-modal toast parameter not provided');
        return;
    }
    if (lastVm && lastVm.status === 1) {
        lastVm.destroy();
    }

    let options = {};
    options.props = {};
    const argType = _toString.call(arg).split(' ')[1].replace(']', '').toLowerCase();

    if (argType === 'object') {
        options.props = arg;
    } else if (argType === 'string') {
        options.props.msg = arg;
        options.props.dismissTimeout = 2000;
        options.props.autoDismiss = true;
    } else {
        console.warn('vue-ui-modal toast parameter is invalid');
        return;
    }

    const el = document.createElement('div');
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
            toast: toast
        },
        /*eslint no-unused-vars: "off"*/
        render(h) {
            options.on = {
                dismiss: this.destroy
            };
            if (this.status) {
                return (
                    <toast {...options}></toast>
                )
            }
        }
    });

    return lastVm;
}
