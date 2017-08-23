export class Cat {
    public get Url() : string {
        return this.url;
    }
    public get Id() : string {
        return this.id;
    }

    public constructor(
        private url : string,
        private id : string
    ) {

    }
}
