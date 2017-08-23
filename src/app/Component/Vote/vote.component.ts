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
    cats : CatPair[] = [];
    currentPair : CatPair = null;
    constructor(private dataService : DataService) {
    }
    async ngOnInit() {
        let cats = await this.dataService.GetAllCats();
        // Create pairs
        for (let cat1 of cats) {
            for (let cat2 of cats) {
                if (cat1 == cat2) {continue;}
                this.cats.push(new CatPair(cat1, cat2));
            }
        }
        // random sorting (two time to inscrease entropy)
        this.cats = this.cats.sort((a,b) => Math.random()-.5);
        this.cats = this.cats.sort((a,b) => Math.random()-.5);
        
        this.getNextCats();
    }
    async voteFor(catMore : Cat, catLess: Cat) {
        // Hide display
        this.currentPair = null;
        await this.dataService.VoteFor(catMore.id, catLess.id);
        this.getNextCats();
    }

    getNextCats() {
        if (this.cats.length > 0)
            this.currentPair = this.cats.pop();
    }

}

class CatPair {
    public constructor(public c1 : Cat, public c2 : Cat) {}
}
