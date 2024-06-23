// @ts-nocheck
/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
// import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig(() => {
	// const env = dotenv.config({path: `.env-cmdrc.json`}).parsed;
	// expand(env);

	return {
        server: {
            hmr: false
        },
		define: {
			'process.env': {},
			global: {},
		},
		plugins: [react()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
				buffer: 'buffer/',
				util: 'util/',
				process: 'process/browser',
				stream: 'stream-browserify',
				crypto: 'crypto-browserify',
			},
		},
		optimizeDeps: {
			esbuildOptions: {
				jsx: 'automatic',
			},
		},
	};
});
