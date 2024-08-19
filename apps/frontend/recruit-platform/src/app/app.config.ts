import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { BASE_PATH } from '@minta-ltd-recruit-platform/api-client';
import { InMemoryDatabaseService as InMemoryCandidateDbService } from '@minta-ltd-recruit-platform/home/data-access';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(
      InMemoryWebApiModule.forRoot(InMemoryCandidateDbService, {
        delay: 600,
        passThruUnknownUrl: true
      })
    ),
    { provide: BASE_PATH, useValue: 'http://localhost:3000' }
  ]
};
