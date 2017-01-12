import { MenuType, MenuItem } from './navbar.metadata';

export const MenuItems: MenuItem[] = [
  { path: 'users', title: 'Users', menuType: MenuType.Left, permission: 'VIEW_USERS' },
  { path: 'roles', title: 'Roles', menuType: MenuType.Left, permission: 'VIEW_ROLES' },
  { path: 'permissions', title: 'Permissions', menuType: MenuType.Left, permission: 'VIEW_PERMISSIONS' },
  { path: 'journeys', title: 'Journeys', menuType: MenuType.Left, permission: 'VIEW_JOURNEYS' },
  { path: 'upload', title: 'File Upload', menuType: MenuType.Left, permission: 'DATA_IMPORT' },
  { path: 'audit', title: 'File Audit', menuType: MenuType.Left, permission: 'DATA_AUDIT' }
];
