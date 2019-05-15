import { Injectable } from '@angular/core';

@Injectable()
export class ClipboardFactory {
    public copyData(data: any): boolean {
        if ((window as any).clipboardData && (window as any).clipboardData.setData) {
            return (window as any).clipboardData.setData('Text', data);
        } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
            const textarea: HTMLTextAreaElement = document.createElement('textarea');
            textarea.textContent = data;
            textarea.style.position = 'fixed';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                return document.execCommand('copy');
            } catch (ex) {
                console.warn('Copy to clipboard failed.', ex);
                return false;
            } finally {
                document.body.removeChild(textarea);
            }
        }
    }
}
