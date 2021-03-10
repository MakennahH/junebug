<template>
	<div class="editprofile pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/settings" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>Edit Profile</div>
		</div>
		<div class="row has-header">
			<div class="col mx-2">
				<div class="my-2">Enter your updated email address down below.</div>
				<b-form-input class="form-group-top" type="text" placeholder="new email" v-model="emailModel" />
				<div>
					<b-button block class="btn my-2" variant="info" @click="saveProfile">Save</b-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class EditProfile extends Vue {
	private email = "";
	private loading = false;

	get emailModel() {
		return this.email;
	}

	set emailModel(value) {
		this.email = value;
	}

	saveProfile() {
		this.$store.dispatch("changeEmail", this.emailModel);
	}
}
</script>
