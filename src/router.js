import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const router = new VueRouter()

router.map({
    '/': {
        name: 'app',
        component: function (resolve) {
            require(['./views/index.vue'], resolve)
        }
        // component: require('./views/index.vue')
    },
    '/toast': {
        name: 'toast',
        component: function (resolve) {
            require(['./views/toast.vue'], resolve)
        }
    },
    '/button': {
        name: 'button',
        component: function (resolve) {
            require(['./views/button.vue'], resolve)
        }
    },
    '/cell': {
        name: 'cell',
        component: function (resolve) {
            require(['./views/cell.vue'], resolve)
        }
    },
    '/infinite-scroll': {
        name: 'infinite-scroll',
        component: function (resolve) {
            require(['./views/infinite-scroll.vue'], resolve)
        }
    },
    '/infinite-scroll2': {
        name: 'infinite-scroll2',
        component: function (resolve) {
            require(['./views/infinite-scroll2.vue'], resolve)
        }
    },

    '/tab': {
        name: 'tab',
        component: function (resolve) {
            require(['./views/tab.vue'], resolve)
        }
    },
    '/selectAll': {
        name: 'selectAll',
        component: function (resolve) {
            require(['./views/selectAll.vue'], resolve)
        }
    },
    

    // learn
    '/resource': {
        name: 'resource',
        component: function (resolve) {
            require(['./learn/resource.vue'], resolve)
        }
    },
    '/promise': {
        name: 'promise',
        component: function (resolve) {
            require(['./learn/promise.vue'], resolve)
        }
    },

    // 测试
    '/test': {
        name: 'test',
        component: function (resolve) {
            require(['./learn/test.vue'], resolve)
        }
    },
})

router.beforeEach(transition => {
    document.title = transition.to.name || document.title;
    transition.next();
});

router.afterEach(() => {
    document.body.scrollTop = 0;
});

// 重定向位匹配到的
// router.redirect({
//     '*': '/'
// })

export default router
