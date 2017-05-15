<template>
    <div class="modal-component flex-center">
        <transition name="modal" :appear="true">
            <div class="modal-dialog">
                <div class="modal-title">提示</div>
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
            msg: String,
            buttonText: String
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
