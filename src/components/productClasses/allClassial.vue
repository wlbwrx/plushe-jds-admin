<template>
    <div class="allClassial mr10">
        <el-cascader
            v-model="value"
            :options="options"
            @change="handleChange"
            placeholder="请选择类目">
        </el-cascader>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: [],
            options: [
                {
                    value: 'one',
                    label: '一级类目',
                    children: [
                        {
                            value: 'one-kid1',
                            label: '一级子类目1',
                            children: [
                                {
                                    value: 'one-kid-kid1',
                                    label: '一级子类目-子类目1',
                                },
                                {
                                    value: 'one-kid-kid1',
                                    label: '一级子类目-子类目1',
                                },
                            ]
                        },
                        {
                            value: 'one-kid2',
                            label: '一级子类目2',
                        },
                        {
                            value: 'one-kid3',
                            label: '一级子类目3',
                        },
                    ]
                },
                {
                    value: 'two',
                    label: '二级类目',
                    children: [
                        {
                            value: 'one-kid1',
                            label: '二级子类目1',
                            children: [
                                {
                                    value: 'one-kid-kid1',
                                    label: '二级子类目-子类目1',
                                },
                                {
                                    value: 'one-kid-kid1',
                                    label: '二级子类目-子类目1',
                                },
                            ]
                        },
                        {
                            value: 'one-kid2',
                            label: '二级子类目2',
                        },
                        {
                            value: 'one-kid3',
                            label: '二级子类目3',
                        },
                    ]
                }
            ]
        }
    }
}
</script>

<style scoped lang="less">
    .allClassial{
        text-align:left;
        display:inline-block;
    }
</style>