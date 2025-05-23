import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorFn } from './app/shared/services/auth.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [...(appConfig.providers || []),

  provideAnimations(),
  provideToastr({
    // timeOut: 3000,
    // positionClass: 'toast-bottom-right',
    // preventDuplicates: true,
    timeOut: 3000,
    positionClass: 'toast-top-center', // Most reliable for visibility
    preventDuplicates: true,
  }),

  provideHttpClient(
    withInterceptors([authInterceptorFn])
  )]
}).catch((err) => console.error(err));