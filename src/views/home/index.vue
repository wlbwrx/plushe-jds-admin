<template>
    <div class="plushe-jds-admin-home">
        <!-- 首页内容 -->
        <el-container>
            <el-header>
                <div class="gds-logo">
                    <img class="el-image" src="../../assets/gee-logo.png" alt="">
                </div>
                <div class="gds-header-tabshow">
                    <div class="gds-header-tabs">
                        <nav-bar :activeAdd="navToBar" @sliderActive="sliderActive"></nav-bar>
                    </div>
                    <div class="gds-header-right">
                        <el-dropdown trigger="click" @command="handleCommand">
                            <span class="el-dropdown-link">
                                Admin <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item icon="el-icon-user" command="personal">个人详情</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-remove-outline" command="logOut">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <!-- 加载左侧下拉表 -->
                    <side-bar @tabsPath="sideToNav" :navActive="navActive"></side-bar>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import SideBar from '@/components/Sidebar.vue';
    import NavBar from '@/components/NavBar.vue';
    export default {
        data() {
            return {
                logoUrl: '',
                navToBar: {},
                navActive: 'home'
            }
        },
        components:{
            SideBar,
            NavBar
        },
        methods: {
            sliderActive(data){
                // 将nav点中的值传给sidebar
                this.navActive = data
            },
            handleCommand(command) {
                if(command == 'logOut'){
                    // 点击退出登录触发的方法
                    this.$confirm('是否退出系统?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '已退出登录!'
                        });
                        this.$store
                        .dispatch('loginOut')
                        .then(() => {
                            this.$router.push('/login');
                        }) 
                        .catch(() => {
                            console.log('请求失败')
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消'
                        });
                    });

                }else if(command == 'personal'){
                    // 点击跳个人中心的方法
                    this.$message('正在跳转至个人中心页面');
                }
            },
            sideToNav(item){
                console.log(item)
                this.navToBar = item
                // console.log(item)
            }
        }
    }
</script>

<style scoped lang="less">
    .el-container{
        height:100vh;
        background:#f2f2f2;
        .el-aside{
            background:rgb(50, 65, 87);
            height:calc(100% - 60px);
        }
        .el-main{
            height:calc( 100vh - 60px );
        }
        .el-header{
            display:-webkit-flex;
            display:flex;
            height:55px;
            background:#fff;
            padding:0;
            .gds-logo{
                width:200px;
                background:rgb(50, 65, 87);
                height:60px;
                .el-image{
                    width:130px;
                    margin-top:20px;
                }
            }
            .gds-header-tabshow{
                width:calc(100% - 200px);
                display:-webkit-flex;
                display:flex;
                .gds-header-tabs{
                    width:calc(100% - 100px);
                    padding:12px 20px;
                }
                .gds-header-right{
                    cursor:pointer;
                    width: 100px;
                    height: 60px;
                    line-height: 60px;
                }
            }
        }
    }
</style>