export class Journey {
    id: number;
    supplier_id: number;
    journey_name: string;
}

export class JourneyVersion {
    supplier_id: number;
    journey_id: number;
    version_number: number;
}