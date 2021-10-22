import Store from './index';

export function createStore(table, initialState = {}){
    if(!table){
        throw new Error('table is required.');
    }
    // store实际上是一个vue实例，由vue实例(watcher)在原型加上mutations属性和commit方法，达到模拟vuex的状态管理模式，
    // store中的data中定义好states，store的methods定义处理states的方法。
    const store = new Store();  
    store.table = table; // table是vue组件实例,在组件入口处把this传进来。

    Object.keys(initialState).forEach(key => {
        store.states[key] = initialState[key];   //直接修改 watcher 的 data 的 states 的值
    })
    return store;
}

export function mapStates(mapper){
    const res = {};
    Object.keys(mapper).forEach(key => {
        const value = mapper[key];
        let fn;
        if (typeof value === 'string') {
            fn = function(){
                return this.store.states[value]
            }
        } else if (typeof value === 'function') {
            fn = function(){
                //value是个函数，如 state => state.user.toeken,此处将执行这个，改变执行这个函数的this指向，this指向当前对象，也就是store实例。
                return value.call(this, this.store.states);  
            }
        } else {
            console.log('invalid value type');
        }
        // 如果该state存在，则返回该state的值
        if (fn) {
            res[key] = fn;
        }
    });
    return res;  // 返回值是一个json，所以需要用 ...mapStates 来展开里面的内容
}

