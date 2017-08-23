import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../Service/data.service';
import { Cat } from '../../Entity/cat.entity';

@Component({
  selector: 'page1',
  templateUrl: './vote.html',
  styleUrls: ['./vote.css'],
  providers: [ DataService ]
})
export class Vote implements OnInit {
    cat1 : Cat = null;
    cat2 : Cat = null;
    constructor(private dataService : DataService) {
    }
    cats : Cat[] = [];
    async ngOnInit() {
        this.cats = await this.dataService.GetAllCats();
        this.getNextCats();
    }
    async voteFor(catMore : Cat, catLess: Cat) {
        // Hide display
        this.cat1 = null;
        await this.dataService.VoteFor(catMore.id, catLess.id);
        this.getNextCats();
    }

    getNextCats() {
        if (this.cats.length > 2) {
            this.cat1 = this.cats.pop() as Cat;
            this.cat2 = this.cats.pop();
        }
    }

}
