import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {forkJoin, Subject, timer} from 'rxjs';
import {debounceTime, mapTo, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'my-app',
    template: `
        <h1>Hello</h1>
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


      const fakeGet = timer(1000).pipe(mapTo({id: 1}));

      fakeGet.pipe(mergeMap(result => timer(1000).pipe(mapTo({id: result.id + 1}))))
          .subscribe(res => console.log(res))
  }

  input(event:Event){
    this.searchInput.next(event.target.value);
  }
}
