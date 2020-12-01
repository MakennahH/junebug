<template>
  <div class="notes">
    <div class="base-header text-center">
      <div>Notes</div>
      <router-link class="header-button-right" to="/add-note" replace>
        <b-icon icon="plus" variant="light" scale="0.7"></b-icon>
      </router-link>
    </div>
    <div class="row has-header">
      <b-list-group class="w-100 mx-4">
        <b-list-group-item class="text-dark text-left">
            This is the start of a note...
        </b-list-group-item>
        <b-list-group-item class="text-dark text-left">
            This is the start of a different note...
        </b-list-group-item>
        <b-list-group-item class="text-dark text-left">
            Milk eggs paper plates 200 lady bugs
        </b-list-group-item>
        <b-list-group-item class="text-dark text-left">
            Dont trust Sarah.
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>