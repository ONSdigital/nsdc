import { Component, OnInit } from '@angular/core';
import { Journey } from './journey';
import { JourneyService } from './journey.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Configuration } from '../app.constants';

@Component({
  selector: 'journey-list',
  templateUrl : './journey.component.html',
  providers: [JourneyService, Configuration]
})
export class JourneyComponent implements OnInit {

    public journeys: Journey[];
    public erroreMsg: string;

    constructor(private http: Http, private journeyService: JourneyService ) {}

    ngOnInit(): void {
        this.journeyService.getJourneys().then(journeys => this.journeys = journeys);
    }
}
