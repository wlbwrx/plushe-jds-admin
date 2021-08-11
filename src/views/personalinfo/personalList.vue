<template>
    <div class="tableStyle personalList">
        <div class="formSearch">
            <el-input placeholder="请输入用户邮箱" v-model="searData.userEmail" class="mr10"></el-input>
            <el-input placeholder="请输入邀请码" v-model="searData.inviteCode" class="mr10"></el-input>
            <el-input placeholder="请输入邀请人邀请码" v-model="searData.invitePcode" class="mr10"></el-input>
            <el-button type="primary" @click="userListFuc">搜索</el-button>
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
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="userEmail"
                    label="用户邮箱"
                    width="150">
                </el-table-column>
                <el-table-column
                    label="头像"
                    width="150">
                    <template #default="scope">
                        <el-image :src="scope.row.headPhoto"></el-image>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="inviteCode"
                    label="邀请码"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="invitePcode"
                    label="邀请人邀请码"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="totalGained"
                    label="累计佣金"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="memberQuantity"
                    label="成员数"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="memberTotalGained"
                    label="成员提供佣金"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="创建时间"
                    width="200">
                    
                </el-table-column>
                 <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button
                            size="mini"
                            type="success"
                            icon="el-icon-view"
                            @click="seePersonalDetail(scope.$index, scope.row)"
                        >查看个人详细信息</el-button>
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
        <el-dialog title="个人详细信息：" v-model="dialogFormVisible" width="550px" class="dislog-form">
            <el-form :model="editFrom">
                <el-form-item label="First Name：">
                    <span>
                        {{ editFrom.firstName }}
                    </span>
                </el-form-item>
                <el-form-item label="Last Name：">
                    <span>
                        {{ editFrom.lastName }}
                    </span>
                </el-form-item>
                <el-form-item label="Country/Region：">
                    <span>
                        {{ editFrom.country }}
                    </span>
                </el-form-item>
                <el-form-item label="Social software：" >
                    <span>
                        {{ editFrom.socialSoftware }}
                    </span>
                </el-form-item>
                <el-form-item label="Account Name（ID）：">
                    <span>
                        {{ editFrom.socialAccount }}
                    </span>
                </el-form-item>
                <el-form-item label="Main promotional market:">
                    <div v-if="editFrom.promotionMarketVoList" class="editFromUl">
                        <span v-for="item in editFrom.promotionMarketVoList" :key="item.id">
                           <div>marketType: {{ item.marketType }}</div>
                            <div>monthAvgTraffic: {{item.monthAvgTraffic}}</div>
                        </span>
                    </div>
                    <span v-else> -- </span>
                </el-form-item>
                <el-form-item label="Main promotional type:">
                    <div v-if="editFrom.promotionTypeVoList" class="editFromUl">
                        <span v-for="item in editFrom.promotionTypeVoList" :key="item.id">
                            <div>type: {{ item.type }}</div>
                            <div>URL: {{item.url}}</div>
                        </span>
                    </div>
                    <span v-else> -- </span>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import http from '@/api/user';
    export default {
        data() {
            return {
                editFrom:{},
                dialogFormVisible: false,
                tableData: [],
                searData:{
                    userEmail: '',
                    inviteCode: '',
                    invitePcode: ''
                }
            }
        },
        components:{
            
        },
        methods:{
            userListFuc(pageNum, pageSize){
                this.searData.pageNum = pageNum
                this.searData.pageSize = pageSize
                http.userListData(this.searData).then((res) => {
                    console.log(res.data)
                    this.tableData = res.data.list
                }).catch(error => {

                })
            },
            addShare() {
                this.dialogFormVisible = true
                this.editFrom ={}
            },
            seePersonalDetail(index, row) {
                this.dialogFormVisible = true
                http.userDetailData({
                    userId: row.userId
                }).then(res => {
                    console.log(res.data)
                    this.editFrom = res.data
                }).catch(error => {
                    console.log(error.data)
                })
            },
            handleDelete() {

            }
        },
        created(){
            this.userListFuc(1, 10)
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
    .el-dialog{
        .el-form{
            padding:0 30px;
            height:500px;
            overflow:auto;
            .el-form-item{
                margin-bottom:0;
                display:-webkit-flex;
                display:flex;
                /deep/.el-form-item__label{
                    width:170px;
                    text-align: right;
                }
            }
            .el-input{
                width:100%;
            }
        }
        .editFromUl{
            margin-left:3px;
            span{
                display: block;
                background: #f1f1f1;
                padding:5px 10px;
                margin-top: 5px;
                div{
                    line-height:25px;
                }
            }
        }
    }
</style>