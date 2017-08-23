import { Injectable, HostListener } from '@angular/core';

import { Vote } from '../Entity/vote.entity';
import { Cat } from '../Entity/cat.entity';

import { Router } from '@angular/router';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
    private url = "http://localhost/meowmash/server/";
    public constructor(
        private http: Http
    ) {

    }
    /** Get all cats (need to use a proxy because CORS)
    */
    public async GetAllCats() : Promise<Cat[]> {
        let r = await this.http.get(this.url + "Cat/getAll.json").toPromise();
        if (r.status != 200) {
            throw "HTTP ERROR";
        }
        return r.json().images as Cat[];
    }
    /** Get all votes
    */
    public async GetAllVotes() : Promise<Vote[]>{
        let r = await this.http.get(this.url + "Vote/getAll.json").toPromise();
        if (r.status != 200) {
            throw "HTTP ERROR";
        }
        return r.json().votes as Vote[];
    }
    /** Vote for a cat */
    public async VoteFor(id : string) {
        let r = await this.http.get(this.url + "Vote/voteFor/" + id + ".json").toPromise();
        if (r.status != 200) {
            throw "HTTP ERROR";
        }
        if (r.json().data.result != true) {
            throw "BAD RESPONSE";
        }
    }
}
