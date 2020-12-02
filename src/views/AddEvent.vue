<template>
  <div class="add-event">
    <div class="base-header text-center">
      <router-link class="header-button-left" to="/events" replace>
        <b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
      </router-link>
      <div>Add an Event</div>
    </div>
    <div class="row has-header">
      <form class="col mx-2">
        <b-button @click="addEvent" class="btn btn-info mt-2" block>
          Save
        </b-button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class AddEvent extends Vue {
  addEvent() {
    // TODO: save the Event
    this.$router.replace("/events");
  }
}
</script>