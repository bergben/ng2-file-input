import { FileInput } from './ng2-file-input.interface';
import { FileInputHandlerService } from './file-input-handler.service';
import { forwardRef, Inject, Injectable } from '@angular/core';


@Injectable()
export class Ng2FileInputService {
    constructor(@Inject(forwardRef(() => FileInputHandlerService)) private fileInputHandlerService: FileInputHandlerService) {
    }
    public reset(id: string):boolean{
        return this.fileInputHandlerService.reset(id);
    }
    public remove(id: string, files: File[]):File[]{
        return this.fileInputHandlerService.removeFiles(id, files);
    }
    public add(id: string, files:File[]):File[]{
        return this.fileInputHandlerService.addFiles(id, files);
    }
    public getCurrentFiles(id:string):File[]{
        let fileInput: FileInput=this.fileInputHandlerService.getFileInput(id);
        return fileInput ? fileInput.currentFiles : [];
    }
}