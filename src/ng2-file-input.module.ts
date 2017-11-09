import { FileInputHandlerService } from './file-input-handler.service';
import { Ng2FileInputService } from './ng2-file-input.service';
import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDropModule } from 'bergben-angular2-file-drop';
import { Ng2FileInputComponent } from './ng2-file-input.component';
import { Ng2FileInputOptionsInterface } from './ng2-file-input-options.interface';
import { Ng2FileInputOptions } from './ng2-file-input-options.class';

export const USER_OPTIONS: InjectionToken<string> = new InjectionToken('ng2 file input custom user options');

export function optionsFactory(userOptions: Ng2FileInputOptions): Ng2FileInputOptions {
  const options: Ng2FileInputOptions = new Ng2FileInputOptions();
  Object.assign(options, userOptions);
  return options;
}

@NgModule({
  imports: [
    CommonModule,
    FileDropModule
  ],
  providers: [Ng2FileInputService, FileInputHandlerService],
  declarations: [Ng2FileInputComponent],
  exports: [Ng2FileInputComponent]
})
export class Ng2FileInputModule {
  static forRoot(options: Ng2FileInputOptionsInterface = {}): ModuleWithProviders {
    return {
      ngModule: Ng2FileInputModule,
      providers: [{
        provide: USER_OPTIONS,
        useValue: options
      }, {
        provide: Ng2FileInputOptions,
        useFactory: optionsFactory,
        deps: [USER_OPTIONS]
      }]
    };

  }
}