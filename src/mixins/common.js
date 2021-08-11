export default{
    data() {
        return {
            platformAll:[], // 所有的店铺列表 用于列表数据匹配
        }
    },
    methods: {
        attrChoose(data){
            // 过滤基础属性
            let a = data.attrVal1 ? data.attrVal1 : '',
                b = data.attrVal2 ? '/' + data.attrVal2 : '',
                c = data.attrVal3 ? '/' + data.attrVal3 : '',
                d = data.attrVal4 ? '/' + data.attrVal4 : ''
            return  a + b + c + d
        },
        cmsStatusType(data){
            // 商品返佣状态
            if(data === 0){
                return '不返佣'
            }else if(data === 1){
                return '待返佣'
            }else if(data === 2){
                return '已返佣'
            }else{
                return '--'
            }
        },
        returnApplytype(data){
            // 商品售后类型
            if(data == 0){
                return '整单全部退（含运费）'
            }else if(data == 1){
                return '整单全部退（不含运费）'
            }else if(data == 2){
                return '整单部分退'
            }else if(data == 3){
                return 'sku全部退'
            }else if(data == 4){
                return 'sku部分退'
            }
        },
        platformIdData(data) {
            // 接收传回来的品牌id
            this.formData.platformId = data.platformId
            this.formData.shopsId = data.shopsId
        },
        platformAllData(data){
            this.platformAll = data
            console.log('-------------------------------')
            console.log(this.platformAll)
            console.log('-------------------------------')
        },
        filterPlatform(platformId, shopsId){
            // 匹配 品牌
            let plfname = ''
            for(let i =0;i< this.platformAll.length;i++){
                if(this.platformAll[i].platformId == platformId && this.platformAll[i].shopsId == shopsId){
                    plfname = this.platformAll[i].label
                    break
                }
            }
            return plfname
        }
    }
}