export interface Ng2FileInputOptionsInterface{
    dropText?:string;
    browseText?:string;
    removeText?:string;
    invalidFileText?:string;
    invalidFileTimeout?:number;
    removable?:boolean;
    multiple?:boolean;
    showPreviews?:boolean;
    extensions?:string[];
}
export class Ng2FileInputOptions implements Ng2FileInputOptionsInterface {
    dropText:string="Drop file here";
    browseText:string="Browse";
    removeText:string="Remove";
    invalidFileText:string="You have picked an invalid or disallowed file."
    invalidFileTimeout:number=8000;
    removable:boolean=true;
    multiple:boolean=false;
    showPreviews:boolean=true;
    extensions:string[]=[];
}