<script lang="ts">
    import { Section, Register } from 'flowbite-svelte-blocks';
	import { ConicGradient } from '@skeletonlabs/skeleton';
	import type { ConicStop } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import { userSchema } from '$lib/config/zod-schemas';
	import { AlertTriangle } from 'lucide-svelte';
	export let data;
	const signInSchema = userSchema.pick({ email: true, password: true });
	const { form, errors, enhance, delayed } = superForm(data.form, {
		taintedMessage: null,
		validators: signInSchema,
		delayMs: 0
	});
	const conicStops: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-primary-900))', start: 75, end: 100 }
	];
</script>
    
    
<Section name="login">
<Register href="/">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
    <form class="flex flex-col space-y-6" method="POST" action="?/login" use:enhance>
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Log in</h3>

        {#if $errors._errors}
		<aside class="alert variant-filled-error mt-6">
			<!-- Icon -->
			<div><AlertTriangle size="42" /></div>
			<!-- Message -->
			<div class="alert-message">
				<h3 class="h3">Sign-in Failed</h3>
				<p>{$errors._errors}</p>
			</div>
		</aside>
	    {/if}
        
        <label class="space-y-2">
        <span>Your email</span>
        <input id = "email" type="email" name="email" placeholder="boffa@deez.com" data-invalid={$errors.email} bind:value={$form.email} class="input" class:input-error={$errors.email} required />
        </label>
        <label class="space-y-2">
        <span>Your password</span>
        <input id="password" type="password" name="password" placeholder="••••" data-invalid={$errors.password} bind:value={$form.password} class="input" class:input-error={$errors.password} required />
        </label>
        {#if $errors.password}
				<small>{$errors.password}</small>
		{/if}
        <div class="flex items-start">
        <a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot password?</a>
        </div>
        <button type="submit" class="btn variant-filled-primary w-full"
			>{#if $delayed}<ConicGradient stops={conicStops} spin width="w-6" />{:else}Sign in{/if}</button
		>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
        Don't have an account yet? <a href="/signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
        </p>
    </form>
    </div>
</Register>
</Section>
