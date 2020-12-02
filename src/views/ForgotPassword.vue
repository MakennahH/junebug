<template>
	<div class="auth-wrapper">
		<form class="col">
			<div class="d-flex justify-content-center">
				<img src="@/assets/logo-white.png" height="60" />
			</div>
			<h1 class="text-center">Forgot Password</h1>
			<div class="my-2">
				Happens to the best of us. Give us your email and we'll get you back on track.
			</div>
			<b-form-input class="form-group-top" type="text" placeholder="email" />
			<div>
				<b-button block class="btn btn-info my-2">Recover Account</b-button>
				<router-link to="/signup" class="text-info"> Sign up </router-link>
				<router-link to="/login" class="text-info float-right">
					Log in
				</router-link>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ForgotPassword extends Vue {}
</script>
