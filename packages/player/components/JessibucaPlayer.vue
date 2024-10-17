<template>
    <div class="container-wrapper relative">
        <div id="container" ref="container"></div>
        <div
            class="control-bar absolute bottom-0 w-full bg-[rgba(0,0,0,0.5)] h-24px px-3 flex-y-center justify-between box-border">
            <div class="control-bar-start text-light-50 flex-y-center">
                <Icon icon="carbon-play-filled-alt" v-if="!playing" @click="playBtnClick" class="cursor-pointer" />
                <Icon icon="carbon-pause-filled" @click="pause" v-if="playing" class="cursor-pointer" />
                <Icon icon="carbon-stop-filled-alt" @click="destroy" class="ml-2" />
            </div>
            <div class="flex-y-center">
                <Icon icon="ant-design-fullscreen-outlined" v-if="!fullscreen" @click="toggleFullscreen" />
                <Icon icon="ant-design-fullscreen-exit-outlined" v-if="fullscreen" @click="toggleFullscreen" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// @ts-nocheck
import { ref } from 'vue'
import { onMounted, onUnmounted, watch } from 'vue'
import { Icon } from '@iconify/vue'
export default {
    name: 'JessibucaPlayer',
    props: {
        url: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        let jessibuca = null
        const container = ref(null)
        const buffer = ref(null)
        const showBandwidth = ref(false)
        const showOperateBtns = ref(false)
        const forceNoOffscreen = ref(false)
        const playUrl = ref('')
        const playing = ref(false)
        const quieting = ref(true)
        const loaded = ref(false)
        const performance = ref('')
        const fullscreen = ref(false)

        const createJessibuca = () => {
            jessibuca = new (window as any).Jessibuca({
                container: container.value,
                videoBuffer: 0.2, // 缓存时长
                isResize: true,
                text: '',
                // background: "bg.jpg",
                loadingText: '请稍候, 视频加载中...',
                loadingTimeout: 10,
                loadingTimeoutReplay: true,
                loadingTimeoutReplayTimes: 3,
                hasAudio: false,
                recordType: 'webm',
                timeout: 10,
                debug: true,
                showBandwidth: showBandwidth.value, // 显示网速
                operateBtns: {
                    fullscreen: showOperateBtns.value,
                    screenshot: showOperateBtns.value,
                    play: showOperateBtns.value,
                    audio: showOperateBtns.value,
                },
                forceNoOffscreen: forceNoOffscreen.value,
                isNotMute: false,
            }) as Jessibuca

            jessibuca.on('load', function () {
                console.log('on load')
            })

            jessibuca.on('log', function (msg: any) {
                console.log('on log', msg)
            })
            jessibuca.on('record', function (msg: any) {
                console.log('on record:', msg)
            })
            jessibuca.on('pause', function () {
                console.log('on pause')
                playing.value = false
            })
            jessibuca.on('play', function () {
                console.log('on play')
                playing.value = true
                loaded.value = true
                quieting.value = jessibuca.isMute()
            })
            jessibuca.on('fullscreen', function (msg: any) {
                console.log('on fullscreen', msg)
            })

            jessibuca.on('mute', function (msg: any) {
                console.log('on mute', msg)
                quieting.value = msg
            })

            jessibuca.on('mute', function (msg: any) {
                console.log('on mute2', msg)
            })

            jessibuca.on('audioInfo', function (msg: any) {
                console.log('audioInfo', msg)
            })

            // jessibuca.on("bps", function (bps) {
            //   // console.log('bps', bps);
            // });
            // let _ts = 0;
            // jessibuca.on("timeUpdate", function (ts) {
            //   // console.log('timeUpdate,old,new,timestamp', _ts, ts, ts - _ts);
            //   // _ts = ts;
            // });

            jessibuca.on('videoInfo', function (info: any) {
                console.log('videoInfo', info)
            })

            jessibuca.on('error', function (error: any) {
                console.log('error', error)
            })

            jessibuca.on('timeout', function () {
                console.log('timeout')
                play(playUrl.value)
            })

            jessibuca.on('start', function () {
                console.log('start')
            })

            // jessibuca.on("stats", function (stats) {
            //   console.log('stats', JSON.stringify(stats));
            // });

            jessibuca.on('performance', function (p: any) {
                let show = '卡顿'
                if (p === 2) {
                    show = '非常流畅'
                } else if (p === 1) {
                    show = '流畅'
                }
                performance.value = show
            })
            jessibuca.on('buffer', function (buffer: any) {
                console.log('buffer', buffer)
            })

            // jessibuca.on('stats', function (stats: any) {
            //     console.log('stats', stats)
            // })

            // jessibuca.on('kBps', function (kBps: any) {
            //     console.log('kBps', kBps)
            // })

            // 显示时间戳 PTS
            jessibuca.on('videoFrame', function () { })

            //
            jessibuca.on('metadata', function () { })
        }

        onMounted(() => {
            playUrl.value = props.url

            createJessibuca()

            if (props.url) {
                play()
            }
        })

        onUnmounted(() => {
            jessibuca && jessibuca.destroy()
        })

        const play = () => {
            if (jessibuca.hasLoaded()) {
                jessibuca.play(playUrl.value)
            } else {
                jessibuca.on('load', () => {
                    console.log('load play')
                    jessibuca.play(playUrl.value)
                })
            }
        }
        const pause = () => {
            jessibuca.pause()
            playing.value = false
        }

        const playBtnClick = () => {
            play()
        }

        const destroy = () => {
            if (jessibuca) {
                jessibuca.destroy()
            }
            createJessibuca()
            playing.value = false
            loaded.value = false
        }

        const toggleFullscreen = () => {
            let isFull = isFullscreen()
            jessibuca.setFullscreen(!isFull)
            fullscreen.value = !isFull
        }

        const isFullscreen = () => {
            return (
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement ||
                false
            )
        }

        watch(
            () => props.url,
            (newVal) => {
                console.log('watch url', newVal)
                playUrl.value = newVal
                if (newVal) {
                    play()
                }
            },
            {
                immediate: true,
            }
        )

        return {
            container,
            buffer,
            showBandwidth,
            playing,
            playUrl,
            play,
            playBtnClick,
            pause,
            destroy,
            loaded,
            toggleFullscreen,
            fullscreen,
        }
    },
}
</script>

<style>
.container-wrapper {
    position: relative;
    /* border: 2px solid black; */
    width: auto;
    height: 100%;
    position: relative;
    border-radius: 5px;
}

#container {
    background: rgba(13, 14, 27, 0.7);
    width: 100%;
    height: 100%;
}

.input {
    display: flex;
    align-items: center;
    margin-top: 10px;
    color: white;
    place-content: stretch;
}

.input2 {
    bottom: 0px;
}

.input input[type='input'] {
    flex: auto;
}

.err {
    position: absolute;
    top: 40px;
    left: 10px;
    color: red;
}

.option {
    position: absolute;
    top: 4px;
    right: 10px;
    display: flex;
    place-content: center;
    font-size: 12px;
}

.option span {
    color: white;
}

@media (max-width: 720px) {
    #container {
        width: 90vw;
        height: 52.7vw;
    }
}
</style>