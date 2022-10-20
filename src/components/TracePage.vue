<template>
  <el-main>
    <el-container>
      <el-header>
        <div class="search-ontop">
          <el-input class="inline-input" v-model="imgUrl" placeholder="请输入图片URL">
            <el-button slot="append" icon="el-icon-search" @click="updataInf()"></el-button>
          </el-input>
        </div>
      </el-header>
      <el-container>
        <el-aside width="400px">
          <div v-for="item in results" class="possible-items">
            <el-card class="item-card">
              <el-descriptions :title=item.anilist.title.native :column="1" :colon="showColon">
                <el-descriptions-item content-class-name="episode-content">
                  episode {{item.episode}}
                </el-descriptions-item>
                <el-descriptions-item content-class-name="HMS-content">
                  from {{getHMS(item.from)}} to {{getHMS(item.to)}}
                </el-descriptions-item>
                <el-descriptions-item content-class-name="similarity-content">
                  similarity {{getPercentage(item.similarity)}}
                </el-descriptions-item>
              </el-descriptions>
              <div>
                <img :src=item.image class="item-image" />
              </div>
            </el-card>
          </div>
        </el-aside>
        <el-main>
          <el-card>
            <div class="video-box">
              <video ref="videoPlayer" class="video-js">
              </video>
            </div>
            <el-descriptions :title=results[0].filename :column="1" :colon="showColon">
              <el-descriptions-item label="Native title:" label-class-name="title-label"
                content-class-name="title-content">
                {{results[0].anilist.title.native}}
              </el-descriptions-item>
              <el-descriptions-item label="English title:" label-class-name="title-label"
                content-class-name="title-content">
                {{results[0].anilist.title.english}}
              </el-descriptions-item>
              <el-descriptions-item label="Romaji title:" label-class-name="title-label"
                content-class-name="title-content">
                {{results[0].anilist.title.romaji}}
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </el-main>
</template>

<script type="text/javascript">
import { getTrace } from '../api/traceMoe.js'
import videojs from 'video.js';

export default {
  components: {
  },
  data() {
    return {
      imgUrl: "", //v-model绑定
      results: [{
        anilist: {
          id: "",
          idMal: "",
          isAdult: "",
          synonyms: "",
          title: {
            english: "",
            native: "",
            romaji: ""
          }
        },
        episode: "",
        filename: "",
        from: "",
        image: "",
        similarity: "",
        to: "",
        video: "",
      }],
      showColon: false,
      videoOptions: {
        autoplay: 'muted',//自动播放
        controls: true,//用户可以与之交互的控件
        loop: true,//视频一结束就重新开始
        muted: false,//默认情况下将使所有音频静音
        aspectRatio: "16:9",//显示比率
        fullscreen: {
          options: { navigationUI: 'hide' }
        },
        sources: [
          {
            src: "",
            type: "video/mp4"
          }
        ]
      }
    };
  },
  created() {
    this.imgUrl = this.$route.query.imgUrl;
    getTrace(this.imgUrl).then(res => {
      this.results = res.data.result
      console.log(this.results)
      console.log(this.results[0].filename)
      this.videoOptions.sources[0].src = this.results[0].video
      console.log(this.videoOptions.sources[0].src)
      setTimeout(() => {
        this.initVideo()
      }, 3000)
      // this.$nextTick(()=>{
      //   this.initVideo()
      // })
    })
  },
  methods: {
    async initVideo() {
      this.$nextTick(() => {
        this.player = this.$video(this.$refs.videoPlayer, this.videoOptions, function onPlayerReady() {
          console.log('onPlayerReady', this)
        })
      })
    },
    updataInf: function () {
      getTrace(this.imgUrl).then(res => {
        this.results = res.data.result
        console.log(this.results)
      })
    },
    // 根据秒数转换成对应的时分秒
    getHMS: function (time) {
      const hour = parseInt(time / 3600) < 10 ? '0' + parseInt(time / 3600) : parseInt(time / 3600)
      const min = parseInt(time % 3600 / 60) < 10 ? '0' + parseInt(time % 3600 / 60) : parseInt(time % 3600 / 60)
      const sec = parseInt(time % 3600 % 60) < 10 ? '0' + parseInt(time % 3600 % 60) : parseInt(time % 3600 % 60)
      return hour + ':' + min + ':' + sec
    },
    //根据浮点数转化为百分数
    getPercentage: function (value) {
      let realVal = (parseFloat(value) * 100).toFixed(2) + '%'
      return realVal
    }
  }
};
</script>
<style type="text/css">
.search-ontop {
  height: 10px;
  width: 500px;
  margin: 0 auto;
  margin-bottom: 40px;
  position: relative;
}

.text {
  font-size: 14px;
}

.box-card {
  width: 600px;
  margin-top: 20px;
}

.item-card {
  margin-top: 20px;
}

.episode-content {
  color: rgba(255, 0, 166, 0.71);
}

.HMS-content {
  color: rgb(0, 255, 55);
}

.similarity-content {
  color: rgb(0, 225, 225);
}

.title-content {
  color: rgb(0, 225, 225);
  font-size:x-large;
}

.title-label {
  color: rgb(16, 5, 30);
  font-size:x-large;
}
.item-image {
  position: relative;
}

.video-box {
  margin: 10px;
  width: 99%;
  height: 450px;
}

.video-js {
  width: 100%;
  height: 450px;
}
</style>
