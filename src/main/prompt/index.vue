<template>
    <div class="modal-component flex-center">
        <div class="modal-dialog">
            <div class="modal-title">提示</div>
            <div class="modal-body">
                <div>{{msg}}</div>
                <div>
                    <input class="prompt-input" type="text" v-model="submitInfo">
                </div>
            </div>
            <div class="modal-footer flex">
                <div class="btn cancel-btn" v-on:click="cancel">{{leftButtonText}}</div>
                <div class="btn ok-btn" v-on:click="ok">{{rightButtonText}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import toast from '../toast/index.jsx';

    export default {
        data: function() {
            return {
                submitInfo: ''
            }
        },
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
                if (!this.submitInfo) {
                    return toast(`请先填写${this.rightButtonText}信息`);
                }
                this.$emit('dismiss', 0, 'ok', this.submitInfo);
            }
        }
    }
</script>