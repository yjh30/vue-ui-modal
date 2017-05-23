import Vue from 'vue';
import alert from './index.vue';
import { getNativeTypeOf } from '../utils';

export default msg => {
    if (!msg) {
        return Promise.reject('no alert msg');
    }

    let options = {};
    options.props = {
        hideTitle: false,
        title: '提示',
        buttonText: '确定',
        className: ''
    };

    if (getNativeTypeOf(msg) === 'object') {
        if (msg.msg) {
            options.props.msg = msg.msg;
        } else {
            return Promise.reject('no alert msg');
        }
        options.props.hideTitle = msg.hideTitle || options.props.hideTitle;
        options.props.title = msg.title || options.props.title;
        options.props.buttonText = msg.buttonText || options.props.buttonText;
        options.props.className = msg.className || options.props.className;
    } else {
        options.props.msg = msg;
    }

    return new Promise(resolve => {
        const el = document.createElement('div');
        document.body.appendChild(el);

        new Vue({
            el: el,
            data() {
                return {
                    status: 1
                }
            },
            components: {
                alert: alert
            },
            methods: {
                dismiss() {
                    this.status = 0;
                    document.body.removeChild(this.$el);
                    resolve();
                }
            },
            /*eslint no-unused-vars: "off"*/
            render(h) {
                options.on = {
                    dismiss: this.dismiss
                };
                if (this.status) {
                    return (
                        <alert {...options}></alert>
                    )
                }
            }
        });
    });
}
