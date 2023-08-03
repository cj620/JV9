<template>
    <PageWrapper :footer="false">
        <CustomGantt :columns="columns"></CustomGantt>
    </PageWrapper>
</template>

<script>
import columns from './columns';
import  CustomGantt  from '@/components/CustomGantt/index.vue'
export default {
    components: { CustomGantt },
    data() {
        return {
            columns: columns
        }
    },
    created() {
       
        
    },
    mounted() {
        
    },
    methods: {
        
    }
}
</script>

<style scoped lang="scss">

</style>