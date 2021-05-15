import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as appActions from '../../+state/actions/app.actions';
import * as fromApp from '../../+state/selectors/app.selectors';
@Component({
  selector: 'app-music-record-visualizer',
  templateUrl: './music-record-visualizer.component.html',
  styleUrls: ['./music-record-visualizer.component.scss'],
})
export class MusicRecordVisualizerComponent implements OnInit {
  data$: Observable<any>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(appActions.getFestivals());
    this.data$ = this.store.select(fromApp.selectRecordsInTreeForm);
  }
}
