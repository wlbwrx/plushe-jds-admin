<template>
    <!-- 集成platform 获取所有的平台 -->
    <div class="platform">
        <el-select v-model="platformValue" value-key="id" @change="selectChange" placeholder="请选择店铺" class="mr10">
            <el-option
                v-for="item in platform"
                :key="item.id"
                :label="item.label"
                :value="item.id"
            >
            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
        props: ['pagetype'],
        props:{
            pagetype:{
                type: String
            },
            hasChoose: {
                type: Object
            }
        },
        data() {
            return {
                platform: [{
                    value: '',
                    label: '全部品牌'
                }],
                platformValue: ''
            }
        },
        methods: {
            getShopData() {
                this.$store
                .dispatch('getPlatform')
                .then((res) => {
                    res.data.map((item) => {
                        this.platform.push({
                            id: item.id,
                            value: item.id,
                            label: item.name,
                            shopsId: item.shopsId,
                            platformId: item.platformId
                        })
                    })
                    console.log(this.platform)
                    if(this.pagetype == 1){
                        this.platform.map(item => {
                            if(this.hasChoose.platformId == item.platformId && this.hasChoose.shopsId == item.shopsId){
                                this.platformValue = item.id
                            }
                        })
                    }
                    this.$emit('platformAllData', this.platform)
                })
                .catch( error => {
                    this.$message({
                        type: 'error',
                        message: error || '请求失败，请联系开发人员或者重新登录...'
                    });
                })
            },
            selectChange() {
                 // 过滤/匹配已经选择好的品牌 并且将值输出
                let newItem = this.platform.filter((item) => {
                    return item.id === this.platformValue
                })
                // 将此时选择的id传给上一级
                this.$emit('platformIdData', newItem && newItem[0])
            }
        },
        created() {
            // 获取平台数据
            this.getShopData()
        }
    }
</script>

<style scoped lang="less">
    .platform{
        text-align:left;
        display:inline-block;
    }
</style>