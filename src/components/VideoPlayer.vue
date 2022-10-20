<template>
    <div>
        <video ref="videoPlayer" class="video-js"></video>
    </div>
</template>

<script>
import videojs from 'video.js';

export default {
    props: {
        options: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            player: null
        }
    },
    mounted() {
        this.initVideo()
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose()
        }
    },
    async initVideo() {
        this.$nextTick(() => {
            this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
                console.log('onPlayerReady', this)
            })
        })
    },
}
</script>