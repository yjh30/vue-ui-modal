<template>
    <div class="modal-component toast-component flex-center">
        <transition name="toast" v-on:after-leave="afterLeave">
            <div class="toast-msg" v-if="status">{{msg}}</div>
        </transition>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                status: 0
            }
        },
        mounted: function() {
            this.status = 1;
            if (this.autoDestroy) {
                setTimeout(() => {
                    this.status = 0;
                }, this.showDurationTimeout);
            }
        },
        props: {
            msg: String,
            autoDestroy: Boolean,
            showDurationTimeout: Number,
            stopEnterEffect: Boolean
        },
        methods: {
            afterLeave: function() {
                this.$emit('dismiss', 0);
            }
        }
    }
</script>

<style lang="sass">
    .toast-component {
        background-color: transparent!important;
        pointer-events: none;

        .toast-msg {
            max-width: px2rem(320);
            line-height: 1.5;
            padding: 10px 20px;
            color: #FFF;
            font-size: 14px;
            background-color: rgba(0,0,0,0.8);
            border-radius: 3px;
        }
    }

    @keyframes toastIn {
        0% {
            transform: translate3d(0, 20%, 0);
        }
        100% {
            transform: translate3d(0, 0, 0);
        }
    }
    @keyframes toastOut {
        0% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }
        100% {
            opacity: 0;
            transform: translate3d(0, -100%, 0);
        }
    }

    .toast-enter-active {
        animation: toastIn 0.3s both;
    }
    .toast-leave-active {
        animation: toastOut 0.3s both;
    }

</style>