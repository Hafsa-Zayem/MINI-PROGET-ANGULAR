import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Global handlers for runtime errors to help debugging
window.onerror = (message, source, lineno, colno, error) => {
  console.error('[GLOBAL ERROR]', message, source + ':' + lineno + ':' + colno, error);
};
window.addEventListener('unhandledrejection', (ev) => console.error('[UNHANDLED REJECTION]', ev.reason));

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
