import uni from "@dcloudio/vite-plugin-uni";
import { defineConfig, loadEnv } from "vite";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	return {
		plugins: [uni()],
		resolve: {
			alias: {
				'@': '/src'
			}
		},
		// server: {
		// 	host: "0.0.0.0",
		// 	proxy: {
		// 		"/app": {
		// 			target: env.VITE_APP_BASE_API+'/app',
		// 			changeOrigin: true,
		// 			rewrite: (path) => path.replace(/^\/app/, ""),
		// 		}
		// 	},
		// }
	}
})
