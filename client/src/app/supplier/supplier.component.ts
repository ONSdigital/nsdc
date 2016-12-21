import { Component, OnInit } from '@angular/core';
import { Supplier } from './supplier';
import { SupplierService } from './supplier.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Configuration } from '../app.constants';

@Component({
  selector: 'supplier-list',
  templateUrl : './supplier.component.html',
  providers: [SupplierService, Configuration]
})
export class SupplierComponent implements OnInit {

    public suppliers: Supplier[];
    public erroreMsg: string;

    constructor(private http: Http, private supplierService: SupplierService ) {}

    ngOnInit(): void {
        this.supplierService.getSuppliers().then(suppliers => this.suppliers = suppliers);
    }
}
