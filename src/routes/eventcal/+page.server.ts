import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
// import { auth } from '$lib/server/lucia';
import { eventSchema } from '$lib/config/zod-schemas';
import { A } from 'flowbite-svelte';

const events = eventSchema.pick({
    token: true,
	event_title: true,
    description: true,
    start: true,
    end: true,
});



export const load = async (event) => {
};



const add: Action = async(event) => {
	const form = await superValidate(event, events);

	if (!form.valid) {
		return fail(400, {
			form
		});
	}
	console.log(form.data);

	try {
		console.log('make event');
        console.log(event.locals.userid);
	
		const response = await fetch('https://planpal-backend-xig7.onrender.com/events/:id', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(form.data),
		})

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		  }
	  
		  const result = await response.json();
		  console.log(result);

        } catch (error) {
            console.error('Error:', error);
        }
	throw redirect(302, '/');
}


export const actions = { add };