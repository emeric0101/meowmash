import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../Service/data.service';

@Component({
  selector: 'page1',
  templateUrl: './vote.html',
  styleUrls: ['./vote.css'],
  providers: [ DataService ]
})
export class Vote {
    constructor(private dataService : DataService) {

    }

}
