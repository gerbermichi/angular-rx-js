import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit{
  private searchInput = new Subject<string>();

  ngOnInit(): void {
    this.searchInput.subscribe(a => console.log(a))
  }

  input(event:Event){
    this.searchInput.next(event.target.value);
  }
}
