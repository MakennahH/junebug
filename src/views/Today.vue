<template>
  <div class="home">
    <div class="base-header text-center">
      <div>Home</div>
    </div>
    <div class="row has-header mx-3">
      <h3>Today:</h3>
      <b-list-group class="w-100 text-dark text-left">
        <b-list-group-item>
          9:00am
        </b-list-group-item>
        <b-list-group-item class="bg-info text-light">
          10:00am
          Class
        </b-list-group-item>
        <b-list-group-item>
          11:00am
        </b-list-group-item>
        <b-list-group-item class="bg-warning">
          12:00pm
          Doctor's Appt
        </b-list-group-item>
        <b-list-group-item>
          1:00pm
        </b-list-group-item>
        <b-list-group-item>
          2:00pm
        </b-list-group-item>
        <b-list-group-item class="bg-success">
          3:00pm
          Go grocery shopping
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Today extends Vue {
}
</script>
