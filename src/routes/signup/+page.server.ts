import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { userSchema } from '$lib/config/zod-schemas';

const signUpSchema = userSchema.pick({
    username: true,
	email: true,
	password: true,
    confirmPassword: true
});

export const load = async (event) => {
};


const signup: Action = async(event) => {
	const form = await superValidate(event, signUpSchema);

	if (!form.valid) {
		return fail(400, {
			form
		});
	}
	const payload = {
        username: form.data.username,
        email: form.data.email,
        password: form.data.password
    }

	try {
		console.log('sign in user');
	
		const response = await fetch('https://planpal-backend-xig7.onrender.com/auth/register', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		  }
	  
		  const result = await response.json();
		  console.log(result);
		  const sess: string = result["authentication"]["sessionToken"];

		  cookies.set('session', sess, {
			// send cookie for every page
			path: '/',
			// server side only cookie so you can't use `document.cookie`
			httpOnly: true,
			// only requests from same site can send cookies
			// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
			sameSite: 'strict',
			// only sent over HTTPS in production
			secure: process.env.NODE_ENV === 'production',
			// set cookie to expire after a month
			maxAge: 60 * 60 * 24 * 30,
		  })
	} catch (e) {
		//TODO: need to return error message to client
		return setError(form, '', ['The email or password is incorrect']);
	}

	throw redirect(302, '/eventcal');
}


export const actions = { signup };