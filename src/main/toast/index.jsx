import Vue from 'vue';
import toast from './index.vue';

var cacheToast;

export default function(...args) {
    if (cacheToast) {
        cacheToast.status = 0;
    }

    var msg = args[0];
    var autoDestroy = args[1];
    var showDurationTimeout = args[2];

    if (typeof autoDestroy === 'number') {
        showDurationTimeout = autoDestroy;
        autoDestroy = true;
    } else {
        if (typeof autoDestroy !== 'boolean') {
            autoDestroy = true;
        }
        if (typeof showDurationTimeout !== 'number') {
            showDurationTimeout = 2000;
        }
    }

    var el = document.createElement('div');
    document.body.appendChild(el);

    if (!msg) return;

    cacheToast = new Vue({
        el: el,
        data: function() {
            return {
                status: 1
            }
        },
        methods: {
            destroy: function() {
                this.status = 0;
            }
        },
        watch: {
            status: function(val) {
                if (val === 0) {
                    document.body.removeChild(this.$el);
                }
            }
        },
        components: {
            toast: toast
        },
        /*eslint no-unused-vars: "off"*/
        render(h) {
            var self = this;
            var options = {
                props: {}
            };

            options.props.msg = msg;
            options.props.autoDestroy = autoDestroy;
            options.props.showDurationTimeout = showDurationTimeout;

            options.on = {
                dismiss: function(val) {
                    self.status = val;
                }
            };

            if (this.status) {
                return (
                    <toast {...options}></toast>
                )
            }
        }
    });

    return cacheToast;
}
