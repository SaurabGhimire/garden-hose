import { Component, OnInit } from '@angular/core';
import { interval, map, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gardenhose';

  ngOnInit() {
    const obs = interval(500)
      .pipe(
        take(5),
        map(i => 2 * i)
      );
    obs.subscribe(value => console.log(value));
  }
}
