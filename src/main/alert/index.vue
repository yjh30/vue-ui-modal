<template>
    <div class="modal-component flex-center">
        <transition name="modal" :appear="true">
            <div :class="['modal-dialog', className]">
                <div class="modal-title" v-if="!hideTitle">{{title}}</div>
                <div class="modal-body">{{msg}}</div>
                <div class="modal-footer flex">
                    <div class="btn ok-btn" @click="ok">{{buttonText}}</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: {
            hideTitle: {
                type: Boolean,
                default: false
            },
            title: String,
            msg: String,
            buttonText: String,
            className: String
        },
        methods: {
            ok: function() {
                setTimeout(() => {
                    this.$emit('dismiss');
                }, 200);
            }
        }
    }
</script>
