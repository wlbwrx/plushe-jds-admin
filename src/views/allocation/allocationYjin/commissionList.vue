<template>
    <div class="tableStyle allocationShare">
        <div class="formSearch">
            <!-- <el-button type="success" icon="el-icon-plus" class="mr10" @click="addShare">新增</el-button> -->
            <plat-form :pagetype="pagetype"  @platformIdData="platformIdData" @platformAllData="platformAllData"></plat-form>
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
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column
                    label="品牌"
                    >
                    <template #default="scope">
                        {{ filterPlatform(scope.row.platformId, scope.row.shopsId) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="productCount"
                    label="关联商品数量"
                    >
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button
                            size="mini"
                            type="success"
                            icon="el-icon-view"
                            @click="seeList(scope.$index, scope.row)"
                        >查看商品</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-lock"
                            @click="withList(scope.$index, scope.row)"
                        >关联商品</el-button>
                        <el-button
                            size="mini"
                            type="warning"
                            icon="el-icon-unlock"
                            @click="seeList(scope.$index, scope.row)"
                            v-if="scope.row.productCount > 0"
                        >解除关联</el-button>
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
        <el-dialog title="查看关联商品" v-model="dialogFormVisible" width="1200px">
            <commission-see :shopAplatform="shopAplatform" :allplatform="platformAll" v-if="dialogFormVisible"></commission-see>
            <template #footer>
                <span class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false">关闭</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog title="关联商品" v-model="spuProductShow" width="1200px">
            <commission-set :shopAplatform="shopAplatform" :allplatform="platformAll" @multipleSelectionData="multipleSelectionData" v-if="spuProductShow"></commission-set>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveSpulist">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import PlatForm from '@/components/Platform'
    import UploadImg from '@/components/UploadImg'
    import CommissionSee from './commissionSee'
    import CommissionSet from './commissionSet'
    import http from '@/api/hightCms'
    export default {
        data() {
            return {
                editFrom:{},
                dialogFormVisible: false,
                tableData: [],
                platformAll:[],
                formData:{

                },
                spuListdata:[],
                shopAplatform:{},
                spuProductShow: false, // 关联商品
                chooseSpuList:[]
            }
        },
        components:{
            PlatForm,
            UploadImg,
            CommissionSee,
            CommissionSet
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
            addShare() {
                // this.dialogFormVisible = true
                // this.editFrom ={}
            },
            multipleSelectionData(data){
                // 关联时选择的商品数据
                this.chooseSpuList = data
            },
            saveSpulist(){
                console.log(this.chooseSpuList)
                if(this.chooseSpuList.length <= 0) {
                    this.$message.warning('请至少选择一个商品关联')
                }else{
                    this.$confirm('确认要关联选中商品吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let spuRealList = []
                        this.chooseSpuList.map(item => {
                            spuRealList.push(item.productNo)
                        })
                        http.shopWithSpuData({
                            platformId: this.shopAplatform.platformId,
                            shopsId: this.shopAplatform.shopsId,
                            spuList: spuRealList
                        }).then(res => {
                            this.spuProductShow = false
                            this.reload()
                        }).catch(error => {
                            this.$message.error('查询失败'); 
                        })
                    }).catch(() => {
                        
                    });
                }
            },
            seeList(index, row) {
                this.dialogFormVisible = true
                this.shopAplatform = {
                    platformId: row.platformId,
                    shopsId: row.shopsId
                }
            },
            withList(index, row){
                this.spuProductShow = true
                this.shopAplatform = {
                    platformId: row.platformId,
                    shopsId: row.shopsId
                }
            },
            handleDelete() {

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
                http.shopHightCmsAllData(this.formData).then( res => {
                    if(res.code == 0){
                        this.$message.success('查询成功');
                        this.tableData = res.data.list
                    }else{
                        this.$message.error('查询失败'); 
                    }
                })
            },
        },
        created() {
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
</style>