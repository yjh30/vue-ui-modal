<template>
    <div class="modal-component loading-component flex-center">
        <div class="loading-bg flex-center">
            <transition name="loading" v-on:after-leave="afterLeave">
                <canvas :width="canvasSize" :height="canvasSize" class="loading" v-if="status"></canvas>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                status: 1,
                canvasSize: 64
            }
        },
        mounted: function() {
            this.animate();
        },
        methods: {
            afterLeave: function() {
                this.$emit('dismiss', 0);
            },
            animate: function() {
                var self = this;
                var drawCanvas;

                var canvas = this.$el.querySelector('canvas');
                var ctx = canvas.getContext('2d');

                var d = 0;
                var radius = canvas.width / 2;

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
            getDrawArcCanvas: function() {
                var canvas = document.createElement('canvas');
                canvas.width = this.canvasSize;
                canvas.height = this.canvasSize;

                var ctx = canvas.getContext('2d');
                var radius = canvas.width / 2;

                ctx.strokeStyle = 'white';
                ctx.lineWidth = 2;

                ctx.arc(radius, radius, radius - 4, 0, Math.PI / 2, true);
                ctx.stroke();

                return canvas;
            },
            degToRadian: function(deg) {
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
            background-color: rgba(0,0,0,0.7);
            width: 70px;
            min-height: 70px;
            border-radius: 5px;
            flex-wrap: wrap;
        }
        canvas {
            width: 30px;
            height: 30px;
        }
    }

</style>