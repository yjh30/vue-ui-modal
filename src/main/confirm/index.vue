<template>
    <div class="modal-component flex-center">
        <transition name="modal" :appear="true">
            <div class="modal-dialog">
                <div class="modal-title">提示</div>
                <div class="modal-body">{{msg}}</div>
                <div class="modal-footer flex">
                    <div class="btn cancel-btn" v-on:click="cancel">{{leftButtonText}}</div>
                    <div class="btn ok-btn" v-on:click="ok">{{rightButtonText}}</div>
                </div>
            </div>  
        </transition>
    </div>
</template>

<script>
    export default {
        props: {
            msg: String,
            leftButtonText: String,
            rightButtonText: String
        },
        methods: {
            cancel: function() {
                setTimeout(() => {
                    this.$emit('dismiss', 'cancel');
                }, 200);
            },
            ok: function() {
                setTimeout(() => {
                    this.$emit('dismiss', 'ok');
                }, 200);
            }
        }
    }
</script>
