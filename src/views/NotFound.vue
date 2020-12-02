<template>
	<div class="auth-wrapper">
		<form>
			<div class="d-flex justify-content-center">
				<img src="@/assets/logo-ohno.png" height="60" />
			</div>
			<h1 class="text-center">Uh oh!</h1>
			<div class="col text-center">
				<div>
					I'm not sure how you made it here, but this page doesnt exist!
				</div>
				<router-link to="/login" class="text-info">
					Take me back to safety
				</router-link>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	name: "NotFound",
	components: {},
};
</script>
