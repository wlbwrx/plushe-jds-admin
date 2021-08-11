<template>
    <div class="tableStyle allocationShare">
        <div class="formSearch">
            <el-button type="success" icon="el-icon-plus" class="mr10" @click="addShare">新增</el-button>
            <el-input placeholder="请输入名称" v-model="formData.name" class="mr10"></el-input>
            <el-button type="primary"  @click="getListData">搜索</el-button>
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
                    prop="id"
                    label="序号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="名称"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="视频">
                    <!-- <template #default="scope">
                        <el-image
                            class="tableImg"
                            style="width: 100px; height: 100px"
                            :src="scope.row.imageUrl[0]"
                            :preview-src-list="scope.row.imageUrl">
                        </el-image>
                    </template> -->
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="图片">
                    <!-- <template #default="scope">
                        <el-image
                            class="tableImg"
                            style="width: 100px; height: 100px"
                            :src="scope.row.imageUrl[0]"
                            :preview-src-list="scope.row.imageUrl">
                        </el-image>
                    </template> -->
                </el-table-column>
                <el-table-column
                    prop="desc"
                    label="描述"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    >
                    <template #default="scope">
                        {{ scope.row.createTime.substring(0,19) }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="320" align="center">
                    <template #default="scope">
                        <el-button
                            size="mini"
                            type="success"
                            icon="el-icon-s-promotion"
                            @click="enableEdit(scope.$index, scope.row)"
                            v-if="!scope.row.enable"
                        >启用</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-s-promotion"
                            @click="enableEdit(scope.$index, scope.row)"
                            v-else
                        >禁用</el-button>
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
                            @click="handleDelete(scope.$index, scope.row)"
                            v-if="!scope.row.enable">
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
                <el-form-item label="*名称" label-width="100px">
                    <el-input placeholder="请输入名称" v-model="editFrom.name" class="mr10"></el-input>
                </el-form-item>
                <el-form-item label="视频" label-width="100px">
                    <upload-img></upload-img>
                </el-form-item>
                <el-form-item label="图片" label-width="100px">
                    <upload-img></upload-img>
                </el-form-item>
                <el-form-item label="描述" label-width="100px">
                    <el-input v-model="editFrom.desc" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="排序" label-width="100px">
                    <!-- <el-input v-model="editFrom.name"></el-input> -->
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveShop">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import PlatForm from '@/components/Platform'
    import UploadImg from '@/components/UploadImg'
    import http from '@/api/tutorial'
    export default {
        inject:['reload'],
        data() {
            return {
                pagetype: 0, // 表示品牌分享佣金配置页面
                pagetypeD: 1,
                editFrom:{
                },
                dialogFormVisible: false,
                tableData: [],
                formData: {}
            }
        },
        components:{
            PlatForm,
            UploadImg
        },
        methods:{
            addShare() {
                this.dialogFormVisible = true
                this.typeSet = 0
                this.editFrom ={}
            },
            getListData() {
                // this.formData.pageNum = 1
                // this.formData.pageSize = 10
                http.shopTutorialAllData(this.formData).then( res => {
                    if(res.code == 0){
                        this.$message.success('查询成功');
                        this.tableData = res.data
                    }else{
                        this.$message.error('查询失败'); 
                    }
                })
            },
            enableEdit(index, row){
                // 启用 禁用
                http.shopTutorialEnableData({
                    id: row.id,
                    enable: !row.enable
                }).then(res => {
                    this.reload()
                })
            },
            handleEdit(index, row) {
                this.dialogFormVisible = true
                this.typeSet = 1
                this.editFrom.name = row.name
                this.editFrom.desc = row.desc
                this.editFrom.id = row.id
            },
            handleDelete(index, row) {
                this.$confirm('确认删除该条教程吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    http.shopTutorialDelData({
                        id: row.id
                    }).then(res => {
                        this.reload()
                    }).catch(error => {
                        this.$message.error(error || '查询失败'); 
                    })
                }).catch(() => {
                    
                });
            },
            saveShop() {
                this.dialogFormVisible = false
                this.dialogFormVisible = false
                let dataname = this.typeSet == 0 ? 'shopTutorialAddData': 'shopTutorialUpdateData'
                http[dataname](this.editFrom).then( res => {
                     if(res.code == 0){
                        this.$message.success('添加成功');
                        this.reload()
                    }else{
                        this.$message.error('请求失败'); 
                    }
                })
            }
        },
        created(){
            this.getListData()
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
    .el-input{
        width:200px;
    }
</style>