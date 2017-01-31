export class RoleJourneyVersion {
  version_id: number;
  version_number: number;
  name: string;
  displayName: string;

  constructor(
    version_id,
    version_number,
    name,
    display_name
  ) {
    this.version_id = version_id;
    this.version_number = version_number;
    this.name = name;
    this.displayName = display_name;
  }
}
