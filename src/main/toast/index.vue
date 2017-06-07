<template>
    <div class="modal-component toast-component flex-center">
        <transition name="modal" :appear="true" @after-leave="afterLeave">
            <div class="toast-msg">{{msg}}</div>
        </transition>
    </div>
</template>

<script>
    import './index.scss';
    export default {
        mounted() {
            if (this.autoDismiss) {
                setTimeout(() => {
                    this.$emit('dismiss');
                }, this.dismissTimeout);
            }
        },
        props: {
            msg: String,
            autoDismiss: Boolean,
            dismissTimeout: Number
        },
        methods: {
            afterLeave() {
                this.$emit('dismiss');
            }
        }
    }
</script>
