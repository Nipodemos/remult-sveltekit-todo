import { remultApi } from 'remult/remult-sveltekit';
import { Task } from '../shared/Task';
import { TasksController } from '../shared/TasksController';
import { createPostgresDataProvider } from 'remult/postgres';
import { DATABASE_URL } from '$env/static/private';
import type { UserInfo } from 'remult';

export const api = remultApi({
	entities: [Task],
	controllers: [TasksController],
	dataProvider: DATABASE_URL
		? createPostgresDataProvider({ connectionString: DATABASE_URL })
		: undefined,
	getUser: async (event) => {
		const auth = await event?.locals?.auth();
		return auth?.user as UserInfo;
	}
});
