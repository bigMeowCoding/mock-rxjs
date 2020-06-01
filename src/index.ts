// import html from './index.html'
// import styles from './styles/index.less';


import {Observable} from "./Observable";

var observable = Observable.create(function (observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete(); // error: complete is not a function
})

var observer = {}

observable.subscribe((data) => {
    console.log(data)
}, (error) => {
    console.error(error)
}, (data) =>{
    console.log(data);
    console.log('complete')
})
