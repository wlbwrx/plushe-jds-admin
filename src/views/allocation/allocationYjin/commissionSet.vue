<template>
    <div class="tableStyle allocationShare">
        <div class="formSearch">
             <el-form v-model="editFrom">
                <el-form-item label="分销品牌：" label-width="150px">
                    <el-input v-model="editFrom.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="商品spu（批量）：" label-width="150px">
                    <el-input v-model="editFrom.name"></el-input>
                </el-form-item>
                <el-form-item label="商品名称：" label-width="150px">
                    <el-input v-model="editFrom.name"></el-input>
                </el-form-item>
                <el-form-item label="所属类目" label-width="150px">
                    <el-input v-model="editFrom.name"></el-input>
                </el-form-item>
                <el-button type="primary" icon="el-icon-search" class="mr10" @click="getListData" style="margin-left:15px;">搜索</el-button>
            </el-form>
        </div>
        <div class="formTable">
            <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                height="300"
                border
                default-expand-all
                @selection-change="handleSelectionChange"
                >
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="productNo"
                    label="商品SPU"
                    >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="商品名称"
                    >
                </el-table-column>
                <el-table-column
                    label="商品品牌"
                    >
                    <template #default="scope">
                        {{ filterPlatform(scope.row.platformId, scope.row.shopsId) }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="商品图片" width="150">
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
                    prop="productCateOne"
                    label="所属类目"
                    >
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
                <el-button type="primary" @click="saveShop">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import PlatForm from '@/components/Platform'
    import UploadImg from '@/components/UploadImg'
    import http from '@/api/hightCms'
    export default {
        props:{
            shopAplatform: {
                type: Object
            },
            allplatform:{
                type: Object
            }
        },
        data() {
            return {
                editFrom:{},
                dialogFormVisible: false,
                tableData: [],
                formData:{},
                multipleSelection: [],
                platformAll:[]
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

            },
            handleSelectionChange(val) {
                // 已经勾选的
                this.multipleSelection = val;
                this.$emit('multipleSelectionData', val)
            },
            filterPlatform(platformId, shopsId){
                this.platformAll = this.allplatform
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
                this.formData.platformId = this.shopAplatform.platformId
                this.formData.shopsId = this.shopAplatform.shopsId
                http.shopHightCmsUpdateData(this.formData).then( res => {
                    if(res.code == 0){
                        this.$message.success('查询成功');
                        this.tableData = res.data.list
                    }else{
                        this.$message.error('查询失败'); 
                    }
                })
            },
            saveShop(){
                if(this.multipleSelection.length <= 0) {
                    this.$message.warning('请至少选择一个商品关联')
                }else{
                    this.$confirm('确认要关联选中商品吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // http.shopWithSpuData({
                        //     id: row.id
                        // }).then(res => {
                        //     this.reload()
                        // }).catch(error => {
                        //     this.$message.error(error || '查询失败'); 
                        // })
                    }).catch(() => {
                        
                    });
                }
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
    .formSearch{
        /deep/.el-form-item{
            display:inline-block
            
        }
        .el-input{
            width:150px;
        }
    }
    
</style>