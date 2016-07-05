<template>
    <fui-page-hd>promise2</fui-page-hd>
    <img :src="src" id="item-{{ id }}">
</template>


<script>

import { Promise } from 'es6-promise'

function loadImageAsync(url) {
    return new Promise(function(resolve, reject) {
        var image = new Image();

        image.onload = function() {
            resolve(url);
        };

        image.onerror = function() {
            reject(new Error('Could not load image at ' + url));
        };

        image.src = url;
    });
}

export default {
    data() {
        return {
            'id': 1,
            'src': '',
            'lzsrc': 'http://tva1.sinaimg.cn/crop.288.0.696.696.50/67e1e221jw8f50y7b7b76j20zk0k0tdc.jpg'
        };
    },
    route: {
        data() {
            return {
                src: loadImageAsync(this.lzsrc).then(function ( url) {
                            return url;
                        }, function () {
                            console.log('error');
                            return '';
                        })
            }
        }
    },
}
</script>

<style lang="sass" scoped>
#item-1
    margin: 10px;
    padding: 10px
</style>