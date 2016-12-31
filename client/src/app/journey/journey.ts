export class Journey {
    a: number;
    name: string;
    supplier_id: number;
}

export class JourneyVersion {
    supplier_id: number;
    journey_id: number;
    version_number: number;
}
