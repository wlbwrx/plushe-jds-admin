<template>
    <div class="lineCharts" id="lineCharts" style="width:100%;height:800px;"></div>
</template>

<script>
    import { shallowRef } from 'vue';
    // 引入echarts 组件
    import * as echarts from 'echarts';
    export default {
        inject:["reload"],
        props:{
            typeChart: {
                type: Boolean
            },
            platformA:{
                type: Array
            },
            chartData:{
                type: Object
            }
        },
        data() {
            return {
                chart: null
            }
        },
        activated(){
            
        },
        created(){
            
        },
        mounted() {
            this.$nextTick(() => {
                
                this.changeChart()
            });
        },
        updated(){
            this.changeChart()
        },
        methods: {
            changeChart(){
                console.log(this.chartData)
                if(this.typeChart == true){
                   this.initBarChart()
                }else{
                   this.initLineChart(); 
                }
            },
            showData(){
                let showData = []
                this.chartData.shopsData.map((item, index) => {
                    showData.push({
                        name: item,
                        data: this.chartData.chartDataNumber[index],
                        type: 'line',
                        smooth: true 
                    })
                })
                return showData
            },
            initLineChart() {
                console.log(this.chartData.timeArray)
                console.log(this.showData())
                this.chart = shallowRef(echarts.init(document.getElementById('lineCharts')));
                this.chart.setOption({
                    // title: {
                    //     text: '折线图'
                    // },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.chartData.timeArray
                    },
                    legend: {
                        data: this.chartData.shopsData
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: this.showData()
                },true)
            },
            initBarChart() {
                
                this.chart = shallowRef(echarts.init(document.getElementById('lineCharts')));
                this.chart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    legend: {
                        data: ['分享次数', '邀请成功']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: this.chartData.timeArray2,
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '分享次数',
                            axisLabel: {
                                formatter: '{value} 次'
                            }
                        },
                        {
                            type: 'value',
                            name: '邀请成功',
                            axisLabel: {
                                formatter: '{value} 个'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '分享次数',
                            type: 'bar',
                            data: this.chartData.chart2DataO
                        },
                        {
                            name: '邀请成功',
                            type: 'line',
                            yAxisIndex: 1,
                            data: this.chartData.chart2DataT
                        }
                    ]
                },true)
            }
        }
    }
</script>

<style scoped lang="less">

</style>