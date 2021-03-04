<template>
	<div class="auth-wrapper">
		<form class="col">
			<div class="d-flex justify-content-center">
				<img src="@/assets/logo-white.png" height="65" />
			</div>
			<h1 class="text-center">Create an account</h1>
			<b-form-input class="form-group-top" type="text" placeholder="email" v-model="emailModel"/>
			<b-form-input class="form-group-top" type="password" placeholder="password" v-model="passwordModel"/>
			<b-form-input class="form-group-bottom" type="password" placeholder="confirm password" v-model="confirmPasswordModel" />
			<div>
				<b-button block class="btn my-2" variant="info" @click="signUp" >Sign Up</b-button>
				<router-link to="/login" class="text-info"> Log In </router-link>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Signup extends Vue {
	private email = "";
	private password = "";
	private confirmPassword = "";

	get emailModel(){
		return this.email;
	}

	set emailModel(value){
		this.email = value;
	}

	get passwordModel(){
		return this.password;
	}

	set passwordModel(value){
		this.password = value;
	}

	get confirmPasswordModel(){
		return this.confirmPassword;
	}

	set confirmPasswordModel(value){
		this.confirmPassword = value;
	}

	signUp() {
		console.log(this.emailModel);
		if (this.passwordModel === this.confirmPasswordModel) {
			this.$store.dispatch("signup", {
				email: this.emailModel,
				password: this.passwordModel,
			});
		}
		else{
			console.log("passwords don't match!");
		}
	}
}
</script>
