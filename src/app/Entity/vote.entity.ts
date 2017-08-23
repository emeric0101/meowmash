
export class Vote {
    get CatId() : string {
        return this.catId;
    }

    get Score() : number {
        return this.score;
    }

    public constructor(
        private catId : string,
        private score : number
    ) {

    }
}
