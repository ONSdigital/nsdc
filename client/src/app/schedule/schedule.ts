
export class Schedule {
  id: number;
  date: string;
  status: string;
  journey_version_id: number;

  constructor(object) {
    this.id = object.id;
    this.date = object.date;
    this.status = object.status;
    this.journey_version_id = object.journey_version_id;
  }
}
