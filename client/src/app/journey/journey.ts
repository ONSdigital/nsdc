export class Journey {
  id: number;
  name: string;
  description: string;
  validator: string;
}

export class JourneyStep {
  id: number;
  journey_id: number;
  name: string;
  description: string;
  short_name: string;
}
