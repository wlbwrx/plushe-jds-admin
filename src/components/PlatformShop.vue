<template>
    <!-- 集成所有的平台 店铺 二级联动 -->
    <div class="platform">
        <el-select v-model="platformValue" value-key="platformId" @change="selectChange" placeholder="请选择平台" class="mr10">
            <el-option
                v-for="item in platform"
                :key="item.platformId"
                :label="item.platformName"
                :value="item.platformId"
            >
            </el-option>
        </el-select>
        <el-select v-if="pagetypeData == 1 && platformValue != ''" :disabled="!shopfordata.length" value-key="id" placeholder="请选择品牌"  v-model="shopFormValue" @change="selectChange2">
            <el-option
                v-for="item in shopfordata"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            >
            </el-option>
        </el-select>
    </div>
</template>

<script>
    import http from '@/api/shop'
    export default {
        props:{
            pagetypeData: {
                type: Number
            },
            hasChoose:{
                type: Object
            }
        },
        data() {
            return {
                platform: [],
                platformValue: '',
                shopfordata: [],
                shopFormValue: ''
            }
        },
        methods: {
            getShopData() {
                http.platformShopData().then((res) => {
                    
                    if(this.pagetypeData == 0){
                        
                        // 判断当前是查询条件时 添加全部搜索条件
                        this.platform.push({
                            currency: '',
                            platformId: '',
                            platformName: '全部平台',
                            shopVos: []
                        })
                    }
                    res.data.map((item) => {
                        this.platform.push(item)
                    })
                    
                    this.$emit('platformShopData', this.platform)
                    // 在编辑平台时赋值
                    if(this.pagetypeData == 1){
                        console.log(this.hasChoose)
                        if(this.hasChoose){
                            this.platformValue = this.hasChoose.platformId
                            let shopVosS =  []
                            this.platform.map(item => {
                                if(this.platformValue == item.platformId){
                                    shopVosS = item.shopVos
                                }
                            })
                            this.shopfordata = shopVosS
                            this.shopFormValue = this.hasChoose.shopsId
                            this.$emit('addplatformid',  this.platformValue)
                            this.$emit('shopsIdAllData', this.shopFormValue)
                        }
                    }
                }).catch(error => {
                    // this.$message({
                    //     type: 'error',
                    //     message:'请求失败，请联系开发人员或者重新登录...'
                    // });
                })
            },
            selectChange() {
                let shopVosS =  []
                this.shopFormValue =''
                this.platform.map(item => {
                    if(this.platformValue == item.platformId){
                        shopVosS = item.shopVos
                    }
                })
                console.log('-----------------------------')
                console.log(shopVosS)
                console.log('-----------------------------')
                this.shopfordata = shopVosS
                // 将此时选择的平台id传给上一级
                this.$emit('platformIdAllData', this.platformValue)
                if(this.pagetypeData == 1){
                    // 当类型为新建时或者是编辑时
                    this.$emit('addplatformid',  this.platformValue)
                    // 新增一个传入平台货币符号字段
                    this.platform.map(item => {
                        if(item.id == this.platformValue){
                            this.$emit('addplatformcurrency',  item.currency)
                        }
                    })
                    
                }
            },
            selectChange2(){
                this.$emit('shopsIdAllData', this.shopFormValue)
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
        .el-select{
            &:nth-child(2){
                margin-top:10px;
            }
        }
    }
</style>