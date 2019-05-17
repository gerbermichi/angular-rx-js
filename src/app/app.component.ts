import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent  {
  name = "Angular";
  color: string;
  
  getColor(): string {
    console.log('getColor', this.color)
    return this.color;
  }

  getName(): string {
    console.log('getName', this.name)
    return this.name;
  }
}
