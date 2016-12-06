import { NgModule, ModuleWithProviders, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2FileInputComponent } from './ng2-file-input.component';
import { Ng2FileInputOptionsInterface, Ng2FileInputOptions } from './ng2-file-input.interface';

export const USER_OPTIONS: OpaqueToken = new OpaqueToken('ng2 file input custom user options');

export function optionsFactory(userOptions: Ng2FileInputOptions): Ng2FileInputOptions {
  const options: Ng2FileInputOptions = new Ng2FileInputOptions();
  Object.assign(options, userOptions);
  return options;
}

@NgModule({
  imports: [
    CommonModule
  ],
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