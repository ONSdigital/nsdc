import { MenuItem } from './navbar.metadata';

export const MenuItems: MenuItem[] = [
  { path: 'suppliers', title: 'Suppliers', permission: 'VIEW_JOURNEYS', icon: 'glyphicon-blackboard' },
  { path: 'users', title: 'Users', permission: 'VIEW_USERS', icon: 'glyphicon-user' },
  { path: 'roles', title: 'Roles', permission: 'VIEW_ROLES', icon: 'glyphicon-list-alt' },
  { path: 'permissions', title: 'Permissions', permission: 'VIEW_PERMISSIONS', icon: 'glyphicon-remove-circle' },
  { path: 'journeys', title: 'Journeys', permission: 'VIEW_JOURNEYS', icon : 'glyphicon-globe' },
  { path: 'upload', title: 'File Upload', permission: 'DATA_IMPORT', icon: 'glyphicon-upload' },
  { path: 'audit', title: 'File Audit', permission: 'DATA_AUDIT', icon: 'glyphicon-file' }
];
