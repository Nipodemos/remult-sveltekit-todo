import { remultApi } from 'remult/remult-sveltekit';
import { Task } from '../shared/Task';
import { TasksController } from '../shared/TasksController';
import { createPostgresDataProvider } from 'remult/postgres';
import { DATABASE_URL } from '$env/static/private';
import type { UserInfo } from 'remult';

// Importa o detector de build do SvelteKit
import { building } from '$app/environment';

export const api = remultApi({
	entities: [Task],
	controllers: [TasksController],

	// --- LÓGICA DO DATAPROVIDER SIMPLIFICADA ---
	dataProvider: async () => {
		// A condição agora é uma só:
		// SÓ conecte ao Postgres se NÃO estivermos no build E a URL do banco existir.
		if (!building && DATABASE_URL) {
			console.log('Ambiente de execução (dev/prod): conectando ao PostgreSQL.');
			return createPostgresDataProvider({
				connectionString: DATABASE_URL,
				configuration: {
					ssl: {
					    rejectUnauthorized: false
				        }
				}
			});
		}

		// Em todos os outros casos (estamos no build OU a DATABASE_URL não foi fornecida),
		// retornamos undefined. O Remult cuidará de ativar o JsonDataProvider automaticamente.
		console.log('Build ou sem DATABASE_URL detectado: Remult usará o JsonDataProvider padrão.');
		return undefined;
	},
	// ------------------------------------------

	getUser: async (event) => {
		const auth = await event?.locals?.auth();
		return auth?.user as UserInfo;
	}
});
