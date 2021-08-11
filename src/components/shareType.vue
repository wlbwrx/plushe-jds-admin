<template>
    <!-- 集成platform 获取所有的平台 -->
    <div class="platform">
        <el-select v-model="platformValue" value-key="value" @change="selectChange" placeholder="请选择分享类型" class="mr10">
            <el-option
                v-for="item in platform"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
        props: ['pagetype','hasChooseType'],
        data() {
            return {
                platform: [{
                    value: '',
                    label: '全部品牌'
                },{
                    value: 0,
                    label: '分享品牌'
                },{
                    value: 1,
                    label: '分享分类'
                },{
                    value: 2,
                    label: '分享商品'
                },{
                    value: 3,
                    label: '邀请成员'
                }],
                platformValue: ''
            }
        },
        methods: {
            selectChange() {
                // 将此时选择的id传给上一级
                this.$emit('shareTypeData', this.platformValue)
            }
        },
        created() {
            if(this.pagetype == 1){
                this.platformValue = this.hasChooseType
            }
        }
    }
</script>

<style scoped lang="less">
    .platform{
        text-align:left;
        display:inline-block;
    }
</style>