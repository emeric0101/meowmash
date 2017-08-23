import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../Service/data.service';
import { Cat } from '../../Entity/cat.entity';
import { Vote } from '../../Entity/vote.entity';

@Component({
  selector: 'result',
  templateUrl: './result.html',
  styleUrls: ['./result.css'],
  providers: [ DataService ]
})

export class Result implements OnInit {
    cats : Cat[] = [];
    catVoted : CatVoted[] = [];
    constructor(private dataService : DataService) {
    }
    async ngOnInit() {
        // Getting cats and votes from the server
        let cats = await this.dataService.GetAllCats();
        let votes = await this.dataService.GetAllVotes();
        // Merge cats and votes then remove all unscored cats
        let catVoted = cats.map(e => {
            let vote = votes.find(v => v.catId == e.id);
            return new CatVoted(e, vote);
        }).filter((e) => e.vote != undefined);
        // sorting
        this.catVoted = catVoted.sort((a, b) => {
            return b.vote.score - a.vote.score;
        });

    }
}
class CatVoted {
    public constructor(public cat : Cat, public vote : Vote) {

    }
}
