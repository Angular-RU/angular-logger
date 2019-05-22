import { Injectable } from '@angular/core';

interface Clipboard {
    copyOnBuffer(data: any): boolean;
}

@Injectable()
export class ClipboardFactory implements Clipboard {
    public copyOnBuffer(data: any): boolean {
        const text: string = typeof data !== 'string' ? JSON.stringify(data, null, 4) : data;

        if ((window as any).clipboardData && (window as any).clipboardData.setData) {
            return (window as any).clipboardData.setData('Text', text);
        } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
            const textarea: HTMLTextAreaElement = document.createElement('textarea');
            textarea.textContent = text;
            textarea.style.position = 'fixed';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                return document.execCommand('copy');
            } catch (ex) {
                return false;
            } finally {
                document.body.removeChild(textarea);
            }
        }
    }
}
