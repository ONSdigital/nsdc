import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { Configuration } from '../../app.constants';

import { Supplier } from '../../supplier/supplier';
import { SupplierService } from '../../supplier/supplier.service';

import { Journey } from '../journey';
import { JourneyService } from '../journey.service';

@Component({
  selector: 'journey-manage',
  templateUrl : './journey-manage.component.html',
  providers: [JourneyService, SupplierService, Configuration]
})
export class JourneyManageComponent implements OnInit {

    public suppliers: Supplier[];
    public journeys: Journey[];
    public journeyVersions: JourneyVersions[];
    public errorMsg: string;

    private supplierId: number;

    constructor(
        private http: Http,
        private supplierService: SupplierService,
        private journeyService: JourneyService
    ) {}

    ngOnInit(): void {
        this.supplierService.getSuppliers().then(suppliers => this.suppliers = suppliers);
    }

    onChange(supplierId) {
        this.supplierId = supplierId;
        this.journeyVersions = null;
        this.journeyService.getJourneysBySupplier(supplierId).then(journeys => this.journeys = journeys);
    }

    onSelect(journeyId) {
        this.journeyService.getVersionsBySupplierAndJourney(this.supplierId, journeyId).then(
            versions => this.journeyVersions = versions);
    }
}
