<template>
    <!-- 类目级别 -->
    <div class="classform mr10">
        <el-select v-model="classformValue" placeholder="请选择">
            <el-option
            v-for="item in classform"
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
                classform: [{
                    value: '',
                    label: '全部类目级别'
                },{
                    value: '1',
                    label: '一级类目'
                }, {
                    value: '2',
                    label: '二级类目'
                }, {
                    value: '3',
                    label: '三级类目'
                }],
                classformValue: ''
            }
        }
    }
</script>

<style scoped lang="less">
    .classform{
        text-align:left;
        display:inline-block;
    }
</style>