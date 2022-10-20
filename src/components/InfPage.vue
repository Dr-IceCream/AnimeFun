<template>
  <el-main>
    <div class="search-ontop">
      <el-autocomplete class="inline-input" v-model="keyword" :fetch-suggestions="querySearch" placeholder="请输入搜索内容"
        :trigger-on-focus="true" @select="updataInf()">
        <el-button slot="append" icon="el-icon-search" @click="updataInf()"></el-button>
      </el-autocomplete>
    </div>
    <el-row :gutter="24">
      <el-col :span="12">
        <!-- 百度百科简介 -->
        <el-row>
          <el-card class="box-card">
            <div class="text item">
              <el-descriptions title="百度百科简介" direction="vertical" :column="1" :colon="showColon"
                v-loading="loadingText">
                <el-descriptions-item>
                  {{this.baikeText}}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </el-card>
        </el-row>
        <!-- bing壁纸 -->
        <el-row :gutter="12">
          <el-card class="box-card" v-loading="loadingBingImages">
            <div slot="header" align="left" class="bing-title">
              <span>必应精选壁纸</span>
            </div>
            <div v-for="i in 4" :key="i">
              <el-col :span="6">
                <img :src="bingImageUrls[i-1]" @click="openBingImages(i-1)" class="bing-image" />
              </el-col>
            </div>
          </el-card>
        </el-row>
        <!-- 唯品会商品 -->
        <el-row :gutter="24">
          <el-card class="box-card" v-loading="loadingVipInfo">
            <div slot="header" align="left" class="bing-title">
              <span>唯品会推荐</span>
            </div>
            <div v-for="i in 3" :key="i">
              <el-col :span="8">
                <el-row>
                  <img :src="vipGoodsMainPictures[i-1]" @click="openVipGoods(i-1)" class="vip-image" />
                </el-row>
                <el-row>
                  <el-button icon="el-icon-price-tag" size="small">
                    {{ vipPrices[i-1] + "￥" }}
                  </el-button>
                </el-row>
                <el-row style="font-size:small">
                  {{vipGoodsNames[i-1]}}
                </el-row>
              </el-col>
            </div>
          </el-card>
        </el-row>
      </el-col>
      <!-- bilibili番剧信息 -->
      <el-col :span="12">
        <el-card v-loading="loadingBangumi" class="box-card">
          <div v-for="i in bangumiUrls.length" :key="i">
            <el-row :gutter="24">
              <el-col :span="8">
                <img :src="bangumiCoverUrls[i-1]" @click="openVideo(i-1)" class="video-image" />
              </el-col>
              <el-col align=left :span="16">
                <el-descriptions title="番剧详细信息" :column="1">
                  <el-descriptions-item label="标题">{{bangumiTitles[i-1]|titleFilter}}</el-descriptions-item>
                  <el-descriptions-item label="原作名">{{bangumiOriginTitles[i-1]|titleFilter}}</el-descriptions-item>
                  <el-descriptions-item label="评分" :span="2">{{bangumiScores[i-1]}}</el-descriptions-item>
                  <el-descriptions-item label="类型">{{bangumiStyles[i-1]}}</el-descriptions-item>
                  <el-descriptions-item label="集数">{{bangumiEpisodes[i-1]}}</el-descriptions-item>
                </el-descriptions>
              </el-col>
            </el-row>
            <el-divider></el-divider>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 特定动漫资讯 -->
    <el-row>
      <el-card v-loading="loadingBangumi" class="news-card">
        <div slot="header" align="left" class="bing-title">
          <span>该动漫相关资讯</span>
        </div>
        <div v-for="i in animeSpecificNews.length" :key="i">
          <el-row :gutter="24">
            <el-col :span="6">
              <img :src="animeSpecificNews[i-1].picUrl" class="news-image" />
            </el-col>
            <el-col :span="18">
              <el-row>
                <el-link class="news-title" type="primary" :href="animeSpecificNews[i-1].url" target="_blank">
                  {{animeSpecificNews[i-1].title}}
                </el-link>
              </el-row>
              <el-row>
                <p>{{animeSpecificNews[i-1].ctime}}</p>
              </el-row>
              <el-row>
                <p>{{animeSpecificNews[i-1].description}}</p>
              </el-row>
            </el-col>
          </el-row>
          <el-divider></el-divider>
        </div>
      </el-card>
    </el-row>
    <!-- 随机动漫资讯 -->
    <el-row>
      <el-card v-loading="loadingBangumi" class="news-card">
        <div slot="header" align="left" class="bing-title">
          <span>Explore more !!!</span>
        </div>
        <div v-for="i in animeNews.length" :key="i">
          <el-row :gutter="24">
            <el-col :span="6">
              <img :src="animeNews[i-1].picUrl" class="news-image" />
            </el-col>
            <el-col :span="18">
              <el-row>
                <el-link class="news-title" type="primary" :href="animeNews[i-1].url" target="_blank">
                  {{animeNews[i-1].title}}
                </el-link>
              </el-row>
              <el-row>
                <p>{{animeNews[i-1].ctime}}</p>
              </el-row>
              <el-row>
                <p>{{animeNews[i-1].description}}</p>
              </el-row>
            </el-col>
          </el-row>
          <el-divider></el-divider>
        </div>
      </el-card>
    </el-row>
  </el-main>
