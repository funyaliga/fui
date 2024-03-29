// var isAttached = function (ele) {
//     var currentNode = ele.parentNode;
//     while (currentNode) {
//         if (currentNode.tagName === 'HTML') {
//             return true;
//         }
//         if (currentNode.nodeType === 11) {
//             return false;
//         }
//         currentNode = currentNode.parentNode;
//     }
//     return false;
// };

var getScrollEventTarget = function (element) {
    var currentNode = element;
    // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
        var overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
        if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode;
        }
        currentNode = currentNode.parentNode;
    }
    return window;
};
// 获取滚动条高度
var getScrollTop = function (element) {
    if (element === window) {
        return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
    }
    return element.scrollTop;
};
// 获取可见高度
var getVisibleHeight = function (element) {
    if (element === window) {
        return document.documentElement.clientHeight;
    }
    return element.clientHeight;
};

var getElementTop = function (element) {
    if (element === window) {
        return getScrollTop(window);
    }
    return element.getBoundingClientRect().top + getScrollTop(window);
};

var throttle = function (fn, delay) {
    var now, lastExec, timer, context, args; //eslint-disable-line

    var execute = function () {
        fn.apply(context, args);
        lastExec = now;
    };

    return function () {
        context = this;
        args = arguments;

        now = Date.now();

        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        if (lastExec) {
            var diff = delay - (now - lastExec);
            if (diff < 0) {
                execute();
            } else {
                timer = setTimeout(function () {
                    execute();
                }, diff);
            }
        } else {
            execute();
        }
    };
};

export default {
    doBind: function () {
    if (this.binded) return; // eslint-disable-line
    this.binded = true;

    var directive = this;
    var element = directive.el;

    directive.scrollEventTarget = getScrollEventTarget(element);
    directive.scrollListener = throttle(directive.doCheck.bind(directive), 200);
    directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener);

    var disabledExpr = element.getAttribute('infinite-scroll-disabled');
    var disabled = false;

    if (disabledExpr) {
        console.log(disabledExpr)
      this.vm.$watch(disabledExpr, function (value) {
        directive.disabled = value;
        console.log(value)
        if (!value && directive.immediateCheck) {
          directive.doCheck();
        }
      });
      disabled = Boolean(directive.vm.$get(disabledExpr));
    }
    directive.disabled = disabled;

    var distanceExpr = element.getAttribute('infinite-scroll-distance');
    var distance = 0;
    if (distanceExpr) {
      distance = Number(directive.vm.$get(distanceExpr));
      if (isNaN(distance)) {
        distance = 0;
      }
    }
    directive.distance = distance;

    var immediateCheckExpr = element.getAttribute('infinite-scroll-immediate-check');
    var immediateCheck = true;
    if (immediateCheckExpr) {
      immediateCheck = Boolean(directive.vm.$get(immediateCheckExpr));
    }
    directive.immediateCheck = immediateCheck;

    if (immediateCheck) {
      directive.doCheck();
    }

    var eventName = element.getAttribute('infinite-scroll-listen-for-event');
    if (eventName) {
      directive.vm.$on(eventName, function () {
        directive.doCheck();
      });
    }
  },
    doCheck: function (force) {
        var scrollEventTarget = this.scrollEventTarget;
        var element = this.el;
        var distance = this.distance;

        if (force !== true && this.disabled) return; //eslint-disable-line

        var viewportScrollTop = getScrollTop(scrollEventTarget);
        var viewportBottom = viewportScrollTop + getVisibleHeight(scrollEventTarget);

        var shouldTrigger = false;

        if (scrollEventTarget === element) {
            shouldTrigger = scrollEventTarget.scrollHeight - viewportBottom <= distance;
        } else {
            var elementBottom = getElementTop(element) - getElementTop(scrollEventTarget) + element.offsetHeight + viewportScrollTop;
            shouldTrigger = viewportBottom + distance >= elementBottom;
            console.log(viewportBottom, distance, elementBottom,shouldTrigger)
        }

        // 运行绑定的function
        // console.log(shouldTrigger)
        if (shouldTrigger && this.expression) {
            this.vm.$get(this.expression);
        }
    },
    bind: function  () {
        var t = this;
        var ele = this.el;
        t.vm.$on('hook:ready', function () {
            // if (isAttached(ele)) {
            //     directive.doBind();
            // }
            t.doBind();
        });


    },
    update: function  () {
    },
    unbind: function  () {

    }
}
