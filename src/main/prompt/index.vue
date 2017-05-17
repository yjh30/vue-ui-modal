<template>
    <div class="modal-component flex-center">
        <transition name="modal" :appear="true">
            <div class="modal-dialog">
                <div class="modal-title" v-if="!hideTitle">{{title}}</div>
                <div class="modal-body">
                    <div>{{msg}}</div>
                    <div>
                        <input class="prompt-input" type="text" v-model="submitInfo">
                    </div>
                </div>
                <div class="modal-footer flex">
                    <div class="btn cancel-btn" @click="cancel">{{leftButtonText}}</div>
                    <div class="btn ok-btn" @click="ok">{{rightButtonText}}</div>
                </div>
            </div>
        </transition>
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
            hideTitle: {
                type: Boolean,
                default: false
            },
            title: String,
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
                if (this.submitInfo === '') {
                    return toast(`请先填写${this.rightButtonText}信息`);
                }
                setTimeout(() => {
                    this.$emit('dismiss', 'ok', this.submitInfo);
                }, 200);
            }
        }
    }
</script>