</template>

<script type="text/javascript">
import { getSuggest, getResultList } from '../api/bilibili.js'
import { getBaiduBaike } from '../api/baidu.js'
import { getBingImages } from '../api/bing.js'
import { getVipInfo } from '../api/dingdanxia.js'
import { getSpecificAnimeNews, getAnimeNews } from '../api/tian.js'

export default {
  data() {
    return {
      keyword: "", //v-model绑定
      showColon: false,
      //loading flag
      loadingText: true,
      loadingBangumi: true,
      loadingBingImages: true,
      loadingVipInfo: true,
      loadingSpecificAnimeNews: true,
      loadingAnimeNews: true,
      //baidu baike
      baikeText: "",
      baikeImgUrl: "",
      //bilibili suggest
      suggestions: {},
      //bilibili banguimi
      bangumiUrls: [],
      bangumiCoverUrls: [],
      bangumiTitles: [],
      bangumiOriginTitles: [],
      bangumiScores: [],
      bangumiStyles: [],
      bangumiEpisodes: [],
      //bing image
      bingImageUrls: [],
      //vip(唯品会) info
      vipBrandNames: [],
      vipDestUrls: [],
      vipGoodsNames: [],
      vipGoodsMainPictures: [],
      vipPrices: [],
      //tianxing anime news
      animeSpecificNews: [{
        ctime: "",
        description: "",
        picUrl: "",
        title: "",
        url: "",
      }],
      animeNews: [{
        ctime: "",
        description: "",
        picUrl: "",
        title: "",
        url: "",
      }],
    };
  },
  created() {
    this.keyword = this.$route.query.keyword
    this.getAllInf()
  },
  methods: {
    querySearch(queryString, cb) {
      getSuggest(queryString).then(res => {
        this.suggestions = res.data
        // console.log("---------suggestions--------")
        // console.log(this.suggestions)
        let arr = []
        for (const i in this.suggestions) {
          arr.push({ "value": this.suggestions[i].name })
        }
        // console.log(arr)
        // 调用 callback 返回建议列表的数据
        cb(arr)
      })
    },
    handleSelect(item) {
      console.log(item);
    },
    clearBangumi: function () {
      this.bangumiUrls = []
      this.bangumiCoverUrls = []
      this.bangumiTitles = []
      this.bangumiOriginTitles = []
      this.bangumiScores = []
      this.bangumiStyles = []
      this.bangumiEpisodes = []
    },
    getAllInf: function () {
      //set loading
      this.loadingText = true
      this.loadingBangumi = true
      this.loadingBingImages = true
      this.loadingVipInfo = true
      this.loadingSpecificAnimeNews = true
      this.loadingAnimeNews = true
      //exe the get
      getBaiduBaike(this.keyword).then(res => {
        this.loadingText = false
        this.baikeText = res.data.data.text
        this.baikeImgUrl = res.data.data.img_url
      })
      getResultList(this.keyword, 1, 20).then(res => {
        this.loadingBangumi = false
        var bangumiData = []
        bangumiData = res.data.data.result[5].data
        // console.log(bangumiData)
        for (var i = 0; i < bangumiData.length; i++) {
          this.bangumiUrls.push(bangumiData[i].goto_url)
          this.bangumiCoverUrls.push(bangumiData[i].cover)
          this.bangumiTitles.push(bangumiData[i].title)
          this.bangumiOriginTitles.push(bangumiData[i].org_title)
          this.bangumiScores.push(bangumiData[i].media_score.score)
          this.bangumiStyles.push(bangumiData[i].styles)
          this.bangumiEpisodes.push(bangumiData[i].index_show)
        }
        // console.log(this.bangumiUrls)
      })
      getBingImages(this.keyword).then(res => {
        this.loadingBingImages = false
        var bingImagesData = []
        bingImagesData = res.data.value
        // console.log(bingImagesData)
        for (var i = 0; i < bingImagesData.length; i++) {
          this.bingImageUrls.push(bingImagesData[i].contentUrl)
        }
      })
      getVipInfo(this.keyword).then(res => {
        this.loadingVipInfo = false
        // console.log(res);
        for (var i = 0; i < 4; i++) {
          this.vipBrandNames[i] = res.data.data[i].brandName; //商品品牌
          this.vipDestUrls[i] = res.data.data[i].destUrl; //购买链接url
          this.vipGoodsMainPictures[i] = res.data.data[i].goodsMainPicture; //商品图
          this.vipGoodsNames[i] = res.data.data[i].goodsName; //商品名
          this.vipPrices[i] = res.data.data[i].vipPrice; //商品价格
        }
        this.loadingBuyInfo = false;
      })
      getSpecificAnimeNews(this.keyword).then(res => {
        this.loadingSpecificAnimeNews = false
        console.log(res.data.msg)
        // var flag = strcmp("success", res.data.msg)
        if (res.data.msg == "success") {
          this.animeSpecificNews = res.data.newslist
        }
        else {
          this.animeSpecificNews.length = 0
          console.log("00000000000000")
        }
      })
      getAnimeNews().then(res => {
        this.loadingAnimeNews = false
        this.animeNews = res.data.newslist
        // console.log(this.animeNews)
      })
    },
    updataInf: function () {
      //clear array
      this.clearBangumi()
      this.bingImageUrls = []
      this.vipBrandNames = []
      this.vipDestUrls = []
      this.vipGoodsNames = []
      this.vipGoodsMainPictures = []
      this.vipPrices = []
      //get
      this.getAllInf()
    },
    openVideo(i) {
      window.open(this.bangumiUrls[i], "_blank");
    },
    openBingImages(i) {
      window.open(this.bingImageUrls[i], "_blank");
    },
    openVipGoods(i) {
      window.open(this.vipDestUrls[i], "_blank");
    },
  },
  filters: {
    titleFilter: function (value) {
      value = value.replace(/class/g, "")
        .replace(/em/g, "")
        .replace(/keyword/g, "")
        .replace(/[`*\-+=<>?:"{}|/;'\\[\]*——\-+=]/g, "")
        .replace(/\s/g, "");
      return value;
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

.search-ontop input {
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  width: 500px;
  height: 45px;
  font-size: 18px;
  float: left;
  padding-left: 10px;
  padding-right: 10px;
  overflow: hidden;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 600px;
  margin-top: 20px;
  padding-bottom: 20px;
}

.news-card {
  width: 1200px;
  margin-top: 20px;
  padding-bottom: 20px;
}

.video-image {
  width: 100%;
}

.bing-image {
  width: 100%;
}

.vip-image {
  width: 100%;
}

.news-image {
  width: 100%;
}

.bing-title {
  font-weight: bold;
  font-size: large;
}

.news-title {
  font-weight: bold;
  font-size: medium;
}
</style>
