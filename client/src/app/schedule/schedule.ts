
export class Schedule {
  id: number;
  date: string = new Date().toUTCString();
  status: string = 'pending';
  journey_version_id: number;
}
