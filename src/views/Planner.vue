<template>
  <div class="planner">
    <div class="base-header text-center">
      <div>Planner</div>
    </div>
    <div class="row has-header">
      <b-list-group class="w-100 mx-4">
        <b-list-group-item class="d-flex justify-items-start align-items-center">
          <div class="text-dark text-left">
            <b-icon
              icon="clipboard"
              variant="dark"
              scale="1.5"
              class="mr-2"
            ></b-icon>
            Tasks
          </div>
          <b-icon
              icon="chevron-right"
              variant="secondary"
              class="ml-auto"
            ></b-icon>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-items-start align-items-center">
          <div class="text-dark text-left">
            <b-icon
              icon="calendar"
              variant="dark"
              scale="1.5"
              class="mr-2"
            ></b-icon>
            Events
          </div>
          <b-icon
              icon="chevron-right"
              variant="secondary"
              class="ml-auto"
            ></b-icon>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-items-start align-items-center">
          <div class="text-dark text-left">
            <b-icon
              icon="clock-history"
              variant="dark"
              scale="1.5"
              class="mr-2"
            ></b-icon>
            Time Limits
          </div>
          <b-icon
              icon="chevron-right"
              variant="secondary"
              class="ml-auto"
            ></b-icon>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-items-start align-items-center">
          <div class="text-dark text-left">
            <b-icon
              icon="alarm"
              variant="dark"
              scale="1.5"
              class="mr-2"
            ></b-icon>
            Alarms
          </div>
          <b-icon
              icon="chevron-right"
              variant="secondary"
              class="ml-auto"
            ></b-icon>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>