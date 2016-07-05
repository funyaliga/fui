<template>
    <button
        class="u-btn"
        :class="[classes, 'btn-' + type, {
            'is-plain': plain
        }]"
        :disabled="disabled"
        @touchstart="handleClick">
        <slot></slot>
    </button>
</template>


<script>
/**
* mt-header
* @module components/button
* @desc 按钮
* @param {string} [type=default] - 显示类型，接受 default, primary, danger
* @param {boolean} [disabled=false] - 禁用
* @param {boolean} [plain=false] - 幽灵按钮
* @param {slot} - 显示文本
*
* @example
* <mt-button size="large" icon="back" type="primary">按钮</mt-button>
*/
export default {
    name: 'fui-btn',
    props: {
        classes: null,
        type: {
            type: String,
            default: 'default',
            validator(value) {
                return [
                    'default',
                    'danger',
                    'primary'
                ].indexOf(value) > -1;
            }
        },
        // size: {
        //     type: String,
        //     default: 'normal',
        //     validator(value) {
        //         return [
        //             'small',
        //             'normal',
        //             'large'
        //         ].indexOf(value) > -1;
        //     }
        // },
        // href: {
		// 	type: String
		// },
        disabled: Boolean,
        plain: Boolean
    },
    methods: {
        handleClick($event) {
            if (this.disabled) {
                $event.preventDefault();
                $event.stopPropagation();
            }
        }
    }
}
</script>
<style lang="scss">
@import 'src/assets/sass/core/fn';

.u-btn{
    position: relative;
    display: inline-block;
    border: 1px solid transparent;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    &:after{
        content: "";
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        background-color: #000;
        opacity: 0;
    }
    &:not(.is-disabled):active:after {
        opacity: .2;
    }
    &.is-plain{
        border-width: 1px;
        background-color: transparent;
    }
}
button.u-btn{
    -webkit-appearance: none;
}
.btn-default{
    background-color: #f6f8fa;
    color: #656b79;
    box-shadow: 0 0 1px #b8bbbf;
    &.is-plain{
        color: #5a5a5a;
        border-color: #5a5a5a;
    }
    &[disabled]{
        color: rgba(#656b79, .6);
        background-color: rgba(#f6f8fa, .8);
    }
}
.btn-primary {
    background-color: #c57ff0;
    color: #fff;
    &.is-plain{
        color: #c57ff0;
        border-color: #c57ff0;
    }
    &[disabled]{
        background-color: rgba(#c57ff0, .8);
        color: rgba(#fff, .6);
    }
}
.btn-danger{
    background-color: #ef4f4f;
    color: #fff;
    &.is-plain{
        color: #ef4f4f;
        border-color: #ef4f4f;
    }
    &[disabled]{
        background-color: rgba(#ef4f4f, .8);
        color: rgba(#fff, .6);
    }
}
</style>
