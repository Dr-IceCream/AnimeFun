<template>
    <div>
        <el-card class="search-card" shadow="always">
            <div class="text">
                {{"你想了解什么动漫？"}}
            </div>
            <el-row class="demo-autocomplete">
                <el-autocomplete class="inline-input" v-model="keyword" :fetch-suggestions="querySearch"
                    placeholder="请输入搜索内容" :trigger-on-focus="false" @select="turnInfPage()">
                </el-autocomplete>
                <el-button class="search-button" icon="el-icon-search" @click="turnInfPage()">
                </el-button>
            </el-row>
        </el-card>
        <el-card class="search-card" shadow="always">
            <div class="text">
                {{"还不知道是什么动漫？"}}
            </div>
            <el-row class="demo-autocomplete">
                <el-input class="inline-input" v-model="imgUrl" placeholder="请输入图片URL"
                style="width:300px">
                </el-input>
                <el-button class="search-button" icon="el-icon-search" @click="turnTracePage()">
                </el-button>
            </el-row>
        </el-card>
    </div>
</template>
<script>
import { getSuggest } from '../api/bilibili.js'

export default {
    created(){
    },
    data() {
        return {
            suggestions: {},
            keyword: '',
            imgUrl: '',
        };
    },
    methods: {
        querySearch(queryString, cb) {
            getSuggest(queryString).then(res => {
                this.suggestions = res.data
                console.log("---------suggestions--------")
                console.log(this.suggestions)
                let arr = []
                for (const i in this.suggestions) {
                    arr.push({ "value": this.suggestions[i].name })
                    if (i > 2) {
                        break;
                    }
                }
                console.log(arr)
                // 调用 callback 返回建议列表的数据
                cb(arr)
            })

        },
        handleSelect(item) {
            console.log(item);
        },
        turnInfPage: function () {
            this.$router.push({
                path: "./InfPage",
                query: {
                    keyword: this.keyword
                }
            });
        },
        turnTracePage: function () {
            this.$router.push({
                path: "./TracePage",
                query: {
                    imgUrl: this.imgUrl
                }
            });
        }
    }
}
</script>
<style>
.search-card {
    width: 500px;
    margin: auto;
    margin-top: 100px;
}

.text {
    margin-bottom: 20px;
}

.search-button {
    /*border: 1px solid rgb(129, 216, 208);*/
    border: 1px solid rgb(243, 239, 239);
    background-color: rgba(227, 144, 183, 0.532);
    color: white;
}
</style>