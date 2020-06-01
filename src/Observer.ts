const emptyObserver = {
    next: () => {
    },
    error: (err) => {
        throw err;
    },
    complete: () => {
    }
}

export class Observer {
    private destination = null;
    private isStopped = false;

    constructor(next, error?, complete?) {
        switch (arguments.length) {
            case 0:
                this.destination = this.safeObserver(emptyObserver);
            case 1:
                if (!next) {
                    this.destination = this.safeObserver(emptyObserver);
                }
                if (typeof next === 'object') {
                    this.destination = this.safeObserver(next);
                }
            default:
                this.destination = this.safeObserver(next, error, complete);
        }
    }

    safeObserver(observerOrNext, error?, complete?) {
        if (typeof observerOrNext === 'object') {
            return {
                next: observerOrNext.next || (() => {
                }),
                error: observerOrNext.error || ((error) => {
                    throw error
                }),
                complete: observerOrNext.complete || (() => {
                })
            }
        } else {
            return {
                next: observerOrNext,
                error,
                complete
            }
        }
    }

    unsubscribe() {
        this.isStopped = true;
    }

    next(value) {

        if (!this.isStopped && this.next) {
            // 先判斷是否停止過
            try {
                this.destination.next(value); // 傳送值
            } catch (err) {
                this.unsubscribe();
                throw err;
            }
        }
    }

    error(err) {
        if (!this.isStopped && this.error) {
            // 先判斷是否停止過
            try {
                this.destination.error(err); // 傳送錯誤
            } catch (anotherError) {
                this.unsubscribe();
                throw anotherError;
            }
            this.unsubscribe();
        }
    }

    complete() {
        if (!this.isStopped && this.complete) {
            // 先判斷是否停止過
            try {
                this.destination.complete(); // 發送停止訊息
            } catch (err) {
                this.unsubscribe();
                throw err;
            }
            this.unsubscribe(); // 發送停止訊息後退訂
        }
    }

}
