<template>
    <div class="imgUpload">
        <el-button class="el-upload--picture-card" icon="el-icon-plus" @click="openImage"></el-button>
        <!-- <el-dialog v-model="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> -->
        <el-dialog top="5vh" title="选择图片" v-model="selVisibility" :close-on-press-escape="false" width="90%">
            <BaseImageSpace ref="imageSpace" :belongRootId="formItem.belongRootId" :limit="formItem.limit" />
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="selVisibility = false">取 消</el-button>
                <el-button type="primary" @click="submit">选择</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import BaseImageSpace from '@/components/imagebase/BaseImageSpace';
export default {
    data() {
        return {
            selVisibility: false
        }
    },
    components:{
        BaseImageSpace
    },
    methods: {
        handleRemove(file) {
            console.log(file);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
        },
        openImage(){
            this.selVisibility = true
        }
    }
}
</script>

<style lang="less">
    .imgUpload{
        text-align: left;
        .el-upload--picture-card{
            width:80px;
            height:80px;
        }
        .el-upload-list--picture-card{
             .el-upload-list__item{
                width:80px;
                height:80px;
                line-height: 90px;
             }
        }
    }
    
</style>