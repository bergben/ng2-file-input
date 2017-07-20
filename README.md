[![Join the chat at https://gitter.im/bergben/bergben](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/bergben/bergben?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# ng2-file-input
Angular 2 and beyond component that implements a drag and drop or select file selection, including preview. 

## Demo
A simple demo is available as a plnkr: http://plnkr.co/edit/eU7VM4j74ljN36bnZbPP?p=preview

## Breaking changes in 1.0
The logged action of the output events is now an Enum instead of a string.
The output event `onChange` does not exist anymore.

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

#### General: OnAction
```html
    <ng2-file-input (onAction)="onAction($event)"></ng2-file-input> 
```
The on-action event will fire whenever an action to the file input happens, returning the following object:
```
    id: //the file input's id that emits the action (useful if you use the service and handle multiple file inputs, see below)
    currentFiles: //list of the current files
    action: //see Enum below
    file: //the file that caused the action
```

The emitted Action is an Enum: 
```
    export enum Ng2FileInputAction{
        Removed=0,
        Added= 1,
        InvalidDenied = 2,
        CouldNotRemove = 3,
        CouldNotAdd = 4,
    }
```

You can use this Enum to check which action was emitted in your component like so (import it first of course):

```
    if(event.action===Ng2FileInputAction.Removed){
        //...
    }
```

#### Specific: OnRemoved, OnAdded, OnInvalidDenied, OnCouldNotRemove, OnCouldNotAdd

```html
    <ng2-file-input (OnRemoved)="OnRemoved($event)" (OnInvalidDenied)="OnInvalidDenied($event)"></ng2-file-input> 
```

Those actions fire when each correlating action happens, emitting the following object: 
```
    id: //the file input's id that emits the action (useful if you use the service and handle multiple file inputs, see below)
    currentFiles: //list of the current files
    file: //the file that caused the action
```

## Reset the file input or programatically add / remove files

Using the `Ng2FileInputService` you can easily reset the file input (removes all added files) or manually add and remove files. All you need to do so is to give the file input a *UNIQUE* identifier:

```html
    <ng2-file-input [id]="myFileInputIdentifier"></ng2-file-input> 
```

```
    private myFileInputIdentifier:string = "tHiS_Id_IS_sPeeCiAL";
    constructor(private ng2FileInputService: Ng2FileInputService){

    }

    IResetBecauseICan():void{
        this.ng2FileInputService.reset(this.myFileInputIdentifier);
    }
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


## To-do (Pull requests welcome)
 - Render preview for images better 
 - Preserve EXIF orientation for the images preview
 - Add animations
