import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
// import { auth } from '$lib/server/lucia';
import { userSchema } from '$lib/config/zod-schemas';

const signInSchema = userSchema.pick({
	email: true,
	password: true
});

interface LoginResponse {
	authentication: {
	  password: string;
	  salt: string;
	  sessionToken: string;
	};
	_id: string;
	username: string;
	email: string;
	__v: number;
  }
 


export const load = async (event) => {
	// const session = await event.locals.auth.validate();
	// if (session) throw redirect(302, '/dashboard');
	// const form = await superValidate(event, signInSchema);
	// return {
	// 	form
	// };
};

const login: Action = async(event) => {
	const form = await superValidate(event, signInSchema);

	if (!form.valid) {
		return fail(400, {
			form
		});
	}
	console.log(form.data);

	try {
		console.log('sign in user');
	
		const response = await fetch('https://planpal-backend-xig7.onrender.com/auth/login', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(form.data),
		})

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		  }
	  
		  const result: LoginResponse = await response.json();
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

	return { form };
}


export const actions = { login };