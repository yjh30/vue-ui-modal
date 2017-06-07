<template>
    <div class="example">
        <div class="btn" @click="previewAlert">点击预览alert提示组件</div>
        <div class="btn" @click="previewConfirm">点击预览confirm提示组件</div>
        <div class="btn" @click="previewPrompt">点击预览prompt提示组件</div>
        <div class="btn" @click="previewToast">点击预览toast提示组件</div>
        <div class="btn" @click="previewLoading">点击预览loading提示组件</div>
    </div>
</template>

<script>
    import './index.scss';
    import utils from '../../main/index';

    export default {
        data: function() {
            return {
                toastId: 0,
                timeoutId: null
            }
        },

        methods: {
            previewAlert: async function() {
                // await utils.alert('alert demo');

                utils.alert({
                    msg: 'alert demo',
                    buttonText: 'OK',
                    // hideTitle: true,
                    title: '自定义alert标题',
                    className: 'custom-alert'
                })
                .then(() => {
                    utils.toast('你点OK了');
                });
            },

            previewConfirm: function() {
                // await utils.confirm('alert demo');

                utils.confirm({
                    title: '自定义confirm标题',
                    msg: '你赞成他刚才所说的观点吗？',
                    leftButtonText: '否定',
                    rightButtonText: '赞成',
                    className: 'custom-confirm',
                    confirmCallback() {
                        console.log('😄');
                    }
                })
                .then(() => {
                    utils.toast('你赞成了');
                })
                .catch(() => {
                    utils.toast('你否定了');
                });
            },

            previewPrompt: function() {
                utils.prompt({
                    title: '自定义prompt标题',
                    msg: '谈谈你对最近的工作有啥感受？',
                    leftButtonText: '忽略',
                    rightButtonText: '提交',
                    className: 'custom-prompt'
                })
                .then(res => {
                    utils.toast(`你的回答是：${res}`);
                })
                .catch(() => {
                    utils.toast('太狠了，再也不见');
                });
            },

            previewToast: function() {
                utils.toast(`这是第${++this.toastId}个toast消息`);
            },

            previewLoading: function() {
                var vm = utils.loading('正在加载中...');
                window.clearTimeout(this.timeoutId);
                this.timeoutId = setTimeout(() => {
                    // vm.destroy();
                    // utils.toast('loading在5秒后销毁了');
                }, 5000);
            }
        }
    }
</script>
