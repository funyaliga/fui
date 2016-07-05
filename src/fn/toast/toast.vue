<template>
    <div class="u-toast {{ customClass }}" transition="toast" :style="{ 'padding': iconClass === '' ? '10px' : '20px' }">
        <i class="toast-icon {{ iconClass }}" v-if="iconClass !== ''"></i>
        <span class="toast-text" :style="{ 'padding-top': iconClass === '' ? '0' : '10px' }">{{ message }}</span>
    </div>
</template>

<script>
export default {
    props: {
        message: String,
        className: {
            type: String,
            default: ''
        },
        position: {
            type: String,
            default: 'middle'
        },
        iconClass: {
            type: String,
            default: ''
        }
    },

    computed: {
        customClass() {
            var classes = [];
            switch (this.position) {
                case 'top':
                    classes.push('is-top');
                    break;
                case 'bottom':
                    classes.push('is-bottom');
                    break;
                default:
                    classes.push('is-middle');
            }
            classes.push(this.className);

            return classes.join(' ');
        }
    }
};
</script>

<style lang="scss">
.u-toast{
    position: fixed;
    max-width: 80%;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
    &.is-top{
        top: 50px;
        left: 50%;
        transform: translate(-50%, 0);
    }
    &.is-bottom{
        bottom: 50px;
        left: 50%;
        transform: translate(-50%, 0);
    }
    &.is-middle{
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
.toast-icon{
    display: block;
    text-align: center;
    font-size: 56px;
}
.toast-text{
    font-size: 14px;
    display: block;
    text-align: center;
}

.toast-transition{
    transition: opacity .3s linear;
}
.toast-enter,.toast-leave {
    opacity: 0;
}
</style>
