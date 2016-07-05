<template>
    <div class="u-cell" :class="{'cell-link': isLink || link}" @click="onClick">
        <div class="cell-bd">
            <slot name="icon"></slot>
            <slot>
                <span class="text" v-text="title"></span>
                <span v-if="dec" class="dec" v-text="dec"></span>
            </slot>
        </div>
        <div class="cell-ft">
            <slot name="ft">
                <span v-text="value"></span>
            </slot>
        </div>
    </div>
</template>


<script>

export default {
    name: 'fui-cell',
    props: {
        title: String,
        value: String,
        dec: String,
        isLink: Boolean,
        link: String,
    },
    methods: {
        onClick: function() {
            var link = this.link;
            this.$router.go(link);
        }
    }
}
</script>
<style lang="scss">
@import 'src/assets/sass/core/fn';

.u-cell{
    position: relative;
    display: flex;
    align-items: center;
    padding: 16px 10px;
    background-color: #fff;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 1;
    overflow: hidden;
    &:before,
    &:after{
        content: "";
        position: absolute;
        left: 0;
        width: 100%;
        height: 1px;
        border-top: 1px solid #d9d9d9;
        transform-origin: 0 0;
        transform: scaleY(.5);
    }
    &:before{
        top: 0;
    }
    &:after{
        bottom: 0;
    }
    & + .u-cell:before{
        left: 10px
    }
    &:not(:last-child):after{
        content: none;
    }
}
.cell-bd{
    flex: 1;
    img{
        vertical-align: middle;
    }
    .dec{
        display: block;
        margin-top: 14px;
        color: #aaa;
        font-size: 14px;
    }
}
.cell-ft{
    color: #aaa;
}
.cell-link{
    &:active{
        background-color: #ececec;
    }
    .cell-ft{
        &:after{
            content: " ";
            position: relative;
            top: -1px;
            display: inline-block;
            height: 8px;
            width: 8px;
            border-width: 2px 2px 0 0;
            border-color: #c8c8cd;
            border-style: solid;
            transform: rotate(45deg);
        }
    }
}
</style>
