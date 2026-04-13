import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Users } from './app/users/users';

bootstrapApplication(Users, appConfig)
  .catch((err) => console.error(err));
