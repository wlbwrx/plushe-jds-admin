<template>
    <div class="tableStyle allocationShare">
        <div class="formSearch">
            <el-button type="success" icon="el-icon-plus" class="mr10" @click="addShare">新增</el-button>
            <plat-form :pagetype="pagetype"  @platformIdData="platformIdData" @platformAllData="platformAllData"></plat-form>
            <el-button type="primary" @click="getListData">搜索</el-button>
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
                    label="品牌"
                    width="100">
                    <template #default="scope">
                        {{ filterPlatform(scope.row.platformId, scope.row.shopsId) }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="分享图片" width="150">
                    <template #default="scope">
                        <el-image
                            class="tableImg"
                            style="width: 100px; height: 100px"
                            :src="scope.row.picVos.length > 0 ? scope.row.picVos[0].picUrl : ''"
                            >
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column
                    label="分享人分佣比例"
                    >
                    <template #default="scope">
                        {{ scope.row.cmsRate + '%' }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="分享人上级分佣比例"
                    width="200">
                    <template #default="scope">
                        {{ scope.row.parentCmsRate + '%' }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <!-- <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button> -->
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
        <el-dialog :title="typeSet == 0　? '新建':'编辑'" v-model="dialogFormVisible" width="450px">
            <el-form :model="editFrom">
                <el-form-item label="*品牌：" label-width="160px">
                    <plat-form :pagetype="pagetypeD" @platformIdData="platformIdD" :hasChoose="chooseData"></plat-form>
                </el-form-item>
                <el-form-item label="*分享人分佣比例：" label-width="160px">
                    <el-input v-model="editFrom.cmsRate" type="number" max="99" min="1"></el-input>%
                </el-form-item>
                <el-form-item label="*分享人上级分佣比例：" label-width="160px">
                    <el-input v-model="editFrom.parentCmsRate" type="number" max="99" min="1"></el-input>%
                </el-form-item>
                <el-form-item label="*品牌分享图片(*最多上传3张)：" label-width="160px">
                    <upload-img ></upload-img>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveShop">提 交</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import PlatForm from '@/components/Platform'
    import UploadImg from '@/components/UploadImg'
    import http from '@/api/shop'
    export default {
        inject:['reload'],
        data() {
            return {
                pagetype: 0, // 表示品牌分享佣金配置页面
                pagetypeD: 1,
                editFrom:{},
                dialogFormVisible: false,
                tableData: [],
                platformAll:[],
                chooseData:{}, //已经选择的id
                formData:{

                },
                typeSet: 0 //0表示新增 1表示編輯
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
            filterPlatform(platformId, shopsId){
                let plfname = ''
                for(let i =0;i< this.platformAll.length;i++){
                    if(this.platformAll[i].platformId == platformId && this.platformAll[i].shopsId == shopsId){
                        plfname = this.platformAll[i].label
                        break
                    }
                }
                return plfname
            },
            getListData() {
                this.formData.pageNum = 1
                this.formData.pageSize = 10
                http.shopShareAllData(this.formData).then( res => {
                    if(res.code == 0){
                        // this.$message.success('查询成功');
                        this.tableData = res.data.list
                    }else{
                        this.$message.success('查询失败'); 
                    }
                })
            },
            addShare() {
                this.dialogFormVisible = true
                this.typeSet = 0
                this.editFrom ={}
            },
            handleEdit(index, row) {
                this.dialogFormVisible = true
                this.typeSet = 1
                this.chooseData = {
                   platformId:row.platformId,
                   shopsId: row.shopsId, 
                }
                this.editFrom ={
                    platformId:row.platformId,
                    shopsId: row.shopsId,
                    cmsRate: row.cmsRate,
                    parentCmsRate: row.parentCmsRate,
                    id: row.id
                }
            },
            // handleDelete(index, row) {
            //     this.$confirm('确认删除该条数据?', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(() => {
            //         http.shopShareDelData({
            //             id: row.id
            //         }).then(res => {
            //             this.reload()
            //         }).catch(error => {
            //             // this.$message.error(error || '查询失败'); 
            //         })
            //     }).catch(() => {
                    
            //     });
            // },
            saveShop() {
                this.dialogFormVisible = false
                let dataname = this.typeSet == 0 ? 'shopShareAddData': 'shopShareUpdateData'
                http[dataname](this.editFrom).then( res => {
                     if(res.code == 0){
                         this.reload()
                        this.$message.success('添加成功');
                    }else{
                        this.$message.success('添加失败'); 
                    }
                })
            }
        },
        created() {
            this.getListData()
        },
        mounted(){
            
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
        .el-input{
            width:200px;
            margin-right:5px;
        }
    }
    
    
</style>