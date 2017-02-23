import Vue from 'vue';
import confirm from './index.vue';

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
        if (!config.msg) {
            reject('no confirm msg');
            return;
        }

        new Vue({
            el: el,
            data: function() {
                return {
                    status: 1,
                    dismissType: ''
                }
            },
            watch: {
                status: function(val) {
                    if (val === 0) {
                        document.body.removeChild(this.$el);
                        if (this.dismissType === 'ok') {
                            resolve();
                        } else if (this.dismissType === 'cancel') {
                            reject();
                        }
                    }
                }
            },
            components: {
                confirm: confirm
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
                    dismiss: function(val, dismissType) {
                        self.status = val;
                        self.dismissType = dismissType;
                    }
                };
                if (this.status) {
                    return (
                        <confirm {...options}></confirm>
                    )
                }
            }
        });
    });
}
