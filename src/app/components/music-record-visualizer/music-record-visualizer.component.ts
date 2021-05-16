import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as appActions from '../../+state/actions/app.actions';
import * as fromApp from '../../+state/selectors/app.selectors';
import { MusicRecordVisualizerViewModel } from './music-record-visualizer.model';
@Component({
  selector: 'app-music-record-visualizer',
  templateUrl: './music-record-visualizer.component.html',
  styleUrls: ['./music-record-visualizer.component.scss'],
})
export class MusicRecordVisualizerComponent implements OnInit {
  constructor(private store: Store) {}
  public data$: Observable<MusicRecordVisualizerViewModel[]> | undefined;
  public isLoading$: Observable<boolean> | undefined;

  ngOnInit(): void {
    this.store.dispatch(appActions.getFestivals());
    this.isLoading$ = this.store.select(fromApp.selectIsLoadingFestival);
    this.data$ = this.store
      .select(fromApp.selectRecordsInTreeForm)
      .pipe(filter((x) => !!x && !!x.length));
  }
}
