<template>
  <nav id="tabs" class="bar bar-tab">
    <router-link class="tab-item ripple" to="/">
      <b-icon icon="house-door" class="icon"></b-icon>
      <span class="tab-label">Home</span>
    </router-link>
    <router-link class="tab-item ripple" to="/calendar">
      <b-icon icon="calendar2-week" class="icon"></b-icon>
      <span class="tab-label">Calendar</span>
    </router-link>
    <router-link class="tab-item ripple" to="/planner">
      <b-icon icon="journal-text" class="icon"></b-icon>
      <span class="tab-label">Planner</span>
    </router-link>
    <router-link class="tab-item ripple" to="/notes">
      <b-icon icon="pencil" class="icon"></b-icon>
      <span class="tab-label">Notes</span>
    </router-link>
    <router-link class="tab-item ripple" to="/settings">
      <b-icon icon="gear" class="icon"></b-icon>
      <span class="tab-label">Settings</span>
    </router-link>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TabBar extends Vue {}
</script>

<style scoped>
.bar-tab {
  line-height: 1;
  bottom: 0;
  display: table;
  width: 100%;
  height: 50px;
  padding: 0;
  table-layout: fixed;
  border-top: 1px solid #dddddd;
  border-bottom: 0;
}

.bar {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 10;
  height: calc(70px + min(12px, env(safe-area-inset-top, 6px)));
  background-color: #ffffff;
  border-bottom: 1px solid #dddddd;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.bar-tab .tab-item {
  -moz-transition: all 0.1s ease-in;
  -o-transition: all 0.1s ease-in;
  -webkit-transition: all 0.1s ease-in;
  transition: all 0.1s ease-in;
  display: table-cell;
  width: 1%;
  height: 50px;
  color: #919191;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  font-size: 18px;
}

.bar-tab .tab-item.active {
  color: #46c8e1;
}

.bar-tab .tab-label {
  margin: 5px 0;
}

.bar-tab .tab-item .icon ~ .tab-label {
  display: block;
  font-size: 12px;
}
</style>
