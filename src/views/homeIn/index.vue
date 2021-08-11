<template>
    <div class="homeIn">
        <div class="formSearch">
            <plat-form @platformIdData="platformIdData" @platformAllData="platformAllData" v-if="!dataValue"></plat-form>
            <date-time @dateValue="dateValue"></date-time>
            <el-button type="primary" @click="searchdatachart">搜索</el-button>
            <el-button type="success" icon="el-icon-download">导出</el-button>
            <el-switch v-model="dataValue" class="lineOrchat" active-text="邀请成员统计" inactive-text="分享数据统计" @change="switchChange"></el-switch>
        </div>
        <div class="searchResult" v-if="destroyChart">
            <el-row>
                <el-col :span="24">
                    <line-chart :typeChart="dataValue" :platformA="platformAll" :chartData="chartData"></line-chart>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import LineChart from '@/components/charts/LineChart'
    import PlatForm from '@/components/Platform'
    import DateTime from '@/components/times/DateTime'
    import http from '@/api/data';
    export default {
        data() {
            return {
                dataValue: false, // false 代表展示分享数据统计  true 代表邀请成员统计
                destroyChart: true,
                formData:{
                    // 存储需要传值的的表单信息
                },
                platformAll:[],
                chartData:{
                    chartDataNumber: [],
                    shopsData: [],
                    timeArray: [],
                    timeArray2: [],
                    chart2DataO: [],
                    chart2DataT: []
                }
            }
        },
        components:{
            LineChart,
            PlatForm,
            DateTime
        },
        methods: {
            platformIdData(data) {
                // 接收传回来的品牌id
                this.formData.platformId = data.platformId
                this.formData.shopsId = data.shopsId
            },
            platformAllData(data){
                this.platformAll = data
            },
            filterPlatform(platformId, shopsId){
                let plfname = ''
                this.platformAll.filter((item) => {
                    if(item.platformId == platformId && item.shopsId == shopsId){
                        plfname = item.label
                    }
                })
                return plfname
            },
            dateValue(data){
                // 接收传回来的时间
                this.formData.beginTime = data.beginTime
                this.formData.endTime = data.endTime
            },
            // 图表数据处理
            serChartDara(data){
                if(data.length > 0){
                    let shopsData = []
                    let timeArray = []
                    let chartDataNumber = []
                    let datasOne =  data[0].responseVos  // 第一条数据里的信息
                    // 店铺名字处理
                    datasOne.map(item => {
                        shopsData.push(this.filterPlatform(item.platformId, item.shopsId))
                    })
                    // 时间处理
                    data.map(items => {
                        timeArray.push(items.statisticsDate)
                    })
                    // 进行店铺数据处理
                    datasOne.map((item,index) => {
                        let chartData = []
                        data.map(items => {
                            items.responseVos.map((itemss, indexs) => {
                                if(index == indexs){
                                    chartData.push(itemss.shareCount)
                                }
                            })
                        })
                        chartDataNumber.push(chartData)
                    })
                    this.chartData.chartDataNumber = chartDataNumber
                    this.chartData.shopsData = shopsData
                    this.chartData.timeArray = timeArray
                }
            },
            searsharedata(){
                // console.log(this.formData)
                // 查询分享图表数据
                http.shareData(this.formData).then(res => {
                    // console.log(res.data)
                    this.serChartDara(res.data)
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: error || '请求失败，请稍候重试'
                    });
                }) 
            },
            searmemberdata(){
                // 查询邀请成员图表数据
                http.memberData({
                    queryStartDate: this.formData.beginTime,
                    queryEndDate: this.formData.endTime 
                }).then(res => {
                    this.chartData.timeArray2 = []
                    this.chartData.chart2DataO = []
                    this.chartData.chart2DataT = []
                    console.log(res.data)
                    res.data.map(item => {
                        this.chartData.timeArray2.push(item.dateKey)
                        this.chartData.chart2DataO.push(item.shareCount)
                        this.chartData.chart2DataT.push(item.memberCount)
                    })
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: error || '请求失败，请稍候重试'
                    });
                }) 
            },
            searchdatachart() {
                this.destroyChart = false // 将图表组件先销毁
                this.$nextTick(() => {
                    this.destroyChart = true;//重建组件
                });
                this.switchChange()
            },
            switchChange(){
                if(!this.dataValue){
                    this.searsharedata()
                }else{
                    this.searmemberdata()
                }
            }
        },
        created() {
            this.searsharedata()
            // this.searmemberdata()
        }
    }
</script>

<style scoped lang="less">
    .formSearch{
        .lineOrchat{
            float:right;
            margin-top:10px;
        }
    }
    .searchResult{
        margin-top:40px;
    }
</style>