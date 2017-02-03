
export class TableOption {
  type: string;
  action: string;
  style?: string;
  icon?: string;
  confirm?: boolean = false;
  confirmMessage?: string = 'Are you sure you want to do this?';
}
