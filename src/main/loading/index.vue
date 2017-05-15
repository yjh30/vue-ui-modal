<template>
    <div class="modal-component loading-component flex-center">
        <transition name="modal" :appear="true" v-on:after-leave="afterLeave">
            <div class="loading-bg">
                <div class="wrapper">
                    <div>
                        <canvas :width="canvasSize" :height="canvasSize" class="loading"></canvas>
                    </div>
                    <div class="msg" v-if="msg">{{msg}}</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                canvasSize: 64
            }
        },
        props: ['msg'],
        mounted() {
            this.animate();
        },
        methods: {
            afterLeave() {
                this.$emit('dismiss');
            },
            animate() {
                const self = this;
                let drawCanvas;

                const canvas = this.$el.querySelector('canvas');
                const ctx = canvas.getContext('2d');

                let d = 0;
                const radius = canvas.width / 2;

                window.requestAnimationFrame(function fn() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    ctx.translate(radius, radius);

                    d += self.degToRadian(8);
                    ctx.transform(Math.cos(d), Math.sin(d), -Math.sin(d), Math.cos(d), 0, 0);

                    if (!drawCanvas) {
                        drawCanvas = self.getDrawArcCanvas();
                    }
                    ctx.drawImage(drawCanvas, -radius, -radius, canvas.width, canvas.height);

                    window.requestAnimationFrame(fn);
                });
            },
            getDrawArcCanvas() {
                const canvas = document.createElement('canvas');
                canvas.width = this.canvasSize;
                canvas.height = this.canvasSize;

                const ctx = canvas.getContext('2d');
                const radius = canvas.width / 2;

                ctx.strokeStyle = 'white';
                ctx.lineWidth = 2;

                ctx.arc(radius, radius, radius - 2, 0, Math.PI / 2, true);
                ctx.stroke();

                return canvas;
            },
            degToRadian(deg) {
                return deg * Math.PI / 180;
            }
        }
    }
</script>

<style lang="sass">
    .loading-component {
        background-color: transparent!important;
        pointer-events: none;
        .loading-bg {
            background-color: rgba(0,0,0,0.8);
            max-width: 200px;
            padding: 20px 25px;
            border-radius: 5px;
            line-height: 1;
        }
        .wrapper {
            width: 100%;
            flex-wrap: wrap;
            flex-direction: column;
            display: flex;
            align-items: center;
        }
        canvas {
            width: 30px;
            height: 30px;
        }
        .msg {
            color: #FFF;
            line-height: 1.3;
            margin-top: 15px;
        }
    }

</style>