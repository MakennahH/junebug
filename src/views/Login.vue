<template>
  <div class="auth-wrapper">
    <form class="col">
      <div class="d-flex justify-content-center">
        <img src="@/assets/logo-white.png" height="60" />
      </div>
      <h1 class="text-center">Junebug</h1>
      <b-form-input class="form-group-top" type="text" placeholder="username" />
      <b-form-input
        class="form-group-bottom"
        type="password"
        placeholder="password"
      />
      <div>
        <b-button to="/today" block class="btn btn-info my-2">Log in</b-button>
        <router-link to="/signup" class="text-info"> Sign up </router-link>
        <router-link to="/forgotpassword" class="text-info float-right">
          Forgot Password
        </router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {}
</script>