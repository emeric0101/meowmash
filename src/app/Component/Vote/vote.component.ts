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
    sentences = [
        'Vote pour moi si tu m\'aimes',
        'Non vote pour moi',
        'Je t\'offrirai une souris',
        'Moi je t\'amenerai un oiseau',
        'Je partargerai un peu mes croquettes',
        'Je suis si mignon....',
        'Je suis le plus beau de tout les chats !',
        'Ne résiste pas et vote pour moi !',
        'Humain, tu dois voter pour moi, c\'est un ordre',
        'VOTE VOTE VOTE',
        'Miaou'
    ]


    constructor(private dataService : DataService) {
    }
    randomSentence() {
        let i = parseInt(Math.random() * (this.sentences.length - 0) + "");
        return this.sentences[i];
    }

    OnError() {
        this.getNextCats();
    }

    async ngOnInit() {
        let home1 = document.querySelector('.home1');
        let home2 = document.querySelector('.home2');
        let home3 = document.querySelector('.home3');

        window['MotionUI'].animateIn(home1, 'scale-in-up', () => {
            window['MotionUI'].animateOut(home1, 'fade-out');
            window['MotionUI'].animateIn(home2, 'scale-in-up', () => {
                window['MotionUI'].animateOut(home2, 'fade-out');
                window['MotionUI'].animateIn(home3, 'scale-in-up', () => {
                    window['MotionUI'].animateOut(home3  , 'fade-out');
                    window['MotionUI'].animateIn(document.querySelector('.mainWrapper'), 'scale-in-up', () => {

                    });
                });
            });
        });

        let cats = await this.dataService.GetAllCats();
        // Create pairs
        for (let cat1 of cats) {
            for (let cat2 of cats) {
                if (cat1 == cat2) {continue;}
                this.cats.push(new CatPair(cat1, cat2, this.randomSentence(), this.randomSentence()));
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
    public constructor(public c1 : Cat, public c2 : Cat, public p1 : string, public p2: string) {}
}
