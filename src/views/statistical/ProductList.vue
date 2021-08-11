<template>
    <div class="tableStyle ProductList">
        <!-- 按照商品统计 -->
        <div class="formSearch">
            <plat-form></plat-form>
            <date-time></date-time>
            <all-classial></all-classial>
            <el-button type="primary">搜索</el-button>
        </div>
        <div class="formTable">
            <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                border
                default-expand-all
                >
                <el-table-column
                    prop="date"
                    label="品牌"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="产品ID"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="图片" width="100">
                    <template #default="scope">
                        <el-image
                            class="tableImg"
                            style="width: 100px; height: 100px"
                            :src="scope.row.imageUrl[0]"
                            :preview-src-list="scope.row.imageUrl">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="商品title"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="一级类目"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="二级类目"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="三级类目"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="销量总数(件)"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="分销销量总数(件)"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="分销销量占比"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="销售额($)"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="销售额占比"
                    width="150">
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                :current-page="currentPage4"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="10">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import PlatForm from '@/components/Platform'
    import DateTime from '@/components/times/DateTime'
    import allClassial from '@/components/productClasses/allClassial'
    export default {
        data() {
            return {
                tableData: [{
                    id: 1,
                    date: 1,
                    name: 'Plushe',
                    imageUrl: [
                        'https://img1.baidu.com/it/u=2371344713,52218095&fm=224&fmt=auto&gp=0.jpg',
                        'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/d439b6003af33a870c274301c45c10385343b567.jpg'
                    ]
                }, {
                    id: 2,
                    date: 2,
                    name: 'Geemart',
                    imageUrl: [
                        'https://img1.baidu.com/it/u=2371344713,52218095&fm=224&fmt=auto&gp=0.jpg',
                        'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/d439b6003af33a870c274301c45c10385343b567.jpg'
                    ]
                }, {
                    id: 3,
                    date: 3,
                    name: 'Bondot',
                    imageUrl: [
                        'https://img1.baidu.com/it/u=2371344713,52218095&fm=224&fmt=auto&gp=0.jpg',
                        'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/d439b6003af33a870c274301c45c10385343b567.jpg'
                    ]
                }],
            }
        },
        components: {
            PlatForm,
            DateTime,
            allClassial
        }
    }
</script>

<style scoped lang="less">

</style>