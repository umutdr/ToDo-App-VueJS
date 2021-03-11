<template>
  <form @submit.prevent="handleFormSubmit" v-if="project.id">
    <label for="title">Title</label>
    <input v-model="project.title" type="text" name="title" required />

    <label for="details">Details</label>
    <textarea v-model="project.details" name="details" rows="3" required />

    <label for="title" style="text-align:center;">
      Is Completed
      <input
        v-model="project.isComplete"
        type="checkbox"
        name="title"
        checked="false"
      />
    </label>

    <input type="submit" value="Update" />
  </form>
  <h3 style="text-align:center;" v-else>Fetching the data ...</h3>
</template>
<script>
export default {
  name: 'Edit',
  props: {
    id: {
      required: true,
    },
  },
  data() {
    return {
      project: {
        id: undefined,
        title: '',
        details: '',
        isComplete: false,
      },
      uri: `http://localhost:3000/projects/${this.id}`,
    };
  },
  methods: {
    async GetProject(projectId) {
      const response = await fetch(this.uri);

      return await response.json();
    },
    async SetInputValues() {
      const project = await this.GetProject(this.id);
      this.project.id = project.id;
      this.project.title = project.title;
      this.project.details = project.details;
      this.project.isComplete = project.isComplete;
    },
    handleFormSubmit() {
      fetch(this.uri, {
        id: undefined,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.project),
      })
        .then(() => {
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          alert('Edit is Failed!');
          console.log(error.message);
        });
    },
  },
  async mounted() {
    await this.SetInputValues();
  },
};
</script>

<style scoped>
form {
  background: white;
  padding: 20px;
  border-radius: 10px;
}
label {
  display: block;
  color: #777;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 10px 0;
}
input {
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}

input:focus,
textarea:focus {
  outline: 1px solid #777;
}

input[type='checkbox'] {
  height: 3rem;
  outline: none;
}

textarea {
  border: 1px solid #ddd;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  min-height: 2.5rem;
  resize: vertical;
}

form input[type='submit'] {
  display: block;
  margin: 20px auto 0;
  background: #00ce89;
  color: white;
  padding: 10px;
  border: 0;
  cursor: pointer;
  border-radius: 6px;
  font-size: 16px;
}
</style>
