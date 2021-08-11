<template>
    <!-- 提现审核状态 -->
    <div class="drawform">
        <el-select v-model="drawformValue" placeholder="请选择" class="mr10">
            <el-option
            v-for="item in drawform"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
// 审核状态：0待审核，1通过-提现成功，2通过-提现失败，3驳回
    export default {
        data() {
            return {
                drawform: [{
                    value: '',
                    label: '全部提现状态'
                },{
                    value: 0,
                    label: '待审核'
                }, {
                    value: 1,
                    label: '提现成功'
                }, {
                    value: 2,
                    label: '提现失败'
                }, {
                    value: 3,
                    label: '驳回'
                }],
                drawformValue: ''
            }
        }
    }
</script>

<style scoped lang="less">
    .drawform{
        text-align:left;
        display:inline-block;
    }
</style>