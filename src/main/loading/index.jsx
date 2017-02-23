import Vue from 'vue';
import loading from './index.vue';

var cacheLoading;

export default function() {
    if (cacheLoading) {
        cacheLoading.status = 0;
    }

    var el = document.createElement('div');
    document.body.appendChild(el);

    cacheLoading = new Vue({
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
            loading: loading
        },
        /*eslint no-unused-vars: "off"*/
        render(h) {
            var self = this;
            var options = {};

            options.on = {
                dismiss: function(val) {
                    self.status = val;
                }
            };

            if (this.status) {
                return (
                    <loading {...options}></loading>
                )
            }
        }
    });

    return cacheLoading;
}
