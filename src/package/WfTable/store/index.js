import Vue from 'vue';
import Watcher from './watcher';

Watcher.prototype.mutations = {
  setData(states, data) {
    states.data = data;
  },
  insertColumn(states, column, index, parent){
    
    // 此处array就是states._columns，数组赋值是引用传递
    let array = states._columns;

    if (typeof index !== 'undefined') {
      array.splice(index, 0, column);
    } else {
      array.push(column);
    }
    this.updateColumns();
  },
  removeColumn(states, column, parent){
    let array = states._columns;
    if (parent) {
      array = parent.children;
      if(!array) array = parent.children = [];
    }
    if (array) {
      array.splice(array.indexOf(column),1)
    }

    if (this.table.$ready) {
      this.updateColumns();
      this.scheduleLayout();
    }
  }
}

Watcher.prototype.commit = function(name,...args){
  const mutations = this.mutations
  if (mutations[name]) {
    mutations[name].apply(this,[this.states].concat(args))
  } else {
    throw new Error(`Action not found: ${name}`)
  }
}

Watcher.prototype.updateTableScrollY = function(){
  Vue.nextTick(this.table.updateTableScrollY);
}

export default Watcher;