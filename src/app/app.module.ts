import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { optionalModules } from 'src/environments/optional-modules';
import { AppEffects } from './+state/effects/app.effects';
import { metaReducers, reducers } from './+state/reducers';
import { AppComponent } from './app.component';
import { MusicRecordVisualizerComponent } from './components/music-record-visualizer/music-record-visualizer.component';

@NgModule({
  declarations: [AppComponent, MusicRecordVisualizerComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot([AppEffects]),
    ...optionalModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
