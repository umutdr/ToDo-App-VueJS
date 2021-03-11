<template>
  <div class="project" :class="{ complete: project.isComplete }">
    <div class="actions">
      <h3 @click="toggleDetails">{{ project.title }}</h3>
      <div class="icons">
        <span
          @click="done"
          class="material-icons"
          :class="{ done: project.isComplete }"
          >done</span
        >
        <router-link :to="{ name: 'Edit Project', params: { id: project.id } }">
          <span class="material-icons">edit</span>
        </router-link>
        <span @click="remove" class="material-icons">delete</span>
      </div>
    </div>
    <div v-show="showDetails" class="details">
      <p>{{ project.details }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Project',
  data() {
    return {
      showDetails: false,
      uri: `http://localhost:3000/projects/${this.project.id}`,
    };
  },
  props: {
    project: {
      required: true,
    },
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
    done() {
      fetch(this.uri, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isComplete: !this.project.isComplete }),
      })
        .then(() => {
          this.$emit('done', this.project.id);
        })
        .catch((error) => {
          alert('Done is Failed!');
          console.log(error.message);
        });
    },
    remove() {
      if (confirm('Are you sure to delete?')) {
        fetch(this.uri, {
          method: 'DELETE',
        })
          .then(() => {
            this.$emit('delete', this.project.id);
          })
          .catch((error) => {
            alert('Delete is Failed');
            console.log(error.message);
          });
      }
    },
  },
};
</script>

<style scoped>
.project {
  margin: 20px auto;
  background: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  border-left: 2px solid #e90074;
  border-bottom: 2px solid #e90074;
}
h3 {
  cursor: pointer;
}
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.details {
  border-top: 1px solid #777;
}
.material-icons {
  font-size: 24px;
  margin-left: 10px;
  color: #999;
  cursor: pointer;
}
.material-icons:hover {
  color: #555;
}

.project.complete {
  border-left: 2px solid #00ce89;
  border-bottom: 2px solid #00ce89;
}

.project.complete .done {
  color: #00ce89;
}
</style>
