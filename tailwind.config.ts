
import { join } from 'path';
import type { Config } from 'tailwindcss';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

import flowbitePlugin from 'flowbite/plugin';

const config: Config = {
	// 3. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 4. Append the path to the Skeleton package
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		// 5. Extend the theme with additional configurations
		extend: {},
	},
	plugins: [
		forms,
		typography,
		skeleton,
		flowbitePlugin,
	],
};

export default config;
						