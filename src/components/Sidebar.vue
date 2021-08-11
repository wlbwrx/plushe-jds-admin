<template>
    <div class="sideBar">
        <el-menu
            :uniqueOpened="true"
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            background-color="rgb(50, 65, 87)"
            text-color="#fff"
            active-text-color="#409eff"
            >
            <div v-for="item in sideBarlist" :key="item.path" :name="item.name">
                <el-submenu :index="item.path" v-if="item.subs">
                    <template #title>
                        <i :class="item.icon"></i>
                        <span>{{ item.name }}</span>
                    </template>
                    <div v-for="items in item.subs" :key="items.path" :name="items.name">
                        <el-submenu :index="items.path" v-if="items.subs">
                            <template #title>{{ items.name }}</template>
                            <el-menu-item :index="itemss.path" v-for="itemss in items.subs" :key="itemss.path" :name="itemss.name"  @click="handleSelect(itemss)">{{ itemss.name }}</el-menu-item>
                        </el-submenu>
                        <el-menu-item :index="items.path"  @click="handleSelect(items)">{{ items.name }}</el-menu-item>
                    </div>
                </el-submenu>


                <el-menu-item :index="item.path" v-else @click="handleSelect(item)">
                    <i class="el-icon-menu"></i>
                    <template #title>{{ item.name }}</template>
                </el-menu-item>
            </div>
        </el-menu>
    </div>
</template>

<script>
    import sideList from '@/common/sideBar'
    export default {
        props:{
            navActive: {
                type: String
            }
        },
        data() {
            return {
                sideBarlist : sideList,
                defaultActive: 'home'
            }
        },
        watch: {
            navActive(val, oldVal){
                this.defaultActive = val
            }
        },
        methods: {
            handleSelect(item) {
                // 将值传给不同的组件
                this.$emit('tabsPath', item)
                // key 表示当前的key值 也就是当前点击的路径
                // this.$router.push({
                //     path: item.path
                // })
            }
        },
        created() {
            // console.log(new Proxy(this.sideBarlist))
        }
    }
</script>

<style scoped lang="less">
    .sideBar{
        .el-menu{
            width:100%;
            height: calc(100% - 55px) ;
            overflow:auto;
            border:0;
            .el-submenu,.el-menu-item{
                text-align: left;
            }
        }
    }
    
</style>