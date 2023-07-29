export interface IMessage {
  loading_message: string;
  completed_message: string;
}

export enum endpoints {
  FETCH_PROJECT_LIST = 'gantt/getProjectList',
  FETCH_TASK_LIST = 'gantt/getTaskList',
  FETCH_CUSTOM_FIELDS = 'customField/setCustomFields',
  ADD_CUSTOM_FIELD = 'customField/addCustomField',
  UPDATE_CUSTOM_FIELD = 'customField/updateCustomField',
  ADD_PROJECT = 'folder/addProject',
  ADD_FOLDER = 'folder/addFolder',
  DELETE_FOLDER = 'folder/deleteFolder',
  DELETE_PROJECT = 'folder/deleteProject',
  UPDATE_PROJECT = 'folder/updateProject',
  UPDATE_FOLDER = 'folder/updateFolder',
  ADD_TASK = 'task/addTask',
  UPDATE_TASK = 'task/updateTask',
}

export const messages: { [endpoint: string]: IMessage } = {
  [endpoints.FETCH_PROJECT_LIST]: {
    loading_message: 'Fetching Projects...',
    completed_message: 'Projects Fetched Successfully!!',
  },
  [endpoints.FETCH_TASK_LIST]: {
    loading_message: 'Fetching Tasks...',
    completed_message: 'Tasks Fetched Successfully!!',
  },
  [endpoints.FETCH_CUSTOM_FIELDS]: {
    loading_message: 'Fetching Custom Fields...',
    completed_message: 'Custom Fields Fetched Successfully!!',
  },
  [endpoints.ADD_CUSTOM_FIELD]: {
    loading_message: 'Creating Custom Field...',
    completed_message: 'Custom Field Added Successfully!!',
  },
  [endpoints.UPDATE_CUSTOM_FIELD]: {
    loading_message: 'Updating Custom Field...',
    completed_message: 'Custom Field Updated Successfully!!',
  },
  [endpoints.DELETE_FOLDER]: {
    loading_message: 'Deleting Folder...',
    completed_message: 'Folder Deleted Successfully!!',
  },
  [endpoints.DELETE_PROJECT]: {
    loading_message: 'Deleting Project...',
    completed_message: 'Project Deleted Successfully!!',
  },
  [endpoints.ADD_PROJECT]: {
    loading_message: 'Creating Project...',
    completed_message: 'Project created Successfully!!',
  },
  [endpoints.ADD_FOLDER]: {
    loading_message: 'Creating Folder...',
    completed_message: 'Folder created Successfully!!',
  },
  [endpoints.UPDATE_FOLDER]: {
    loading_message: 'Updating Folder...',
    completed_message: 'Folder updated Successfully!!',
  },
  [endpoints.UPDATE_PROJECT]: {
    loading_message: 'Updating Project...',
    completed_message: 'Project updated Successfully!!',
  },
  [endpoints.ADD_TASK]: {
    loading_message: 'Creating Task...',
    completed_message: 'Task created Successfully!!',
  },
  [endpoints.UPDATE_TASK]: {
    loading_message: 'Updating Task...',
    completed_message: 'Task updated Successfully!!',
  },
};
