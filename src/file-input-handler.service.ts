import { FileInput } from './file-input.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class FileInputHandlerService {

    private fileInputs: FileInput[]=[];

    constructor() { }

    public add(id:string):boolean{
        this.fileInputs.push({
            id: id,
            currentFiles: []
        });
        return true;
    }
    public remove(id: string):boolean{
        for(let i=0; this.fileInputs.length; i++){
            if(this.fileInputs[i].id===id){
                this.fileInputs.splice(i,1);
                i=this.fileInputs.length;
                return true;
            }
        }
        return false;
    }
    public reset(id:string):boolean{
        let fileInput=this.getFileInput(id);
        fileInput.currentFiles=[];
        return true;
    }
    public addFiles(fileInputId: string, files:File[]):File[]{
        let fileInput=this.getFileInput(fileInputId);
        let notAdded:File[]=[];
        files.forEach(file =>{
            if(!this.addFile(file, fileInput.currentFiles)){
                notAdded.push(file);
            }
        });
        return notAdded;
    }
    public removeFiles(fileInputId: string, files:File[]):File[]{
        let fileInput:FileInput=this.getFileInput(fileInputId);
        let notRemoved:File[]=[];
        files.forEach(file =>{
            if(!this.removeFile(file, fileInput.currentFiles)){
                notRemoved.push(file);
            }
        });
        return notRemoved;
    }
    public getFileInput(id:string):FileInput{
        for(let i=0; this.fileInputs.length; i++){
            if(this.fileInputs[i].id===id){
                return this.fileInputs[i];
            }
        }
    }
    private addFile(file:File, toFiles:File[]):boolean{
        toFiles.push(file);
        return true;
    }
    private removeFile(file:File, fromFiles:File[]):boolean{
        for(let i=0; fromFiles.length; i++){
            if(this.isSameFile(file, fromFiles[i])){
                fromFiles.splice(i,1);
                i=fromFiles.length;
                return true;
            }
        }
        return false;
    }
    private isSameFile(file1: File, file2: File):boolean{
        return file1.name===file2.name && file1.size===file2.size && file1.type===file2.type;
    }
}