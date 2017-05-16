### Installation
```console
$ npm install eslint-loader --save-dev
```

### Usage
```js
import utils from 'vue-ui-modal';
```

In your webpack configuration
```js
module.exports = {
    // ...
    module: {
        rules: [{
            test: /\.vue$/,
            include: [
                // resolve('src'),
                path.resolve(__dirname, 'node_modules/vue-ui-modal')
            ],
            use: ['vue-loader']
        }],
    },
    // ...
}
```

### Plugins(or Methods)
- alert
- confirm
- prompt
- toast
- loading

### alert example
```js

import utils from 'vue-ui-modal';

/*
 *  utils.alert
 *  @param {String|Object} msg
 *  @return promise
 **/

// utils.alert('天亮了');
const promise = utils.alert({
    msg: '请确定',
    buttonText: 'Ok'
});

promise.then(() => {
    utils.toast('你点ok了');
});

```

### confirm example
```js

import utils from 'vue-ui-modal';

/*
 *  utils.confirm
 *  @param {String|Object} msg
 *  @return promise
 **/

const promise = utils.confirm({
    msg: '你赞成他刚才所说的观点吗？',
    leftButtonText: '否定',
    rightButtonText: '赞成'
});

promise
    .then(() => {
        utils.toast('你赞成了');
    })
    .catch(() => {
        utils.toast('你否定了');
    });

```

### prompt example
```js

import utils from 'vue-ui-modal';

/*
 *  utils.prompt
 *  @param {String|Object} msg
 *  @return promise
 **/

const promise = utils.prompt({
    msg: '谈谈你对最近的工作有啥感受？',
    leftButtonText: '忽略',
    rightButtonText: '提交'
});

promise
    .then(answer => {
        utils.toast(`你的回答是：${answer}`);
    })
    .catch(() => {
        utils.toast('太狠了，再也不见');
    });

```

### toast example
```js

import utils from 'vue-ui-modal';

/*
 *  utils.toast
 *  @param {String|Object} msg
 *  @return vue object
 **/

// utils.toast('好消息');
const vm = utils.toast({
    msg: '号外号外！！',
    dismissTimeout: 2000,   // 组件销毁延时毫秒数，默认2000ms
    autoDismiss: true       // 自动销毁，默认true
});
// vm.destroy(); // 销毁vue组件

```

### loading example
```js

import utils from 'vue-ui-modal';

/*
 *  utils.loading
 *  @param {String} msg
 *  @return vue object
 **/

var vm = utils.loading('正在加载中...');
setTimeout(() => {
    vm.destroy();
    utils.toast('loading在5秒后销毁了');
}, 5000);

```