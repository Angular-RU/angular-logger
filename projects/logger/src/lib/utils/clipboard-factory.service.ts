import { Injectable } from '@angular/core';

@Injectable()
export class ClipboardFactory {
    public copyData(data: any): boolean {
        if ((window as any).clipboardData && (window as any).clipboardData.setData) {
            // IE specific code path to prevent textarea being shown while dialog is visible.
            return (window as any).clipboardData.setData('Text', data);
        } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
            const textarea: HTMLTextAreaElement = document.createElement('textarea');
            textarea.textContent = data;
            textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
                return document.execCommand('copy'); // Security exception may be thrown by some browsers.
            } catch (ex) {
                console.warn('Copy to clipboard failed.', ex);
                return false;
            } finally {
                document.body.removeChild(textarea);
            }
        }
    }
}
