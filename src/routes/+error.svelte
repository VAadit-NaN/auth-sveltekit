<script lang="ts">
	import { page } from '$app/stores';
</script>

<div>
	{#if $page.status === 404}
		<h1>Page Not Found.</h1>
		<h3 class="mt-6"><a href="/">Go Home</a></h3>
	{:else}
		<h1 class="h1">Unexpected Error</h1>
		<img src="https://m.media-amazon.com/images/I/61RZ8Hq2kQL._AC_UF1000,1000_QL80_.jpg" alt="Italian Trulli">
	{/if}

	{#if $page.error?.errorId}
		<p class="mt-6">Error ID: {$page.error.errorId}</p>
	{/if}
</div>