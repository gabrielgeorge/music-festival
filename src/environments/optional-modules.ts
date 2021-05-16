import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const optionalModules = [
  StoreDevtoolsModule.instrument({
    maxAge: 25, // Retains last 25 states
  }),
];
