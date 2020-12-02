<template>
  <div class="auth-wrapper">
    <form class="col">
      <div class="d-flex justify-content-center">
        <img src="@/assets/logo-white.png" height="60" />
      </div>
      <h1 class="text-center">Create an account</h1>
      <b-form-input class="form-group-top" type="text" placeholder="email" />
      <b-form-input
        class="form-group-bottom mb-2"
        type="text"
        placeholder="username"
      />
      <b-form-input
        class="form-group-top"
        type="password"
        placeholder="password"
      />
      <b-form-input
        class="form-group-bottom"
        type="password"
        placeholder="confirm password"
      />
      <div>
        <b-button block class="btn btn-info my-2">Sign Up</b-button>
        <router-link to="/login" class="text-info"> Log In </router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Signup extends Vue {}
</script>