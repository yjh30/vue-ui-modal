import Vue from 'vue';
import prompt from './index.vue';

export default function(msg) {
    var config = {};
    var options = {
        props: {}
    };

    var el = document.createElement('div');
    document.body.appendChild(el);

    if (typeof msg === 'object') {
        config = msg;
    } else {
        config.msg = msg;
    }

    return new Promise((resolve, reject) => {
        var utils = this;

        if (!config.msg) {
            reject('no prompt msg');
            return;
        }

        new Vue({
            el: el,
            data: function() {
                return {
                    status: 1,
                    dismissType: '',
                    answer: ''
                }
            },
            watch: {
                status: function(val) {
                    if (val === 0) {
                        document.body.removeChild(this.$el);
                        if (this.dismissType === 'ok') {
                            resolve(this.answer);
                        } else if (this.dismissType === 'cancel') {
                            reject();
                        }
                    }
                }
            },
            components: {
                prompt: prompt
            },

            /*eslint no-unused-vars: "off"*/
            render(h) {
                var self = this;
                options.props.msg = config.msg;

                if (config.leftButtonText) {
                    options.props.leftButtonText = config.leftButtonText;
                }

                if (config.rightButtonText) {
                    options.props.rightButtonText = config.rightButtonText;
                }

                options.on = {
                    dismiss: function(status, dismissType, answer) {
                        self.status = status;
                        self.dismissType = dismissType;
                        self.answer = answer;
                    }
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
