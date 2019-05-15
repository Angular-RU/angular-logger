import { Injectable } from '@angular/core';

@Injectable()
export class JsonFactory {
    private _string: string = 'color:green';
    private _number: string = 'color:darkorange';
    private _boolean: string = 'color:blue';
    private _null: string = 'color:magenta';
    private _key: string = 'color:red';
    private filter: string =
        '/("(\\\\u[a-zA-Z0-9]{4}|\\\\[^u]|[^\\\\"])*"(\\s*:)?|\\b(true|false|null)\\b|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?)/g';

    public colorifyJSON(json: string) {
        const arr = [];
        json = json.replace(this.filter, (match) => {
            let style: string = this._number;
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    style = this._key;
                } else {
                    style = this._string;
                }
            } else if (/true|false/.test(match)) {
                style = this._boolean;
            } else if (/null/.test(match)) {
                style = this._null;
            }
            arr.push(style);
            arr.push('');
            return '%c' + match + '%c';
        });

        arr.unshift(json);

        return arr;
    }
}
