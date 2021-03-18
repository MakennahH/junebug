<template>
	<div class="auth-wrapper">
		<form class="col">
			<div class="d-flex justify-content-center">
				<img src="@/assets/logo-white.png" height="65" />
			</div>
			<h1 class="text-center">Junebug</h1>
			<b-form-input class="form-group-top" type="text" placeholder="username" v-model="emailModel" />
			<b-form-input class="form-group-bottom" type="password" placeholder="password" v-model="passwordModel" />
			<div>
				<b-button block class="btn my-2" variant="info" @click="logIn">Log in</b-button>
				<router-link to="/signup" class="text-info"> Sign up </router-link>
				<router-link to="/forgotpassword" class="text-info float-right"> Forgot Password </router-link>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
	private email = "";
	private password = "";

	get emailModel() {
		return this.email;
	}

	set emailModel(value) {
		this.email = value;
	}

	get passwordModel() {
		return this.password;
	}

	set passwordModel(value) {
		this.password = value;
	}

	logIn() {
		this.$store.dispatch("login", {
			email: this.emailModel,
			password: this.passwordModel,
		});
	}
}
</script>
