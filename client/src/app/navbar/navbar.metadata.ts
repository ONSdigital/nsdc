export enum MenuType {
  Left,
  Right
}

export interface MenuItem {
  path: string;
  title: string;
  menuType: MenuType;
  permission: string;
}
