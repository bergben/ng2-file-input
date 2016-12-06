import { Component, ElementRef, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Ng2FileInputOptions, Ng2FileInputOptionsInterface } from './ng2-file-input.interface';

@Component({
    selector: 'ng2-file-input',
    templateUrl: './ng2-file-input.component.html',
})
export class Ng2FileInputComponent implements OnInit{
    private alreadyEmitted: Boolean = false;
    private options:Ng2FileInputOptionsInterface;
    public fileIsOver: Boolean = false;
    public invalidFile: Boolean = false;
    @Input('drop-text') dropText: string;
    @Input('browse-text') browseText: string;
    @Input('remove-text') removeText: string;
    @Input('invalid-file-text') invalidFileText: string;
    @Input('invalid-file-timeout') invalidFileTimeout: number;
    @Input('multiple') multiple: Boolean;
    @Input('removable') removable: Boolean;
    @Input('show-previews') showPreviews: Boolean;
    @Input('extensions') extensions: string[];
    @Output('file-added') output = new EventEmitter();
    public currentFiles: File[] = [];
    constructor(private sanitizer:DomSanitizer, private defaultOptions:Ng2FileInputOptions){
    }
    ngOnInit(){
        this.dropText=this.dropText || this.defaultOptions.dropText;
        this.browseText=this.browseText || this.defaultOptions.browseText;
        this.removeText=this.removeText || this.defaultOptions.removeText;
        this.invalidFileText=this.invalidFileText || this.defaultOptions.invalidFileText;
        this.invalidFileTimeout=this.invalidFileTimeout || this.defaultOptions.invalidFileTimeout;
        this.multiple=this.multiple || this.defaultOptions.multiple;
        this.removable=this.removable || this.defaultOptions.removable;
        this.showPreviews=this.showPreviews || this.defaultOptions.showPreviews;
        this.extensions=this.extensions || this.defaultOptions.extensions;
    }
    public fileOver(fileIsOver: boolean): void {
        this.fileIsOver = fileIsOver;
    }
    public onFileDrop(file: File): void {
        if (!this.multiple) {
            //make sure only to emit once
            if (!this.alreadyEmitted) {
                this.alreadyEmitted = true;
                this.handleFile(file);
                setTimeout(() => { this.alreadyEmitted = false; }, 0);
            }
        }
        else {
            this.handleFile(file);
        }
    }
    public fileSelected(event): void {
        this.invalidFile = false;
        let files = event.target.files;
        if (files && files.length) {
            if (!this.multiple) {
                //make sure only to emit one
                this.handleFile(files[0]);
            }
            else {
                for (let i = 0; i < files.length; i++) {
                    this.handleFile(files[i]);
                }
            }
        }
        setTimeout(() => { event.target.value = "" }, 0);
    }
    public removeFile(file: File) {
        if(this.removable){
            for (let i = 0; i < this.currentFiles.length; i++) {
                if (this.currentFiles[i] === file) {
                    this.currentFiles.splice(i, 1);
                    this.output.emit({
                        currentFiles:  this.currentFiles,
                        action: "removed",
                        file: file
                    });
                }
            }
        }
    }
    public getObjectUrl(file: File): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));
    }
    private handleFile(file: File): void {
        if (this.isValidFile(file)) {
            this.currentFiles.push(file);
            this.output.emit({
                currentFiles:  this.currentFiles,
                action: "added",
                file: file
            });
        }
    }
    private isValidFile(file: File): Boolean {
        if (this.extensions.length > 0) {
            let ext: string = file.name.split('.').pop();
            if ((this.extensions.indexOf('image/jpg') !== -1) && (this.extensions.indexOf('image/jpeg') === -1)) {
                this.extensions.push('image/jpeg');
            };
            if (this.extensions.indexOf(file.type) === -1 && this.extensions.indexOf(ext) === -1) {
                this.invalidFile = true;
                if(this.invalidFileTimeout!==0){
                    setTimeout(() => {
                        this.invalidFile = false;
                    }, this.invalidFileTimeout);
                }

                return false;
            }
        }
        return true;
    }
}