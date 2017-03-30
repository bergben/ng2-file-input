[![Join the chat at https://gitter.im/bergben/bergben](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/bergben/bergben?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# ng2-file-input
Angular 2 component that implements a drag and drop or select file selection, including preview. 

## Install
```bash
$ npm install ng2-file-input --save
```

### Import the module
```TypeScript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2FileInputModule } from 'ng2-file-input'; // <-- import the module
import { MyComponent } from './my.component';

@NgModule({
    imports: [BrowserModule,
              Ng2FileInputModule.forRoot() // <-- include it in your app module
             ],
    declarations: [MyComponent],  
    bootstrap: [MyComponent]
})
export class MyAppModule {}
```

### Import the styles
This library uses <a href="https://v4-alpha.getbootstrap.com/getting-started/download/#package-managers">Bootstrap 4</a>, so make sure to install that if you want the default styling to apply.

If you use Sass / Scss you can import the styles like so:
```
@import "{}/node_modules/ng2-file-input/ng2-file-input.scss";
```
else just include the css file like this:
``` 
<link href="node_modules/ng2-file-input/ng2-file-input.css" rel="stylesheet" />
```

## Usage

### Use it in your template
```html
<ng2-file-input></ng2-file-input> 
```

### Output events
```html
    <ng2-file-input (onChange)="onFileChange($event)"></ng2-file-input> 
```
The on-change event will fire whenever a file has been added or removed, returning the following object:
```
      currentFiles: //list of the current files
      action: //either "added" or "removed"
      file: //the file that has been added or removed
```


## Options
### Available Options
|Parameter   	| Type | Explanation | 
|---	       |---	  |---	|
| dropText   	    | string 	| set the text for the dropzone |
| browseText | string | set the text for the browse button |
| removeText | string 	| set the text that appears when hovering over a preview element to remove |
| invalidFileText | string 	| set the text for the error that appears if an invalid file or with a disallowed extension was added |
| invalidFileTimeout | number | how long the error should appear, set to 0 if it should stay |
| multiple      | Boolean | wether multiple files can be added or not |
| showPreviews      | Boolean | show a preview of the selected file / files |
| removable  | Boolean | should files be removable (through the preview) |
| extensions | string[] | the allowed extensions to be selected. Can either be ['image/jpeg', ...] or ['jpg',...]|.

### Default global
You can set the options globally like so (below are the default values for the parameters if they are not set): 
```TypeScript
    Ng2FileInputModule.forRoot(
      {
         dropText:"Drop file here";
         browseText:"Browse";
         removeText:"Remove";
         invalidFileText:"You have picked an invalid or disallowed file."
         invalidFileTimeout:8000;
         removable:true;
         multiple:false;
         showPreviews:true;
         extensions:['jpg'];
      }
    ),
```

### Per element
You can overwrite the default parameters per element: 
```html
<ng2-file-input [drop-text]="'my very custom dropzone text'"></ng2-file-input> 
```
Please note that instead of camelCase the lisp-case has to be used here.

### Styling
All the elements have sepcific css classes, please just look them up using the element inspector.


## To-do
 - Render preview for images better 
 - Preserve EXIF orientation for the images preview
 - Provide a demo
