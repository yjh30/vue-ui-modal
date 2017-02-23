<template>
    <div class="modal-component flex-center">
        <div class="modal-dialog">
            <div class="modal-title">提示</div>
            <div class="modal-body">{{msg}}</div>
            <div class="modal-footer flex">
                <div class="btn cancel-btn" v-on:click="cancel">{{leftButtonText}}</div>
                <div class="btn ok-btn" v-on:click="ok">{{rightButtonText}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            msg: String,
            leftButtonText: {
                type: String,
                default: '取消'
            },
            rightButtonText: {
                type: String,
                default: '确定'
            }
        },
        methods: {
            cancel: function() {
                this.$emit('dismiss', 0, 'cancel');
            },
            ok: function() {
                this.$emit('dismiss', 0, 'ok');
            }
        }
    }
</script>