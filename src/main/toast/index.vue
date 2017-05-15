<template>
    <div class="modal-component toast-component flex-center">
        <transition name="modal" :appear="true" @after-leave="afterLeave">
            <div class="toast-msg">{{msg}}</div>
        </transition>
    </div>
</template>

<script>
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

<style lang="sass">
    .toast-component {
        background-color: transparent!important;
        pointer-events: none;

        .toast-msg {
            max-width: 320px;
            line-height: 1.5;
            padding: 12px 24px;
            color: #FFF;
            font-size: 14px;
            background-color: rgba(0,0,0,0.8);
            border-radius: 3px;
        }
    }
</style>