import Vue from 'vue';
import prompt from './index.vue';

export default msg => {
    if (!msg) {
        return Promise.reject('no prompt msg');
    }

    let options = {};
    options.props = {};

    if (typeof msg === 'object') {
        if (msg.msg) {
            options.props.msg = msg.msg;
        } else {
            return Promise.reject('no prompt msg');
        }
        options.props.leftButtonText = msg.leftButtonText || '取消';
        options.props.rightButtonText = msg.rightButtonText || '确定';
    } else {
        options.props.msg = msg;
        options.props.leftButtonText = '取消';
        options.props.rightButtonText = '确定';
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
