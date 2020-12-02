<template>
  <div class="add-task">
    <div class="base-header text-center">
      <router-link class="header-button-left" to="/tasks" replace>
        <b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
      </router-link>
      <div>Add a Task</div>
    </div>
    <div class="row has-header">
      <form class="col mx-2">
        <b-button @click="addTask" class="btn btn-info mt-2" block>
          Save
        </b-button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class AddTask extends Vue {
  addTask() {
    // TODO: save the Task
    this.$router.replace("/tasks");
  }
}
</script>