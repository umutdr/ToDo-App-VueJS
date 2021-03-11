<template>
  <div class="home">
    <FilterNav
      @filter="filterKeyword = $event"
      :currentFilterKeyword="filterKeyword"
    />
    <div v-if="filteredProjects.length > 0">
      <div v-for="project in filteredProjects" :key="project.id">
        <Project
          :project="project"
          @delete="handleRemove"
          @done="toggleIsComplete"
        />
      </div>
    </div>
    <p v-else style="text-align:center;">There is no Projects</p>
  </div>
</template>

<script>
import Project from '../../components/Project';
import FilterNav from '../../components/FilterNav';

export default {
  name: 'Home',
  data() {
    return {
      projects: [],
      filterKeyword: 'all',
    };
  },
  components: {
    Project,
    FilterNav,
  },
  methods: {
    async GetAllProjects() {
      const response = await fetch('http://localhost:3000/projects').catch(
        (error) => {
          alert("Can't Fetch the Projects!");
          console.log('Fetch Error Msg:', error.message);
          return;
        }
      );

      return await response.json();
    },
    handleRemove(projectId) {
      this.projects = this.projects.filter((project) => {
        return project.id !== projectId;
      });
    },
    toggleIsComplete(projectId) {
      let updatedProject = this.projects.find((project) => {
        return project.id === projectId;
      });
      updatedProject.isComplete = !updatedProject.isComplete;
    },
  },
  computed: {
    filteredProjects() {
      switch (this.filterKeyword) {
        case 'notcompleted': {
          return this.projects.filter(
            (project) => project.isComplete === false
          );
        }
        case 'completed':
          return this.projects.filter((project) => project.isComplete === true);
        case 'all':
        default:
          return this.projects;
      }
    },
  },
  async mounted() {
    this.projects = await this.GetAllProjects();
  },
};
</script>
