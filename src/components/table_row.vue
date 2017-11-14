<template>
     <tbody>
        <tr>
            <td v-for="(item,index) in item_row" :key="index" class="addBox"><span v-if="index==0" class="add" @click="table_show">{{toggle}}</span>{{item}}</td>
        </tr>
        <tr>
            <td colspan="9">
                <table class="inner-table" v-show="active">
                    <thead>
                        <tr>
                            <td>高校地区</td>
                            <td>高校名称</td>
                            <td>专业（类）</td>
                            <td>类中所含专业</td>
                            <td>选考科目范围</td>
                        </tr>
                        <tr v-for="(item,index) in item_table" :key="index">
                            <td>{{item.province}}</td>
                            <td>{{item.collegeName}}</td>
                            <td>{{item.majorName}}</td>
                            <td>{{item.remark.join(",")}}</td>
                            <td>{{item.subjectRangeNames.join(',')}}</td>
                        </tr>
                    </thead>
                </table>
            </td>
        </tr>
    </tbody> 
</template>
<script>
export default {
    props: ['row'],
    data(){
        return {
            item_row:[],
            item_table:[],
            active:false,
            toggle:'+'
        }
    },
    created: function() {
       let len=this.row.length;
       this.item_row=this.row.slice(0,len-1);
       this.item_table=this.row[9];
    },
    methods:{
        table_show:function(){
            this.active=!this.active;
            if(this.active){
                this.toggle="-"
            }else{
                this.toggle="+"
            }
        }
    }
}
</script>
<style scoped>
   .inner-table{
       background:#f4f4f4;
       font-size:12px;
   }
   .addBox{
       position:relative;
   }
   .add{
       background:rgba(0, 160, 92, 1);
       color:#fff;
       display:inline-block;
       width:15px;
       height: 15px;
       text-align:center;
       line-height:15px;
       cursor:pointer;
       position:absolute;
       left:20px;
       top:10px;
   }
   table td,table tr{
       border:1px solid #ccc;
   }
</style>


