export interface ITask {
  id?: number;
  taskName?: string;
  taskDescription?: string;
  projectId?: number;
  employeeId?: number;
  taskImplementer?: string;
  taskPriority?: string;
  taskStatus?: string;
}
