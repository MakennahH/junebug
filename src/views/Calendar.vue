<template>
  <div class="calendar">
    <div class="base-header text-center">
      <div>Calendar</div>
    </div>
    <div class="row has-header mx-3">
      <h3>October</h3>
      <b-card class="w-100">
        <div class="d-flex">
          <div class="calendar-day text-dark">Sun</div>
          <div class="calendar-day text-dark">Mon</div>
          <div class="calendar-day text-dark">Tue</div>
          <div class="calendar-day text-dark">Wed</div>
          <div class="calendar-day text-dark">Thu</div>
          <div class="calendar-day text-dark">Fri</div>
          <div class="calendar-day text-dark">Sat</div>
        </div>
        <div class="mt-2 d-flex justify-content-start flex-wrap">
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card no-body class="calendar-day bg-light py-5"></b-card>
          <b-card no-body class="calendar-day bg-light py-5">
            <b-icon icon="circle-fill" variant="primary" class="mx-auto">
            </b-icon>
          </b-card>
          <b-card no-body class="calendar-day bg-light py-5">
            <b-icon icon="circle-fill" variant="danger" class="mx-auto">
            </b-icon>
          </b-card>
          <b-card no-body class="calendar-day bg-light py-5"></b-card>
          <b-card no-body class="calendar-day bg-light py-5"></b-card>
          <b-card no-body class="calendar-day bg-light py-5">
            <b-icon icon="circle-fill" variant="warning" class="mx-auto">
            </b-icon>
          </b-card>
          <b-card no-body class="calendar-day bg-light py-5"></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
          <b-card class="calendar-day "></b-card>
        </div>
      </b-card>
    </div>
  </div>
</template>

<style scoped>
.calendar-day {
  width: 14.2%;
}
.bg-light {
  background: #e8e2e9!important;
}
</style>