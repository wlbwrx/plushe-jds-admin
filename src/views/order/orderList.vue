<template>
    <div class="tableStyle allocationShare">
        <div class="formSearch">
            <!-- <el-button type="success" icon="el-icon-plus" class="mr10" @click="addShare">新增</el-button> -->
            <date-time @dateValue="dateValue"></date-time>
            <plat-form :pagetype="pagetype"  @platformIdData="platformIdData" @platformAllData="platformAllData"></plat-form>
            <return-commission @returntype="returntype"></return-commission>
            <el-input placeholder="请输入商品spu" v-model="formData.productNo" class="mr10"></el-input>
            <el-button type="primary" @click="getOrderData()">搜索</el-button>
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
                    prop="orderCreateTime"
                    label="下单时间"
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
                    prop="skuNo"
                    label="sku编号"
                    >
                </el-table-column>
                <el-table-column
                    label="商品图片">
                    <template #default="scope">
                        <el-image
                            class="tableImg"
                            :src="scope.row.picUrl"
                            >
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column
                    label="基础属性"
                    >
                    <template #default="scope">
                        {{ attrChoose(scope.row) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="productName"
                    label="商品名称"
                    >
                </el-table-column>
                <el-table-column
                    prop="totalAmount"
                    label="实付总额($)"
                    >
                </el-table-column>
                <el-table-column
                    prop="productQuantity"
                    label="数量"
                    >
                </el-table-column>
                <el-table-column
                    prop="orderSn"
                    label="订单编号"
                    >
                </el-table-column>
                <el-table-column
                    prop="cmsStatus"
                    label="商品返佣状态"
                    >
                    <template #default="scope">
                        {{ cmsStatusType(scope.row.cmsStatus) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="inviteCode"
                    label="邀请码"
                    >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="分享人账号/分佣金额($)"
                    >
                    <template #default="scope">
                        {{ (scope.row.userName ? scope.row.userName : '--') + '/' + scope.row.totalCmsAmount }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="分享人上级账号/分佣金额($)"
                    >
                    <template #default="scope">
                        {{ (scope.row.puserName ? scope.row.puserName : '--') + '/' + scope.row.totalParentCmsAmount }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="售后状态"
                    >
                    <template #default="scope">
                        <div v-if="scope.row.returnApply">
                            <span class="brandBaseColor" v-if="scope.row.returnApply.returnStatus == 0">退款申请</span>
                            <span class="warningBaseColor" v-if="scope.row.returnApply.returnStatus == 1">退款处理中</span>
                            <span class="successBaseColor" v-if="scope.row.returnApply.returnStatus == 2">退款成功</span>
                            <span class="dangerBaseColor" v-if="scope.row.returnApply.returnStatus == 3">退款失败</span>
                        </div>
                        <div v-else>
                            --
                        </div>
                        
                    </template>
                </el-table-column>
                <el-table-column
                    label="售后类型"
                    >
                    <template #default="scope">
                        {{ scope.row.returnApply ?  returnApplytype(scope.row.returnApply.returnType) : '--' }}
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
    </div>
</template>

<script>
    import PlatForm from '@/components/Platform'
    import UploadImg from '@/components/UploadImg'
    import ReturnCommission from '@/components/ReturnCommission'
    import commonMixin from '@/mixins/common.js'
    import DateTime from '@/components/times/DateTime'
    import http from '@/api/order';
    export default {
        mixins: [commonMixin],
        data() {
            return {
                pagetype: 'orderList',
                formData:{
                    // 存储查询所需要的条件

                },
                dialogFormVisible: false,
                tableData: [],
            }
        },
        components:{
            PlatForm,
            UploadImg,
            ReturnCommission,
            DateTime
        },
        methods:{
            // 搜索前置条件
            searchRules(){
                if(this.formData.orderStartTime == '' || this.formData.orderEndTime == ''){
                    this.$message({
                        type: 'error',
                        message: '请选择时间范围'
                    });
                    return false
                }else{
                    return true
                }
            },
            getOrderData(){
                // 获取订单列表数据
                this.formData.pageNum = 1
                this.formData.pageSize = 10
                if(this.searchRules()){
                    http.orderListData(this.formData).then(res => {
                        console.log(res.data.list)
                        this.tableData = res.data.list
                    })
                }
                
            },
            returntype(data){
                // 接收传回来的订单状态
                this.formData.cmsStatus = data
            },
            dateValue(data){
                // 接收传回来的时间
                this.formData.orderStartTime = data.beginTime
                this.formData.orderEndTime = data.endTime
            },
            handleEdit() {

            },
            handleDelete() {

            }
        },
        created() {
            
        },
        mounted(){
            this.getOrderData()
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