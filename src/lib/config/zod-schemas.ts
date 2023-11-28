import { z } from 'zod';

export const userSchema = z.object({
	username: z
		.string({ required_error: 'Username is required' })
		.trim(),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Please enter a valid email address' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be at least 6 characters' })
		.trim(),
	confirmPassword: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be at least 6 characters' })
		.trim(),
	//terms: z.boolean({ required_error: 'You must accept the terms and privacy policy' }),
	// role: z
	// 	.enum(['USER', 'PREMIUM', 'ADMIN'], { required_error: 'You must have a role' })
	// 	.default('USER'),
	verified: z.boolean().default(false),
	token: z.string().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional()
});


export const eventSchema = z.object({
	event_title: z
		.string({ required_error: 'title is required' })
		.trim(),
	description: z
		.string(),
	start: z
		.string({ required_error: 'start-time is required' })
		.transform((str) => new Date(str)),
	end: z
		.string({ required_error: 'end-time is required' })
		.transform((str) => new Date(str)),
	token: z.string().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional()
});


export const userUpdatePasswordSchema = userSchema
	.pick({ password: true, confirmPassword: true })
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['confirmPassword']
			});
		}
	});

	export const registeruserschema = userSchema
	.pick({ email: true, password: true, confirmPassword: true })
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['confirmPassword']
			});
		}
	});