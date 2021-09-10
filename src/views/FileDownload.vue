<template>
    <span>文件下载</span>
    <TreeTable :tableData="tableData" :disabled="true"
               @change="test($event)"></TreeTable>
</template>

<script>
    import TreeTable from '@/components/TreeTable.vue'
    import {setup} from 'vue';
    export default {
        name: "FileDownload",
        components:{
            TreeTable
        },
        setup(){
            const tableData =[ // 初始化目录树列表数据
                {
                    directoryId: 1,
                    directoryType: 2, // 1:目录 2:文件
                    downloadType: 1,
                    secretType: 0,
                    size: 12367,
                    name: "前端大厂面试宝典.pdf",
                    gmtUpdate: 1630825270483,
                    gmtUpload: 1630825248029,
                    children: [],
                },
                {
                    directoryId: 2,
                    directoryType: 2,
                    downloadType: 1,
                    secretType: 1,
                    size: 5236700,
                    name: "前端高级工程师内功秘籍.docx",
                    gmtUpdate: 1630825270483,
                    gmtUpload: 1630825248029,
                    children: [],
                },
                {
                    directoryId: 3,
                    directoryType: 2,
                    downloadType: 0,
                    secretType: 1,
                    size: 2267,
                    name: "前端学习路线图.png",
                    gmtUpdate: 1630834889072,
                    gmtUpload: 1630825248029,
                    children: [],
                },
                {
                    directoryId: 4,
                    directoryType: 1,
                    downloadType: 1,
                    secretType: 0,
                    name: "前端开源项目汇总",
                    gmtUpdate: 1630825270483,
                    gmtUpload: 1630825248029,
                    children: [
                        {
                            directoryId: 41,
                            directoryType: 2,
                            downloadType: 1,
                            secretType: 0,
                            size: 13200,
                            name: "小程序个性简历源码.zip",
                            gmtUpdate: 1630825270483,
                            gmtUpload: 1630825248029,
                            children: [],
                        },
                        {
                            directoryId: 42,
                            directoryType: 1,
                            downloadType: 1,
                            secretType: 0,
                            name: "电商网站项目",
                            gmtUpdate: 1630825270483,
                            gmtUpload: 1630825248029,
                            children: [
                                {
                                    directoryId: 421,
                                    directoryType: 2,
                                    downloadType: 1,
                                    secretType: 0,
                                    size: 132008,
                                    name: "饿了么H5移动端源码.zip",
                                    gmtUpdate: 1630825270483,
                                    gmtUpload: 1630825248029,
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    directoryId: 5,
                    directoryType: 1,
                    downloadType: 0,
                    secretType: 1,
                    name: "前端工程化知识体系",
                    gmtUpdate: 1630834889072,
                    gmtUpload: 1630834889072,
                    children: [
                        {
                            directoryId: 51,
                            directoryType: 2,
                            downloadType: 0,
                            secretType: 1,
                            size: 13200,
                            name: "CI/CD项目部署.doc",
                            gmtUpdate: 1630834889072,
                            gmtUpload: 1630834889072,
                            children: [],
                        },
                        {
                            directoryId: 52,
                            directoryType: 2,
                            downloadType: 0,
                            secretType: 1,
                            size: 335200,
                            name: "前端开发规范秘籍.xlsx",
                            gmtUpdate: 1630834889072,
                            gmtUpload: 1630834889072,
                            children: [],
                        },
                    ],
                },
            ];

            const test = (e)=>{
               console.log(e);
               alert(22);
            };
            return {
                tableData,
                test
            }
        }
    }
</script>

<style scoped>

</style>
