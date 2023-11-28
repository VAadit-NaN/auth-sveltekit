<script lang="ts">
import { Section, Schedule, ScheduleItem } from 'flowbite-svelte-blocks';
import { eventSchema } from '$lib/config/zod-schemas';

import { Drawer, Button, CloseButton, Label, Input, Textarea, Select } from 'flowbite-svelte';
      import { sineIn } from 'svelte/easing';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	const events = eventSchema.pick({ event_title: true, description: true, start_time: true, end_time: true });
	const { form, errors, enhance, delayed } = superForm(data.form, {
		taintedMessage: null,
		validators: events,
		delayMs: 0
	});
    const schedule = [
        {
            time: '08:00 - 09:00',
            href: '/',
            title: 'Opening remarks'
        },
        {
            time: '09:00 - 10:00',
            href: '/',
            title: 'Interview with ENDFRAME '
        },
        {
            time: '10:00 - 11:00',
            href: '/',
            title: 'Hooli hearing'
        },
        {
            time: '12:00 - 13:00',
            href: '/',
            title: 'Scaling your brand from €0 to multimillion euros'
        },
        {
            time: '14:00 - 15:00',
            href: '/',
            title: 'Exploring the balance between customer acquisition and retention'
        }
    ];

      let hidden = true;
      let transitionParams = {
          x: -320,
          duration: 200,
          easing: sineIn
      };
      let selected;
      let categories = [      ];
      const handleCancel = () => {
          hidden = true;
      };
        </script>
    

    <Section name="crudcreatedrawer" sectionClass="bg-orange antialiased">
        
      <button on:click={() => (hidden = false)}>Create product</button>
    
    <Drawer transitionType="fly" {transitionParams} bind:hidden id="sidebar4">
      <div class="flex items-center">
        <h5 id="drawer-label" class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">New Event</h5>
        <CloseButton on:click={() => (hidden = true)} class="mb-4 dark:text-white" />
      </div>
      <form action="?/add" method="post" class="mb-6" use:enhance>
        <div class="mb-6">
          <Label for="name" class="block mb-2">Title</Label>
          <Input id="name" name="title" bind:value={$form.event_title} required placeholder="Task title" />
        </div>
        
        <div class="mb-6">
          <Label for="brand" class="mb-2">Description</Label>
          <Textarea id="message" bind:value={$form.description} placeholder="Enter event description here" rows="4" name="message" />
        </div>
        
        <div class="mb-6">
          <Label for="start" class="block mb-2">Start Time</Label>
          <Input id="start" name="start" bind:value={$form.start_time} required placeholder="start" />
        </div>

        <div class="mb-6">
          <Label for="end" class="block mb-2">End Time</Label>
          <Input id="end" name="end" bind:value={$form.end_time} required placeholder="end" />
        </div>

        <div class="bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute">
          <button type="submit" class="w-full">Add event</button>
          <Button class="w-full" color="light" on:click={handleCancel}>
            <svg aria-hidden="true" class="w-5 h-5 -ml-1 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            Cancel
          </Button>
        </div>
      </form>
    </Drawer>
  </Section>
  
    <Section name="schedule" sectionClass="bg-white dark:bg-gray-900 antialiased">
        <div class="mt-4" slot="subtitle">
          <a href="/" title="" class="inline-flex items-center text-lg font-medium text-primary-600 hover:underline dark:text-primary-500">
            <div class="flex justify-start m-5">
                <button on:click={() => (defaultModal = true)}>Create Event</button>
              </div>
          </a>
        </div>
        {#each schedule as item}
          <ScheduleItem {item} />
        {/each}
    </Section>
  
        