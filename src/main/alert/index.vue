<template>
    <div class="modal-component flex-center">
        <div class="modal-dialog">
            <div class="modal-title">提示</div>
            <div class="modal-body">{{msg}}</div>
            <div class="modal-footer flex">
                <div class="btn ok-btn" v-on:click="ok">{{buttonText}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            msg: String,
            buttonText: {
                type: String,
                default: '确定'
            }
        },
        methods: {
            ok: function() {
                this.$emit('dismiss', 0);
            }
        }
    }
</script>