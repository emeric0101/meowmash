import { Injectable, HostListener } from '@angular/core';

import { Vote } from '../Entity/vote.entity';
import { Cat } from '../Entity/cat.entity';

import { Router } from '@angular/router';

import { Headers, Http, RequestOptions,RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
    private url = "http://localhost/meowmash/server/";
    public constructor(
        private http: Http
    ) {

    }
    /** Get all cats (need to use a proxy because CORS) with cache
    */
    cats : Cat[] = null;
    public async GetAllCats() : Promise<Cat[]> {
        if (this.cats != null) {
            return this.cats;
        }
        let r = await this.http.get(this.url + "Cat/getAll.json").toPromise();
        if (r.status != 200) {
            throw "HTTP ERROR";
        }
        this.cats = r.json().images as Cat[];
        return this.cats;
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
    public async VoteFor(idMore : string, idLess : string) {

        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('more', idMore);
        urlSearchParams.append('less', idLess);
        let body = urlSearchParams.toString();

        let opts: RequestOptions = new RequestOptions();
        opts.method = RequestMethod.Post;
        opts.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });


        let r = await this.http.post(this.url + "Vote/voteFor.json", body, opts).toPromise();
        if (r.status != 200) {
            throw "HTTP ERROR";
        }
        if (r.json().result != true) {
            throw "BAD RESPONSE";
        }
    }
}
