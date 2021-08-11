<template>
    <div class="tableStyle drawalList">
        <div class="formSearch">
            <el-input placeholder="请输入用户邮箱" v-model="searData.paypalEmail" class="mr10"></el-input>
            <el-input placeholder="请输入Paypal账户" v-model="searData.paypalEmail" class="mr10"></el-input>
            <draw-status></draw-status>
            <el-button type="primary" @click="drawListFuc">搜索</el-button>
        </div>
        <div class="formTable">
            <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                :header-cell-style="redHeader"
                border
                default-expand-all
                >
                <el-table-column
                    prop="id"
                    label="序号"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="提现时间"
                    >
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="用户姓名"
                    >
                    <template #default="scope">
                        {{ scope.row.user.firstName + ' ' + scope.row.user.lastName}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="paypalName"
                    label="PayPal账户姓名"
                    >
                </el-table-column>
                <el-table-column
                    prop="user.userEmail"
                    label="用户邮箱"
                    >
                </el-table-column>
                <el-table-column
                    prop="withdrawnable"
                    label="账户可提现金额"
                    >
                </el-table-column>
                <el-table-column
                    prop="paypalEmail"
                    label="PayPal账户"
                    >
                </el-table-column>
                <el-table-column
                    prop="applyWithdraw"
                    label="提现金额"
                    >
                </el-table-column>
                <el-table-column
                    prop="serviceFee"
                    label="提现手续费"
                    >
                </el-table-column>
                <el-table-column
                    prop="approveStatus"
                    label="审核状态"
                    >
                    <template #default="scope">
                        <span v-if="scope.row.approveStatus == 0">待审核</span>
                        <span v-if="scope.row.approveStatus == 1">通过-提现成功</span>
                        <span v-if="scope.row.approveStatus == 2">通过-提现失败</span>
                        <span v-if="scope.row.approveStatus == 3">驳回</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="approveRemark"
                    label="备注"
                    width="200">
                </el-table-column>
                 <el-table-column label="操作" width="400" align="center">
                    <template #default="scope">
                        <el-button
                            size="mini"
                            type="success"
                            icon="el-icon-view"
                            @click="handleEdit(scope.$index, scope.row)"
                        >查看个人详细信息</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-edit"
                            @click="passEdit(scope.$index, scope.row)"
                           
                        >通过</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.$index, scope.row)"
                            >
                            驳回
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
        <el-dialog title="个人详细信息" v-model="dialogFormVisible" width="550px" class="dislog-form">
            <el-form :model="editFrom">
                <el-form-item label="First Name" label-width="150px">
                    <el-input v-model="editFrom.user.firstName" disabled></el-input>
                </el-form-item>
                <el-form-item label="Last Name" label-width="150px">
                    <el-input v-model="editFrom.user.lastName" disabled></el-input>
                </el-form-item>
                <el-form-item label="Country/Region" label-width="150px">
                    <el-input v-model="editFrom.user.country" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户账号" label-width="150px">
                    <el-input v-model="editFrom.user.userId" disabled></el-input>
                </el-form-item>
                <el-form-item label="PayPal账户姓名" label-width="150px">
                    <el-input v-model="editFrom.paypalName" disabled></el-input>
                </el-form-item>
                <el-form-item label="提现PayPal账户" label-width="150px">
                    <el-input v-model="editFrom.paypalEmail" disabled></el-input>
                </el-form-item>
                <el-form-item label="账户可提现金额" label-width="150px">
                    <el-input v-model="editFrom.withdrawnable" disabled></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog title="通过说明" v-model="passPaypal" width="550px" class="dislog-form">
            <div>
                <p>
                    <span>用户真实姓名:</span>
                    <span>
                        {{passFrom.user.firstName + ' ' + passFrom.user.lastName}}
                    </span>
                </p>
                <p>
                    <span>提款Paypal账户姓名:</span>
                    <span>
                        {{passFrom.paypalName}}
                    </span>
                </p>
            </div>
            <p>请确认提款PayPal姓名与用户真实姓名是否一致。</p>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="passPaypal = false">取 消</el-button>
                <el-button type="primary" @click="passSave">提交</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import http from '@/api/user';
    import DrawStatus from '@/components/status/drawStatus'
    export default {
        data() {
            return {
                editFrom:{},
                passFrom:{},
                dialogFormVisible: false,
                passPaypal:false,
                searData:{
                    paypalEmail: ''
                },
                tableData: [],
            }
        },
        components:{
            DrawStatus
        },
        methods:{
            drawListFuc(){
                this.searData.pageNum = 1
                this.searData.pageSize = 10
                http.withDrawData(this.searData).then((res) => {
                    console.log(res.data)
                    this.tableData = res.data.list
                }).catch(error => {

                })
            },
            redHeader({column}) {
                // console.log(row)
                console.log(column.label)
                if(column.label == 'PayPal账户姓名' || column.label == 'PayPal账户' || column.label == '提现金额' || column.label ==  '提现手续费'){
                    return 'color:#ff0000;'
                }
            },
            handleEdit(index, row) {
                this.dialogFormVisible = true
                this.editFrom = row
            },
            passEdit(index, row){
                this.passPaypal = true
                this.passFrom = row
            },
            handleDelete() {

            },
            passSave(){
                this.passPaypal = false
                http.withDrawPassData({
                    id: this.passFrom.id,
                    approveStatus: 1,
                    platformName: 'GDS'
                }).then((res) => {
                    
                }).catch(error => {

                })
            }
        },
        created() {
            this.drawListFuc()
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
    .redHeaderName{
        color:red;
    }
    .el-input{
        width:200px;
    }
    .el-dialog{
        .el-form{
            padding:0 30px;
            height:500px;
            overflow:auto;
            .el-input{
                width:300px;
            }
        }
        
    }
</style>