<template>
    <div class="tableStyle allocationShare">
        <div class="formSearch">
            <!-- <el-button type="success" icon="el-icon-plus" class="mr10" @click="addShare">新增</el-button> -->
            <el-button type="primary" icon="el-icon-edit" class="mr10" @click="setCmsRate">批量配置高佣分佣比例</el-button>
            <el-button type="warning" icon="el-icon-delete" class="mr10" @click="deleSpuLot">批量解除</el-button>
        </div>
        <div class="formTable">
            <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                height="450"
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
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="商品名称"
                    width="100">
                </el-table-column>
                <el-table-column
                    label="商品品牌"
                    width="200">
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
                            <template #placeholder>
                                <div class="image-slot">
                                    <i class="el-icon-loading"></i>
                                    加载中<span class="dot">...</span>
                                </div>
                            </template>
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
                    >
                    <template #default="scope">
                        {{ scope.row.parentCmsRate + '%' }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="productCateOne"
                    label="所属类目"
                    width="150">
                </el-table-column>
                <el-table-column label="操作" width="300" align="center" fixed="right">
                    <template #default="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-edit"
                            @click="setCmsRate(scope.$index, scope.row)"
                        >配置高佣分佣比例</el-button>
                        <el-button
                            size="mini"
                            type="warning"
                            icon="el-icon-delete"
                            @click="deleSpuLot(scope.$index, scope.row)">
                            解除关联
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
        <el-dialog title="设置分佣比例" v-model="withCmsRate" width="450px" >
            <el-form :model="cmsRateFormData">
                <el-form-item label="*佣金类型：" label-width="160px">
                    <el-select v-model="cmsRateSelectValue" placeholder="请选择">
                        <el-option
                            v-for="item in cmsRateSelecOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="*分享人分佣比例：" label-width="160px" v-if="cmsRateSelectValue == 1">
                    <el-input v-model="cmsRateFormData.cmsRate" type="number" max="99" min="1" class="smdRateInput"></el-input>%
                </el-form-item>
                <el-form-item label="*分享人上级分佣比例：" label-width="160px" v-if="cmsRateSelectValue == 2">
                    <el-input v-model="cmsRateFormData.parentCmsRate" type="number" max="99" min="1" class="smdRateInput"></el-input>%
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="withCmsRate = false">取 消</el-button>
                <el-button type="primary" @click="saveCmsRate">提 交</el-button>
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
                platformAll:[],
                withCmsRate:false,
                cmsRateSelectValue: 1,
                cmsRateSelecOptions: [
                    {
                        label: '分享人',
                        value: 1
                    },
                    {
                        label: '分享人上级',
                        value: 2
                    }
                ],
                cmsRateFormData:{

                }
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
                http.shopHightCmsAddData(this.formData).then( res => {
                    if(res.code == 0){
                        // this.$message.success('查询成功');
                        this.tableData = res.data.list
                    }else{
                        this.$message.error('查询失败'); 
                    }
                })
            },
            deleSpuLot(index, row){
                let cmsRateList = []

                if(row){
                    cmsRateList.push(row.id)
                }else{
                    if(this.multipleSelection.length <= 0) {
                        this.$message.warning('请至少选择一个商品解除关联')
                    }else{
                        this.multipleSelection.map(item => {
                            cmsRateList.push(item.id)
                        })
                    }
                }
                this.$confirm('确认解除关联吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    http.shopCmsRemoveData({
                        idList: cmsRateList
                    }).then(res => {
                        this.$message.success('成功解除');
                        this.getListData()
                    }).catch(error => {
                        this.$message.error(error || '查询失败'); 
                    })
                }).catch(() => {
                    
                });
            },
            setCmsRate(index, row){
                
                let cmsRateList = []
                if(row){
                    this.withCmsRate = true
                    cmsRateList.push(row.id)
                    this.cmsRateFormData.idList = cmsRateList
                    this.cmsRateFormData.cmsRate = row.cmsRate
                    this.cmsRateFormData.parentCmsRate = row.parentCmsRate
                }else{
                    if(this.multipleSelection.length <= 0) {
                        this.$message.warning('请至少选择一个商品设置分佣比例')
                    }else{
                        this.withCmsRate = true
                        // 设置分佣比例id集合
                        // cmsRateFormData
                        this.multipleSelection.map(item => {
                            cmsRateList.push(item.id)
                        })
                        this.cmsRateFormData.idList = cmsRateList
                        this.cmsRateFormData.cmsRate =''
                        this.cmsRateFormData.parentCmsRate = ''
                    }
                }
                
            },
            saveCmsRate(){
                this.withCmsRate = false
                // 保存设置分佣比例
                if(this.cmsRateSelectValue == 1 && this.cmsRateFormData.cmsRate == ''){
                    this.$message.warning('请设置分享人分佣比例')
                    return false
                }
                if(this.cmsRateSelectValue == 2 && this.cmsRateFormData.parentCmsRate == ''){
                    this.$message.warning('请设置分享人上级分佣比例')
                    return false
                }
                http.shopCmsLotRate({
                    rate: this.cmsRateSelectValue == 1 ? this.cmsRateFormData.cmsRate : this.cmsRateFormData.parentCmsRate,
                    idList:this.cmsRateFormData.idList,
                    cmsType: this.cmsRateSelectValue
                }).then(res => {
                    this.$message.success('设置成功');
                    this.getListData()
                })
            }
        },
        watch: {
            '$route':'getPath'
        },
        activated(){
            
        },
        created(){
            
        },
        mounted(){
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
        &.smdRateInput{
            width:150px;
            margin-right:10px;
        }
    }
</style>