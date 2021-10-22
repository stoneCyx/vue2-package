import Vue from 'vue';

class TableLayout {
  constructor(options) {
    this.table = null;
    this.store = null;
    this.columns = null;
    this.fit = true;
    for(let name in options) {
      if(options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }

    if (!this.table) {
      throw new Error('table is required for Table Layout');
    }
    if (!this.store) {
      throw new Error('store is required for Table Layout');
    }
  }

  updateColumnsWidth() {
    const fit = this.fit;
    const bodyWidth = this.table.$el.clientWidth;
    let bodyMinWidth = 0;

    const flattenColumns = this.getFlattenColumns();
    let flexColumns = flattenColumns.filter(column => typeof column.width !=='number');
  
    flattenColumns.forEach((column) => {
      if(typeof column.width === 'number' && column.realWidth) column.realWidth = null;
    });
    if (flexColumns.length > 0 && fit) {
      flattenColumns.forEach((column) => {
        bodyMinWidth += column.width || column.minWidth || 80;
      });

      const scrollYWidth = this.scrollY ? this.gutterWidth : 0;

      if (bodyMinWidth <= bodyWidth - scrollYWidth) {
        this.scrollX = false;

        const totalFlexWidth = bodyWidth - scrollYWidth - bodyMinWidth;

        if (flexColumns.length === 1) {
          flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth;
        } else {
       
        }
      }
    }
  }
}

export default TableLayout;
