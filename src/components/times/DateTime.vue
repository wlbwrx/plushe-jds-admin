<template>
    <div class="dateTime mr10">
        <el-date-picker
            v-model="timeValue"
            type="datetimerange"
            :shortcuts="shortcuts"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            @change="dateChange"
        >
        </el-date-picker>
    </div>

</template>

<script>
    // 引入时间格式化插件
    import moment from 'moment' // 日期处理类库
    export default {
        data() {
            return {
                shortcuts: [{
                    text: '最近一周',
                    value: (() => {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        return [start, end]
                    })()
                }, {
                text: '最近一个月',
                    value: (() => {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        return [start, end]
                    })()
                }, {
                text: '最近三个月',
                    value: (() => {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        return [start, end]
                    })()
                }],
                timeValue:[]
            };
        },
        computed:{
            
        },
        methods:{
            defaultTimeValue() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                this.timeValue = [start, end]
                this.momentDate(start, end)
            },
            dateChange() {
                console.log(this.timeValue)
                // console.log(moment(this.timeValue[0]).format('YYYY-MM-DD HH:mm:ss'))
                this.momentDate(this.timeValue[0], this.timeValue[1])
            },
            momentDate(start, end){
                this.$emit('dateValue', {
                    beginTime: moment(start).format('YYYY-MM-DD HH:mm:ss'),
                    endTime: moment(end).format('YYYY-MM-DD HH:mm:ss')
                })
            }
        },
        created() {
            // console.log(moment(this.timeValue[0]).format('YYYY-MM-DD HH:mm:ss'))
            // console.log(moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss'))
            // this.$emit('dateValue', )
            // console.log(moment().subtract(7, 'days'))
            // console.log(this.timeValue)
            this.defaultTimeValue()
        }
    }
</script>

<style scoped lang="less">
    .dateTime{
        display:inline-block;
    }
</style>