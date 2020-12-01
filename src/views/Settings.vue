<template>
  <div class="settings">
    <div class="base-header text-center">
      <div>Settings</div>
    </div>
    <div class="row has-header">
      <b-list-group class="w-100 mx-4">
        <b-list-group-item
          class="d-flex justify-content-between align-items-center"
        >
          <div class="text-dark">
            <b-icon
              icon="diamond-half"
              variant="dark"
              scale="1.5"
              class="mr-2"
            ></b-icon>
            Dark mode
          </div>
          <toggle-button
            :width="58"
            :height="32"
            switch-color="#FFFFFF"
            :color="{ checked: '#4EC9A3', unchecked: '#87979A' }"
            :labels="false"
          />
        </b-list-group-item>
        <b-list-group-item
          class="d-flex justify-content-between align-items-center"
        >
          <div class="text-dark">
            <b-icon
              icon="brightness-alt-high-fill"
              variant="dark"
              scale="1.5"
              class="mr-2"
            ></b-icon>
            I start my day at:
          </div>
          <input
            class="w-25"
            type="time"
            id="startTime"
            name="startTime"
            v-model="startTime"
          />
        </b-list-group-item>
        <b-list-group-item
          class="d-flex justify-content-between align-items-center"
        >
          <div class="text-dark">
            <b-icon
              icon="egg-fried"
              variant="dark"
              scale="1.5"
              class="mr-2"
            ></b-icon>
            Meal reminders
          </div>
          <toggle-button
            :width="58"
            :height="32"
            switch-color="#FFFFFF"
            :color="{ checked: '#4EC9A3', unchecked: '#87979A' }"
            :labels="false"
          />
        </b-list-group-item>
        <b-list-group-item
          class="d-flex justify-content-between align-items-center"
        >
          <div class="text-dark">
            <b-icon
              icon="cup-straw"
              variant="dark"
              scale="1.5"
              class="mr-2"
            ></b-icon>
            Drink reminders
          </div>
          <toggle-button
            :width="58"
            :height="32"
            switch-color="#FFFFFF"
            :color="{ checked: '#4EC9A3', unchecked: '#87979A' }"
            :labels="false"
          />
        </b-list-group-item>
        <b-list-group-item
          class="d-flex justify-content-between align-items-center"
        >
          <div class="text-dark">
            <b-icon
              icon="moon"
              variant="dark"
              scale="1.5"
              class="mr-2"
            ></b-icon>
            Sleep reminders
          </div>
          <toggle-button
            :width="58"
            :height="32"
            switch-color="#FFFFFF"
            :color="{ checked: '#4EC9A3', unchecked: '#87979A' }"
            :labels="false"
          />
        </b-list-group-item>
        <b-list-group-item
          class="d-flex justify-content-between align-items-center"
        >
          <div class="text-dark">
            <b-icon
              icon="clipboard-plus"
              variant="dark"
              scale="1.5"
              class="mr-2"
            ></b-icon>
            Meds reminders
          </div>
          <toggle-button
            :width="58"
            :height="32"
            switch-color="#FFFFFF"
            :color="{ checked: '#4EC9A3', unchecked: '#87979A' }"
            :labels="false"
          />
        </b-list-group-item>
        <b-list-group-item :to="'/login'" class="d-flex justify-content-between align-items-center">
          <div class="text-dark">
            <b-icon
              icon="box-arrow-right"
              variant="dark"
              scale="1.5"
              class="mr-2"
            ></b-icon>
            Log out
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Settings extends Vue {
  private time: Date = new Date();
  get startTime() {
    return this.time;
  }
  set startTime(value) {
    this.time = value;
  }
}
</script>
