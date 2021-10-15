<template>
  <div class="fild-item">
    <span v-show="required" class="required">*</span>
    <el-input
      :style="{ width }"
      v-if="inputVisible"
      ref="saveTagInput"
      v-model="value"
      size="small"
      class="input-new-tag"
      clearable 
      :placeholder="placeholder"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else :class="['button-new-tag',{ 'no-border': !this.border }]" size="small" @click="showInput">{{ value }} <i class="el-icon-edit" /></el-button>
  </div>
</template>
<script>
export default {
  name: 'EditInput',
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  props: {
    inputValue: {
      type: String,
      required: true
    }, 
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '178px'
    }
  },
  data() {
    return {
      inputVisible: false,
      value: this.inputValue
    }
  },
  watch: {
    inputValue(val) {
      if (val) {
        this.value = val;
      }
    }
  },
  mounted() {
    if (!this.value) {
      this.inputVisible = true;
    }
  },
  methods: {
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm(event) {
      const str = event.target.value || '';
      const value = str.trim();
      // 必要字段
      if (this.required) {
        if (!value) return;
        this.$emit('change', value);
        this.inputVisible = false;
      } else {
        // 非必要字段
        this.$emit('change', value); 
        if (!value) return;
        this.inputVisible = false;
      }
    }
  }
}
</script>
<style scoped lang="scss">
 .required{
   color:red;
   position:absolute;
 }
.fild-item{
  display:inline-block;
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    position:relative;
    i{
      position:absolute;
      display:none;
      font-size:16px;
      top: -5px;
      right: -6px;
    }
    &:hover i{
      display: block;
    }
  }
  .no-border{
    border:none;
  }
  .input-new-tag {
    width:100%;
  }
}
</style>
