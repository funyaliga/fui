<template>
    <fui-page-hd>Toast</fui-page-hd>
    <div class="m-toast m-w">
        <fui-btn @click="fnToast">Toast</fui-btn>
    </div>
</template>

<script>
import Toast from '../fn/toast';
export default {
    methods:{
        fnToast: function  () {
            Toast({
                message: '提示',
                iconClass: 'd-icon-success',
                duration: 5000
            });
        }
    }
}
</script>
