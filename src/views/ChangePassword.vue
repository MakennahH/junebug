<template>
	<div class="editprofile pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/settings" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>Reset Password</div>
		</div>
		<div class="row has-header">
			<div class="col mx-2">
                <div class="my-2">Click the button below, we'll send you an email that will let you reset your password.</div>
				<div>
					<b-button block class="btn my-2" variant="info" @click="resetPassword">Reset Password</b-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class ChangePassword extends Vue {
	private email = this.$store.state.userProfile.email

    resetPassword () {
		this.$store.dispatch("changePassword", this.email).then(() => {this.$router.replace('/settings')});
	}
}
</script>
