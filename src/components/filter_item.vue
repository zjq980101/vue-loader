<template>
    <span class="filter-item" @click="toggle" :class="{selected:rangeObject.selected}">
        {{rangeObject.value}}</span>
</template>
<script>
export default {
    props: ['index', 'catagory', 'rangeObject'],
    methods: {
        toggle: function() {
            // bus.$emit(this.catagory,{
            //     index:this.index,
            //     selected:!this.rangeObject.selected
            // })
            if (this.catagory == "高校层次") {
                this.$store.commit('reset_school_range', {
                    index: this.index,
                    selected: !this.rangeObject.selected
                })
                return;
            }
            if (this.catagory == "高校地区") {
                this.$store.commit('reset_school_area', {
                    index: this.index,
                    selected: !this.rangeObject.selected
                })

            }

        }
    },
}
</script>
<style scoped>

</style>


