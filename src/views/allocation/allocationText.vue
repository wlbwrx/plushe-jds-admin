<template>
    <div class="tableStyle allocationShare">
        <div class="formSearch">
            <el-button type="success" icon="el-icon-plus" class="mr10" @click="addShare">新增</el-button>
            <plat-form :pagetype="pagetype"  @platformIdData="platformIdData" @platformAllData="platformAllData"></plat-form>
            <share-type @shareTypeData="shareTypeData"></share-type>
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
                    label="配置类型"
                    width="150">
                    <template #default="scope">
                        {{ shareTypeData(scope.row.shareType) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="docContentList"
                    label="分享文案">
                    <template #default="scope">
                        <p v-for="(item, index) in scope.row.docContentList" :key="index">
                            {{ (index + 1) + '、 '}} {{ item }}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    width="200">
                    <template #default="scope">
                        {{ scope.row.createTime.substring(0,19) }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="250">
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
        <el-dialog :title="typeSet == 0　? '新建':'编辑'" v-model="dialogFormVisible" width="400px">
            <el-form :model="editFrom">
                <el-form-item label="*品牌" label-width="100px">
                    <plat-form :pagetype="pagetypeD"  @platformIdData="platformIdD" :hasChoose="chooseData"></plat-form>
                </el-form-item>
                <el-form-item label="*配置类型" label-width="100px">
                    <share-type :pagetype="pagetypeD" @shareTypeData="shareTypeDd" :hasChooseType="shareHasType"></share-type>
                </el-form-item>
                <el-form-item label="*分享文案" label-width="100px">
                    <div v-for="(item, index) in docContent" :key="item.id" class="inputTextDiv">
                        <el-input v-model="item.name" class="inputText"></el-input>
                        <el-button type="danger" icon="el-icon-folder-remove" size="mini" circle @click="delContent(index)"></el-button>
                    </div>
                    <div class="newAddInput">
                        <el-button type="primary" class="add" icon="el-icon-folder-add" size="mini" circle @click="addNewInput"></el-button>
                    </div>
                    
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
    import ShareType from '@/components/shareType'
    import UploadImg from '@/components/UploadImg'
    import http from '@/api/shop'
    export default {
        inject: ['reload'],
        data() {
            return {
                pagetype: 0, // 表示品牌分享佣金配置页面
                pagetypeD: 1,
                editFrom:{},
                docContent: [
                    {
                        name: '',
                        id: 1
                    }
                ],
                dialogFormVisible: false,
                tableData: [],
                chooseData:{}, //已经选择的id
                platformAll:[],
                formData:{

                },
                typeSet: 0 //0表示新增 1表示編輯
            }
        },
        components:{
            PlatForm,
            UploadImg,
            ShareType
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
            
            // 分享类型
            shareTypeData(data){
                this.formData.shareType = data
            },
            // 新增或者修改时的类型
            shareTypeDd(data){
                this.editFrom.shareType = data
            },
            // 删除数组中的元素
            delContent(index){
                console.log(this.docContent.length)
                console.log(this.docContent)
                if(this.docContent.length > 1){
                    this.docContent.splice(index, 1)
                }else{
                    this.$message.warning('至少添加一条分享文案'); 
                }
                
            },
            // 新增一条输入分享文案
            addNewInput(){
                this.docContent.push({
                    name: '',
                    id: ''
                })
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
            shareTypeData(data){
                if(data == 0){
                    return '分享品牌'
                }else if(data == 1){
                    return '分享分类'
                }else if(data == 2){
                    return '分享商品'
                }else if(data == 3){
                    return '邀请成员'
                }else{
                    return  '--'
                }
            },
            getListData() {
                this.formData.pageNum = 1
                this.formData.pageSize = 10
                http.shopTextAllData(this.formData).then( res => {
                    if(res.code == 0){
                        this.$message.success('查询成功');
                        this.tableData = res.data.list
                    }else{
                        this.$message.error('查询失败'); 
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
                    shopsId : row.shopsId,
                    platformId: row.platformId
                }
                this.shareHasType = row.shareType
                let newdocContent = []
                row.docContentList.map(item => {
                    newdocContent.push({
                        name: item
                    })
                })
                this.docContent = newdocContent
                this.editFrom.platformId = row.platformId
                this.editFrom.shopsId = row.shopsId
                this.editFrom.shareType = row.shareType
                this.editFrom.id = row.id
            },
            // handleDelete(index, row) {
            //     this.$confirm('确认删除该条文案吗?', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(() => {
            //         http.shopTextDelData({
            //             id: row.id
            //         }).then(res => {
            //             this.reload()
            //         }).catch(error => {
            //             this.$message.error(error || '查询失败'); 
            //         })
            //     }).catch(() => {
                    
            //     });
            // },
            saveShop() {
                this.dialogFormVisible = false
                let newdocContent = []
                this.docContent.map(item => {
                    newdocContent.push(item.name)
                })
                this.editFrom.docContent = newdocContent
                let dataname = this.typeSet == 0 ? 'shopTextAddData': 'shopTextUpdateData'
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
        .inputTextDiv{
            margin-top:10px;
        }
        .inputText{
            width:210px;
            margin-right:5px;
        }
        .newAddInput{
            text-align:right;
            .add{
                margin-right:17px;
            }
        }
    }
    
    
</style>