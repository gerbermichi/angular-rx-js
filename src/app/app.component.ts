import { Component, ChangeDetectionStrategy } from '@angular/core';
import {Subject} 'rxjs'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent  {
  private searchInput = new Subject<string>();
  input(event:Event){
    console.log(event) 
  }
}
