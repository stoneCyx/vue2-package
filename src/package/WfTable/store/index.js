import Vue from 'vue';
import Watcher from './watcher';

Watcher.prototype.mutations = {
  setData(states, data) {
    const dataInstanceChanged = states._data !== data;
    states._data = data;
    states.data = data;
    // this.execQurey();
    // this.updateCurrentRowData();
    // this.updateExpandRows();
    // if (states.reserveSelection) {
    //   this.assertRowKey();
    //   this.updateSelectionByRowKey();
    // } else if(dataInstanceChanged) {
    //   this.clearSelection();
    // } else {
    //   this.cleanSelection();
    // }
    // this.updateAllSelected();
    // this.updateTableScrollY();
  },
  insertColumn(states, column, index, parent){
    let array = states._columns;
    if (parent){
      array = parent.children;
      if(!array) array = parent.children = [];
    }

    if (typeof index !== 'undefined') {
      array.splice(index, 0, column);
    } else {
      array.push(column);
    }

    if (column.type === 'selection') {
      states.selectable = column.selectable;
      states.reserveSelection = column.reserveSelection
    }
    // if (this.table.$ready) {
      this.updateColumns();
      this.scheduleLayout();
    // }
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