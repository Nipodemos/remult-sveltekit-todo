import { remultApi } from 'remult/remult-sveltekit';
import { Task } from '../shared/Task';
import { TasksController } from '../shared/TasksController';
import { createPostgresDataProvider } from 'remult/postgres';
import { DATABASE_URL } from '$env/static/private';
import type { UserInfo } from 'remult';
import { building } from '$app/environment';

export const api = remultApi({
	entities: [Task],
	controllers: [TasksController],
	dataProvider: async () => {
		if (!building && DATABASE_URL) {
			console.log('Ambiente de execução (dev/prod): conectando ao PostgreSQL.');
			return createPostgresDataProvider({
				connectionString: DATABASE_URL,
			});
		}

		console.log('Build ou sem DATABASE_URL detectado: Remult usará o JsonDataProvider padrão.');
		return undefined;
	},
	// ------------------------------------------

	getUser: async (event) => {
		const auth = await event?.locals?.auth();
		return auth?.user as UserInfo;
	}
});
