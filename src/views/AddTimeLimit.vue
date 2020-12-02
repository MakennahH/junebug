<template>
  <div class="add-timelimit">
    <div class="base-header text-center">
      <router-link class="header-button-left" to="/timelimits" replace>
        <b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
      </router-link>
      <div>Add a TimeLimit</div>
    </div>
    <div class="row has-header">
      <form class="col mx-2">
        <b-button @click="addTimeLimit" class="btn btn-info mt-2" block>
          Save
        </b-button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class AddTimeLimit extends Vue {
  addTimeLimit() {
    // TODO: save the TimeLimit
    this.$router.replace("/timelimits");
  }
}
</script>