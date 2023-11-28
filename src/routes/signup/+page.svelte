<script lang="ts">
    import { Section, Register } from 'flowbite-svelte-blocks';
	import type { ConicStop } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
    import { userSchema } from '$lib/config/zod-schemas';
	import { AlertTriangle } from 'lucide-svelte';
	export let Sdata;
	const signInSchema = registeruserschema;;
	const { form, errors, enhance, delayed } = superForm(Sdata.form, {
		taintedMessage: null,
		validators: signInSchema,
		delayMs: 0
	});
	const conicStops: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-primary-900))', start: 75, end: 100 }
	];
</script>

<Section name="register" class="flex justify-center items-center h-screen">
    <Register href="/">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8 bg-white-200 rounded-md">
            <form class="flex flex-col space-y-6" action="?/signup">
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

                <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Create an account</h3>
                
                <label class="space-y-2">
                    <span>Your email</span>
                    <input type="email" name="email" bind:value={$form.email} placeholder="name@company.com" required />
                </label>
                <label class="space-y-2">
                    <span>Your password</span>
                    <input type="password" name="password" placeholder="•••••" required />
                </label>
                <label class="space-y-2">
                    <span>Confirm password</span>
                    <input type="password" name="confirm-password" placeholder="•••••" required />
                </label>
                
                <button type="submit" class="w-full">Create an account</button>
                <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
              Already have an account? <a href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
            </div>
          </form>
        </div>
      </Register>
    </Section>