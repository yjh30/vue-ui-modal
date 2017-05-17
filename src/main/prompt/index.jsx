import Vue from 'vue';
import prompt from './index.vue';
import { getNativeTypeOf } from '../utils';

export default msg => {
    if (!msg) {
        return Promise.reject('no prompt msg');
    }

    let options = {};
    options.props = {
        hideTitle: false,
        title: '提示',
        leftButtonText: '取消',
        rightButtonText: '确定'
    };

    if (getNativeTypeOf(msg) === 'object') {
        if (msg.msg) {
            options.props.msg = msg.msg;
        } else {
            return Promise.reject('no prompt msg');
        }
        options.props.hideTitle = msg.hideTitle || options.props.hideTitle;
        options.props.title = msg.title || options.props.title;
        options.props.leftButtonText = msg.leftButtonText || options.props.leftButtonText;
        options.props.rightButtonText = msg.rightButtonText || options.props.rightButtonText;
    } else {
        options.props.msg = msg;
    }

    return new Promise((resolve, reject) => {
        const el = document.createElement('div');
        document.body.appendChild(el);

        new Vue({
            el: el,
            data() {
                return {
                    status: 1
                }
            },
            methods: {
                dismiss(dismissType, answer) {
                    this.status = 0;
                    document.body.removeChild(this.$el);
                    if (dismissType === 'ok') {
                        resolve(answer);
                    } else if (dismissType === 'cancel') {
                        reject();
                    }
                }
            },
            components: {
                prompt: prompt
            },

            /*eslint no-unused-vars: "off"*/
            render(h) {
                options.on = {
                    dismiss: this.dismiss
                };
                if (this.status) {
                    return (
                        <prompt {...options}></prompt>
                    )
                }
            }
        });
    });
}
