import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorFn } from './app/shared/services/auth.interceptor';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [...(appConfig.providers || []),
   provideHttpClient(
    withInterceptors([authInterceptorFn])
   )]
}).catch((err) => console.error(err));