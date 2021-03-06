import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {forkJoin, fromEvent, Subject, timer} from 'rxjs';
import {debounceTime, map, mapTo, mergeMap, pairwise} from 'rxjs/operators';

@Component({
  selector: 'my-app',
    template: `
        <input (input)="input($event)">
    `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit{
  private searchInput = new Subject<string>();

  ngOnInit(): void {

      // debounce
      this.searchInput
          .pipe(debounceTime(1000))
          .subscribe(value => console.log(value));


      // forkJoin
      const a = timer(1000).pipe(mapTo({id: 1}));
      const b = timer(2000).pipe(mapTo({id: 2}));

      forkJoin([a, b]).subscribe(res => {
          const [resA, resB] = res
          console.log("forkJoin", resA, resB)
      });

      //mergeMap
      const fakeGet = timer(1000).pipe(mapTo({id: 1}));
      fakeGet.pipe(mergeMap(result => timer(1000).pipe(mapTo({foo: result.id + 1}))))
          .subscribe(res => console.log("mergeMap", res));

      //pairwise
      fromEvent(document, 'mousemove')
          .pipe(map((e: MouseEvent) => e.x))
          .pipe(pairwise())
          .pipe(map(pair => 255 - 2 * Math.abs(pair[0] - pair[1])))
          .subscribe(value => document.body.style.backgroundColor = `rgb(${value}, ${value}, ${value})`);
  }


  input(event){
    this.searchInput.next(event.target.value);
  }
}
