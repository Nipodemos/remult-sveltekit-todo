import { Allow, BackendMethod, remult } from 'remult';
import { Task } from './Task';

export class TasksController {
	@BackendMethod({ allowed: Allow.authenticated })
	static async setAllCompleted(completed: boolean) {
		const taskRepo = remult.repo(Task);
		const allTasks = await taskRepo.find();

		for (const task of allTasks) {
			task.completed = completed;
			await taskRepo.save(task);
		}
	}
}
