<template>
    <div class="ReturnCommission">
        <!-- 返佣金状态 -->
        <el-select v-model="rcListValue" placeholder="请选择" class="mr10" @change="selectChange">
            <el-option
            v-for="item in rcList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rcList: [{
                value: '',
                label: '全部返佣状态'
            }, {
                value: 0,
                label: '不返佣'
            }, {
                value: 1,
                label: '待返佣'
            }, {
                value: 2,
                label: '已返佣'
            }],
            rcListValue: ''
        }
    },
    methods:{
        selectChange() {
            // 将此时选择的id传给上一级
            this.$emit('returntype', this.rcListValue)
        }
    }
}
</script>

<style scoped lang="less">
    .ReturnCommission{
        text-align:left;
        display:inline-block;
    }
</style>