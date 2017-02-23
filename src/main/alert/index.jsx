import Vue from 'vue';
import alert from './index.vue';

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
            reject('no alert msg');
            return;
        }

        new Vue({
            el: el,
            data: function() {
                return {
                    status: 1
                }
            },
            watch: {
                status: function(val) {
                    if (val === 0) {
                        document.body.removeChild(this.$el);
                        resolve();
                    }
                }
            },
            components: {
                alert: alert
            },
            /*eslint no-unused-vars: "off"*/
            render(h) {
                var self = this;

                options.props.msg = config.msg;

                if (config.buttonText) {
                    options.props.buttonText = config.buttonText;
                }

                options.on = {
                    dismiss: function(val) {
                        self.status = val;
                    }
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
