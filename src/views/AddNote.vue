<template>
  <div class="notes">
    <div class="base-header text-center">
      <div>Add a Note</div>
    </div>
    <div class="row has-header">
      <form class="col mx-2">
        <b-form-textarea
          class="textarea"
          v-model="text"
          placeholder="start a note..."
          no-auto-shrink
          no-resize
        ></b-form-textarea>
        <b-button @click="addNote" class="btn btn-info mt-2" block>
          Save note
        </b-button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class AddNote extends Vue {
  addNote() {
    // TODO: save the note
    this.$router.replace("/notes");
  }
}
</script>

<style scoped>
.textarea {
  height: calc(100vh - 180px);
}
</style>