<template>
    <div class="navBar">
        <el-tabs v-model="editableTabsValue" closable @tab-remove="removeTab" @tab-click="handleClick">
        <el-tab-pane
                v-for="(item) in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
            >
            <!-- {{item.content}} -->
        </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        props:['activeAdd'],
        data() {
            return {
                editableTabsValue: 'home',
                editableTabs: [{
                    title: '分享统计',
                    name: 'home',
                    content: '描述'
                }],
            }
        },
        watch:{
            editableTabsValue(val, oldVal){
                console.log('旧的 val:' + val)
                console.log('新的 val:' + oldVal)
            },
            activeAdd(data){
                this.addTab(data) //切换tab页面加载不同的路由
            }
        },
        methods: {
            handleClick(tab, event){
                this.$emit('sliderActive', this.editableTabsValue)
                this.$router.push({
                    path: this.editableTabsValue
                })
            },
            // 新增一个tab标签页面
            addTab(item){
                let newTabName = item.path;
                let isSet = [] //设置一个空数组 用于判断之前是否已经增加过路由
                this.editableTabs.map(item => {
                    isSet.push(item.name)
                })
                if(!isSet.includes(item.path)){
                    this.editableTabs.push({
                        title: item.name,
                        name: newTabName,
                        content: '描述'
                    });
                }
                this.editableTabsValue = newTabName; 
                this.$router.push({
                    path: newTabName
                })
            },
            // 移除某个tab页面
            removeTab(targetName) {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                });
                }
                
                this.editableTabsValue = activeName;
                this.$router.push({
                    path: this.editableTabsValue
                })
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
                console.log(this.editableTabs)
                if(this.editableTabs.length == 0){
                    this.editableTabs.push({
                        title: '分享统计',
                        name: 'home',
                        content: '描述'
                    })
                    this.$router.push({
                        path: 'home'
                    })
                }
            }
        },
        created() {
            // alert(this.activeAdd)
        },
        updated() {
            // view 视图更新后 改变navbar的状态 或者 新增一个
            // console.log(this.activeAdd)
            
        }
    }
</script>

<style lang="less">
    .navBar{
        .el-tabs{
            .el-tabs__active-bar{
                display:none;
            }
            .el-tabs__nav-wrap{
                &::after{
                    content:'';
                    background:none;
                }
            }
            .el-tabs__item{
                height:35px;
                line-height:30px;
                background:none;
                border:1px solid #e9eaec;
                border-radius:4px;
                padding:0 10px !important;
                margin-right:10px;
                &.is-active{
                    background:#409EFF;
                    color:#fff;
                    border:1px solid #409EFF;
                }
            }
        }
    }
</style>