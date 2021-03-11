<template>
  <nav class="filter-nav">
    <button
      @click="filterProjects('all')"
      :class="{ active: currentFilterKeyword === 'all' }"
    >
      All
    </button>
    <button
      @click="filterProjects('completed')"
      :class="{ active: currentFilterKeyword === 'completed' }"
    >
      Completed
    </button>
    <button
      @click="filterProjects('notcompleted')"
      :class="{ active: currentFilterKeyword === 'notcompleted' }"
    >
      OnGoing
    </button>
  </nav>
</template>

<script>
export default {
  name: 'FilterNav',
  props: {
    currentFilterKeyword: {
      default: 'all',
    },
  },
  methods: {
    filterProjects(filterKeyword) {
      this.$emit('filter', filterKeyword);
    },
  },
};
</script>

<style>
.filter-nav {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.filter-nav button {
  background: none;
  border: none;
  color: #777;
  outline: none;
  font-size: 12px;
  text-transform: uppercase;
  margin-right: 10px;
  letter-spacing: 1px;
  font-weight: bold;
  cursor: pointer;
}
.filter-nav button.active {
  color: #333;
  text-decoration: underline;
}
</style>
