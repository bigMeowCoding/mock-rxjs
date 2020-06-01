import {Observer} from "./Observer";

export class Observable {
    private readonly _subscribe = null;

    constructor(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }

    static create(subscribe) {
        return new Observable(subscribe);
    }

    subscribe(next, error?, complete?) {
        return this._subscribe(new Observer(next, error, complete));
    }
}
