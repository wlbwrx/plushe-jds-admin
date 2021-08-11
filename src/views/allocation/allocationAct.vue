<template>
    <div class="tableStyle allocationShare">
        <div class="formSearch">
            <el-button type="success" icon="el-icon-plus" class="mr10" @click="addShare">新增</el-button>
            <plat-form :pagetype="pagetype"  @platformIdData="platformIdData" @platformAllData="platformAllData"></plat-form>
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
                    >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="名称"
                    >
                </el-table-column>
                <el-table-column
                    label="品牌"
                    >
                    <template #default="scope">
                        {{ filterPlatform(scope.row.platformId, scope.row.shopsId) }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="排序"
                    width="80">
                    <template #default="scope">
                        <span style="cursor:pointer;" @click="sortEdit(scope.row)">{{ scope.row.sort }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="图片" width="150">
                    <template #default="scope">
                        <el-image
                            class="tableImg"
                            style="width: 100px; height: 100px"
                            :src="scope.row.picUrl"
                            >
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="linkUrl"
                    label="链接"
                   >
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="活动主题"
                   >
                </el-table-column>
                <el-table-column
                    prop="docContent"
                    label="活动简介"
                    >
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    >
                    <template #default="scope">
                        {{ scope.row.createTime.substring(0,19) }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="300" align="center">
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
                            v-if="!scope.row.enable"
                        >
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
        <el-dialog  :title="typeSet == 0　? '新建':'编辑'" v-model="dialogFormVisible" width="500px">
            <el-form :model="editFrom">
                <el-form-item label="*名称" label-width="160px">
                    <el-input v-model="editFrom.name"></el-input>
                </el-form-item>
                <el-form-item label="*品牌" label-width="160px">
                    <plat-form :pagetype="pagetypeD"  @platformIdData="platformIdD" :hasChoose="chooseData"></plat-form>
                </el-form-item>
                <el-form-item label="*活动主题" label-width="160px">
                    <el-input v-model="editFrom.title"></el-input>
                </el-form-item>
                <el-form-item label="*品牌简介" label-width="160px">
                    <el-input type="textarea" v-model="editFrom.docContent"></el-input>
                </el-form-item>
                <el-form-item label="*活动跳转链接" label-width="160px">
                    <el-input v-model="editFrom.linkUrl"></el-input>
                </el-form-item>
                <el-form-item label="*活动图片（*只可上传一张）" label-width="160px">
                    <upload-img></upload-img>
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
    import http from '@/api/act'
    export default {
        inject: ['reload'],
        data() {
            return {
                pagetype: 0, // 表示品牌分享佣金配置页面
                pagetypeD: 1,
                editFrom:{},
                dialogFormVisible: false,
                tableData: [],
                formData:{

                },
                platformAll:[],
                chooseData:{}, //已经选择的id
                typeSet: 0 //0 表示新增 1 表示編輯
            }
        },
        components:{
            PlatForm,
            UploadImg
        },
        methods:{
            platformIdData(data) {
                // 接收传回来的品牌id
                this.formData.platformId = data.platformId
                this.formData.shopsId = data.shopsId
            },
            platformIdD(data){
                // 新增时接受传回来的id
                this.editFrom.platformId = data.platformId
                this.editFrom.shopsId = data.shopsId
            },
            platformAllData(data){
                this.platformAll = data
                console.log('-------------------------------')
                console.log(this.platformAll)
                console.log('-------------------------------')
            },
            enableEdit(index, row){
                // 启用 禁用
                http.shopActEnableData({
                    id: row.id,
                    enable: !row.enable
                }).then(res => {
                    this.reload()
                })
            },
            
            // 匹配店铺
            filterShopsform(platformId, shopsId){
                // 匹配店铺
                let plfname = ''
                for(let i =0;i< this.platformAll.length;i++){
                    if(this.platformAll[i].platformId == platformId && this.platformAll[i].shopsId == shopsId){
                        plfname = this.platformAll[i].label
                        break
                    }
                }
                return plfname
            },
            sortEdit(row){
                // 排序
                this.$prompt('请输入排序', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValue: row.sort,
                    inputPattern: /(^[0-9]\d*$)/,
                    inputErrorMessage: '请输入正确的排序'
                }).then(({ value }) => {
                    http.shopActSortData({
                        id: row.id,
                        sort: value
                    }).then(res => {
                        this.reload()
                    })
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '取消输入'
                    // });
                });
            },
            addShare() {
                this.dialogFormVisible = true
                this.typeSet = 0
                this.editFrom ={}
            },
            getListData() {
                this.formData.pageNum = 1
                this.formData.pageSize = 10
                http.shopActAllData(this.formData).then( res => {
                    if(res.code == 0){
                        this.$message.success('查询成功');
                        this.tableData = res.data.list
                    }else{
                        this.$message.error('查询失败'); 
                    }
                })
            },
            handleEdit(index, row) {
                this.dialogFormVisible = true
                this.typeSet = 1
                this.chooseData = {
                    shopsId : row.shopsId,
                    platformId: row.platformId
                }
                this.editFrom.platformId = row.platformId
                this.editFrom.shopsId = row.shopsId
                this.editFrom.name = row.name
                this.editFrom.title = row.title
                this.editFrom.docContent = row.docContent
                this.editFrom.linkUrl = row.linkUrl
                this.editFrom.id = row.id
            },
            handleDelete(index, row) {
                this.$confirm('确认删除该条活动吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    http.shopActDelData({
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
                let dataname = this.typeSet == 0 ? 'shopActAddData': 'shopActUpdateData'
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
        created() {
            this.getListData()
        },
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