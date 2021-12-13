<template>
  <ul>
    <li v-for="todo in todos" v-bind:key="todo.id">
      <!-- We have a slot for each todo, passing it the -->
      <!-- `todo` object as a slot prop.                -->
      <slot v-bind:todo="todo">
        {{ todo.text }}
      </slot>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'TodoList',
  props: {
    todos: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
