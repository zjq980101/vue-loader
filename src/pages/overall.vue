<template>
    <div class="filter-box">
        <div class="selected-condations clearfix">
            <div class="left-title">已选条件：</div>
            <div class="right-area">
                <p class="selected-item" v-if="selected_range_item!='不限'">{{selected_range_item}}
                    <span class="clear-selected" @click="clear_range">x</span>
                </p>
                <p class="selected-item" v-if="selected_area_item!='不限'">{{selected_area_item}}
                    <span class="clear-selected" @click="clear_area">x</span>
                </p>
            </div>
        </div>
        <div class="condations-box">
            <div class="major-range clearfix">
                <div class="left-title">专业层次：</div>
                <div class="right-area"></div>
            </div>
            <school-range :school-range-list="school_range_obj"></school-range>
            <school-area :school-area-list="school_area_obj"></school-area>
        </div>
        <h3 class="title-second">选考科目分析</h3>
        <div class="remind next">*科目比例：要求所选选考科目的专业总数/条件范围内专业总数。以专业为例：经济统计学专业历史所占比例为66.7%，意为选考历史，66.7%的经济统计学专业均可报考。</div>
        <tab-view class="tab_list" :title_="tab_title" :list_="tab_left_list"></tab-view>
        <tab-view class="tab_list" :title_="tab_title" :list_="tab_right_list"></tab-view>
        <div class="clearfix"></div>
        <div class="table">
            <table-wrap :title="table_title">
                <table-row v-for="(x,i) in row_list" :row="x" :key="i"></table-row>
            </table-wrap>
        </div>
    </div>
    </div>
</template>
<script>
import school_range from '../components/school_range.vue';
import school_area from '../components/school_area.vue';
import tab_view from "../components/table_view.vue";
import table_row from '../components/table_row.vue';
import table_wrap from '../components/table_wrap.vue';
import { mapMutations, mapState } from 'vuex';  //加花括号的原因是因为解析出来的
export default {
    data: function() {
        return {
            tab_title: [],
            tab_left_list: [],
            tab_right_list: [],
            table_title: [],
            row_list: []
        }
    },
    // computed: {
    //     "selected_range_item": function() {
    //         return this.$store.getters.selected_range
    //     },
    //     "selected_area_item": function() {
    //         return this.$store.getters.selected_area
    //     }
    // },
    computed: Object.assign({}, {
        "selected_range_item": function() {
            return this.$store.getters.selected_range
        },
        "selected_area_item": function() {
            return this.$store.getters.selected_area
        }
    }, mapState(['school_range_obj', 'school_area_obj'])),  //讲schoolrange中的$store.state去掉
    created: function() {
        let vm = this;
        this.$http.get('/src/server/schoolRange.json').then(function(res) {
            let range_data = res.data.list.map((value, index) => {
                return index == 0 ? { value: value, selected: true } : { value: value, selected: false }
            })
            vm.$store.commit('update_school_range', range_data)
        })

        this.$http.get('src/server/schoolArea.json').then(function(res) {
            let area_data = res.data.list.map((value, index) => {
                return index == 0 ? { value: value, selected: true } : { value: value, selected: false }
            })
            vm.$store.commit('update_school_area', area_data)
        })

        this.$http.get('src/server/overall.json').then(res => {
            this.table_title = res.data.result.title
            this.row_list = res.data.result.rows;
        })

        //var vm=this;          
        this.$http("src/data/general.json").then(function(res) {
            vm.tab_title = res.data.result.title;
            var tab_list = res.data.result.analysisData;
            var left_arr = [];
            tab_list.forEach((value, index) => {
                if (index < tab_list.length / 2) {
                    left_arr[index] = value;
                }
            });
            vm.tab_left_list = left_arr;
            var right_arr = [];
            var s = 0;
            tab_list.forEach((value, index) => {
                if (index >= tab_list.length / 2) {
                    right_arr[s] = value;
                    s++;
                }
            });

            // 根据大学数据
            vm.tab_right_list = right_arr;
            vm.college_title = res.data.result.title;
            vm.college_detail = res.data.result.rows;

        })

    },

    methods: Object.assign({}, mapMutations(['clear_range', 'clear_area'])),
    // ...mapMutations(['clear_range','clear_area'])
    // methods: {
    //     clearRange: function() {
    //         this.$store.commit('clear_range')
    //     },
    //     clearArea: function() {
    //         this.$store.commit('clear_area')
    //     },
    // },
    components: {
        "school-range": school_range,
        "school-area": school_area,
        'tab-view': tab_view,
        "table-wrap": table_wrap,
        "table-row": table_row
    },
    mounted: function() {
        console.log(this)
    }

}
</script>
<style>
.filter-box {
    width: 100%;
    margin: 10px auto;
    user-select: none;
}

.left-title,
.right-area {
    float: left;
    box-sizing: border-box;
}

.left-title {
    margin: 5px 0;
    text-indent: 10px;
    width: 10%;
}

.right-area {
    width: 90%;
}

.selected-item {
    margin: 0;
    padding: 0 5px;
    display: inline-block;
    border: 1px solid #ccc;
}

.clear-selected {
    cursor: pointer;
}

.selected-condations {
    /* padding: 10px; */
    /* line-height: 35px; */
    line-height: 25px;
}

.condations-box {
    border: 1px solid #ccc;
    padding: 10px;
    line-height: 35px;
}

.filter-item {
    display: inline-block;
    min-width: 70px;
    padding: 0 5px;
    height: 35px;
    color: #333;
    text-align: center;
    line-height: 35px;
    margin: 5px;
    cursor: pointer;
}

.filter-item.selected {
    background: rgba(0, 160, 92, 1);
    color: #fff;
}

.filter-item:hover {
    background: rgba(0, 160, 92, 1);
    color: #fff;
}

.tab_list {
    float: left;
}



/* .wrap {
    padding: 5px;
    font-size: 15px;
    border: 1px solid #ccc;
}

.select_title span {
    display: inline-block;
    padding: 5px;
}

.select_title div {
    display: inline-block;
}

.select_title div span {
    display: inline-block;
    padding: 5px;
}

.select_wrap>div {
    line-height: 1.3;
    margin-top: 5px;
} */

.next {
    color: #f00;
    line-height: 30px;
}

.title-second {
    height: 40px;
    line-height: 40px;
    color: #000;
    border-bottom: 1px solid #ccc;
    text-indent: 10px;
}


/* .tab_container table {
    float: left;
}

.clearfix {
    clear: both;
} */

.table table {
    width: 100%;
    text-align: center;
}
 .table td{
    line-height:35px;
} 
</style>


