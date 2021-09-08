<template>
    <div class="tree-table">
        <el-table
                 :data="tableData"
                 row-key="directoryId"
                 default-expand-all
                 :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
            <el-table-column  label="全选" type="selection" align="center" >
            </el-table-column>

            <el-table-column prop="date" label="名称" class-name="table-name">
                <template #default="scope">
                    <i :class="filterFrom(scope.row.directoryType,IconList)"></i>
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column  label="大小">
                <template #default="scope">
                    <span>{{Transformation(scope.row.size)}}</span>
                </template>
            </el-table-column>

            <el-table-column  label="修改时间">
                <template #default="scope">
                    <span>{{dayjs(scope.row.gmtUpdate).format('YYYY-MM-DD HH:mm')}}</span>
                </template>
            </el-table-column>

            <el-table-column  label="上传时间">
                <template #default="scope">
                    <span>{{dayjs(scope.row.gmtUpload).format('YYYY-MM-DD HH:mm')}}</span>
                </template>
            </el-table-column>

            <el-table-column  label="加密级别">
                <template #default="scope">
                    <span v-if="scope.row.directoryType!== 1 ">{{filterFrom(scope.row.secretType,secretTypeList)}}</span>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script lang="ts">
    import {defineComponent,computed} from 'vue';
    import {filterFrom,Transformation} from '@/unit/filter';
    import dayjs from 'dayjs';
    export default defineComponent({
        name: "TreeTable",
        setup(props){
            const IconList = [
                {code:1 ,label:'iconfont icon-pingtaiyunying'},
                {code:2 ,label:'iconfont icon-zhuomian'},
            ];
            const secretTypeList = [
                {code:0 ,label:'不加密'},
                {code:1 ,label:'普通加密'},
            ];
            return {
                IconList,
                filterFrom,
                Transformation,
                dayjs,
                secretTypeList
            }
        },
        props:[
            "tableData"
        ]
    })
</script>

<style scoped lang="scss">
    .tree-table{
        .table-name{
            i{
                color: #1890ff;
                font-size: 12px;
                margin-right: 10px;
            }
        }
    }
</style>
