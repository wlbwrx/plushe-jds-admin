<template>
    <div class="tableStyle allocationShare">
        <div class="formSearch">
            <el-button type="success" icon="el-icon-plus" class="mr10" @click="addShare">新增</el-button>
            <plat-form></plat-form>
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
                    label="序号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="品牌"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="品牌域名"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="LOGO" width="150">
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
                    label="链接"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="简介"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="创建时间"
                    width="150">
                </el-table-column>
                <el-table-column label="操作" width="300" align="center">
                    <template #default="scope">
                        <el-button
                            size="mini"
                            type="success"
                            icon="el-icon-s-promotion"
                            @click="handleEdit(scope.$index, scope.row)"
                        >启用</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button>
                    </template>
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
        <el-dialog title="新增" v-model="dialogFormVisible" width="400px">
            <el-form :model="editFrom">
                <el-form-item label="品牌" label-width="100px">
                    <plat-form></plat-form>
                </el-form-item>
                <el-form-item label="*品牌域名" label-width="100px">
                    <el-input v-model="editFrom.name"></el-input>
                </el-form-item>
                <el-form-item label="*LOGO图片" label-width="100px">
                    <upload-img></upload-img>
                </el-form-item>
                <el-form-item label="*详情页配置链接" label-width="100px">
                    <el-input v-model="editFrom.name"></el-input>
                </el-form-item>
                <el-form-item label="*品牌简介" label-width="100px">
                    <el-input type="textarea" v-model="editFrom.name"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import PlatForm from '@/components/Platform'
    import UploadImg from '@/components/UploadImg'
    export default {
        data() {
            return {
                editFrom:{},
                dialogFormVisible: false,
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
        components:{
            PlatForm,
            UploadImg
        },
        methods:{
            addShare() {
                this.dialogFormVisible = true
                this.editFrom ={}
            },
            handleEdit() {

            },
            handleDelete() {

            }
        }
    }
</script>

<style scoped lang="less">
    .tableImg{
        width:100px;
        height:100px;
    }
    .el-form{
        text-align: left;
    }
</style>