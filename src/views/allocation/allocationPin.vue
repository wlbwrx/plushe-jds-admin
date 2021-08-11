<template>
    <div class="tableStyle allocationShare">
        <div class="formSearch">
            <el-button type="success" icon="el-icon-plus" class="mr10" @click="addShare">新增</el-button>
            <platform-shop :pagetypeData="pagetypeData" @platformShopData="platformShopData" @platformIdAllData="platformIdAllData"></platform-shop>
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
                    
                    label="平台"
                    width="100">
                    <template #default="scope">
                        {{ filterPlatDorm(scope.row.platformId) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="店铺"
                    width="100">
                   
                </el-table-column>
                <el-table-column
                    prop="shopDomain"
                    label="平台域名"
                    width="300">
                </el-table-column>
                <el-table-column
                    label="排序"
                    width="50"
                    >
                    <template #default="scope">
                        <span style="cursor:pointer;" @click="sortEdit(scope.row)">{{ scope.row.sort }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="logoPicUrl"
                    label="LOGO" width="150">
                    <template #default="scope">
                        <el-image
                            class="tableImg"
                            style="width: 100px; height: 100px"
                            :src="$utils.imageHandler(0, scope.row.logoPicKey)"
                            >
                        </el-image>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="docContent"
                    label="简介"
                    width="200">
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    width="200">
                    <template #default="scope">
                        {{ scope.row.createTime.substring(0,19) }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
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
        <el-dialog :title="typeSet == 0　? '新建':'编辑'" v-model="dialogFormVisible" width="400px">
            <el-form :model="editFrom">
                <el-form-item label="*平台&店铺" label-width="100px">
                    <platform-shop :pagetypeData="typenewadd" @platformShopData="platformShopData" @addplatformid="addplatformid" @shopsIdAllData="shopsIdAllData" :hasChoose="chooseData" @addplatformcurrency="currencyId"></platform-shop>
                </el-form-item>
                <el-form-item label="*平台域名" label-width="100px">
                    <el-input v-model="editFrom.shopDomain"></el-input>
                </el-form-item>
                <el-form-item label="*LOGO图片  (*只可上传1张)" label-width="100px">
                    <!-- <upload-img ></upload-img> -->
                    <BaseSelectImg :formItem="{ limit: 20, belongRootId: 4 }"  @recieveImglist="chooseDataList"/>
                </el-form-item>
                <!-- <el-form-item label="*详情页配置链接" label-width="100px">
                    <el-input v-model="editFrom.name"></el-input>
                </el-form-item> -->
                <el-form-item label="*品牌简介" label-width="100px">
                    <el-input type="textarea" v-model="editFrom.docContent"></el-input>
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
    import PlatformShop from '@/components/PlatformShop'
    import commonMixin from '@/mixins/common.js'
    import http from '@/api/shop'
    export default {
        mixins: [commonMixin],
        inject:['reload'],
        data() {
            return {
                pagetypeData: 0, // 0表示查询条件 1 表示新增
                typenewadd: 1, //0表示查询条件 1 表示新增
                editFrom:{
                    
                },
                dialogFormVisible: false,
                tableData: [],
                formData:{

                },
                platformAll:[],
                chooseData:{},
                typeSet: 0 //0 代表新建 1 代表编辑 
            }
        },
        watch:{
           
        },
        components:{
            PlatformShop
        },
        methods:{
            platformShopData(data){
                // 接收所有的平台
                this.platformAll = data
            },
            platformIdData(data) {
                // 接收传回来的品牌id
                this.formData.platformId = data.platformId
                this.formData.shopsId = data.shopsId
            },
            // 接收返回来的图片参数
            chooseDataList(data){
                this.editFrom.logoPicKey = data[0].picKey
            },
            getListData() {
                this.formData.pageNum = 1
                this.formData.pageSize = 10
                http.shopListData(this.formData).then( res => {
                    if(res.code == 0){
                        this.$message.success('查询成功');
                        this.tableData = res.data.list
                    }else{
                        this.$message.success('查询失败'); 
                    }
                })
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
                    http.platformSortData({
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
            enableEdit(index, row){
                // 启用 禁用
                http.platformEablepData({
                    id: row.id,
                    enable: !row.enable
                }).then(res => {
                    this.reload()
                })
            },
            // 匹配平台
            filterPlatDorm(platformId){
                let plfname = ''
                this.platformAll.map(item => {
                    if(item.platformId == platformId){
                        plfname = item.platformName
                    }
                })
                return plfname
            },
            // 匹配店铺
            filterShopsform(platformId, shopsId){
                // 匹配店铺
                let plfname = ''
                if(this.platformAll.shopVos && this.platformAll.shopVos.length == 0){
                    this.platformAll.map(item => {
                        if(item.platformId == platformId){
                            plfname = item.platformName
                        }
                    })
                }else{
                    this.platformAll.map(item => {
                        if(item.platformId == platformId){
                            item.shopVos.map(items => {
                                if(item.shopsId == shopsId){
                                    plfname = items.label
                                }
                            })
                        }
                    })
                }
                return plfname
            },
            handleEdit(index, row) {
                // 编辑品牌
                this.dialogFormVisible = true
                this.typeSet = 1
                this.chooseData = {
                    shopsId : row.shopsId,
                    platformId: row.platformId
                }
                // 赋值
                this.editFrom.shopDomain = row.shopDomain
                this.editFrom.docContent = row.docContent
                this.editFrom.id = row.id
            },
            handleDelete(index, row) {
                this.$confirm('确认删除该品牌?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    http.platformDeleteData({
                        id: row.id
                    }).then(res => {
                        this.reload()
                    }).catch(error => {
                        this.$message.error(error || '查询失败'); 
                    })
                }).catch(() => {
                    
                });
            },
            currencyId(data){
                // 接受返回来的货币符号
                this.editFrom.currency = data
            },
            platformIdAllData(data){
                console.log(data)
                // 接收集返回来的平台id
                this.formData.platformId = data
            },
            addplatformid(data){
                // 接受新建时的平台id
                this.editFrom.platformId = data
            },
            shopsIdAllData(data){
                // 接收返回来的店铺id
                this.editFrom.shopsId = data
            },
            saveShop() {
                // 校验
                if(this.editFrom.platformId == undefined || this.editFrom.platformId == ''){
                    this.$message.warning('请选择平台')
                    return false
                }
                if(!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/.test(this.editFrom.shopDomain)){
                    this.$message.warning('请输入合法的平台域名')
                    return false
                }
                if(this.editFrom.logoPicKey == '' ||　this.editFrom.logoPicKey == undefined){
                    this.$message.warning('请选择一张图片')
                    return false
                }
                if(this.editFrom.docContent == '' ||　this.editFrom.docContent == undefined){
                    this.$message.warning('请输入简介')
                    return false
                }
                this.dialogFormVisible = false
                let dataname = this.typeSet == 0 ? 'addShopData': 'platformUpdateData'
                http[dataname](this.editFrom).then( res => {
                     if(res.code == 0){
                        this.$message.success('添加成功');
                        this.reload()
                    }else{
                        this.$message.success('添加失败'); 
                    }
                }).catch(error => {
                    this.$message.error('新增失敗'); 
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
    }
    
    
</style>