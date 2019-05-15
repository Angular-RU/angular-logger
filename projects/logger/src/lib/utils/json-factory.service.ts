import { Injectable } from '@angular/core';

@Injectable()
export class JsonFactory {
    public colorifyJSON(json) {
        const arr = [];
        const _string: string = 'color:green';
        const _number: string = 'color:darkorange';
        const _boolean: string = 'color:blue';
        const _null: string = 'color:magenta';
        const _key: string = 'color:red';

        json = json.replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            (match) => {
                let style: string = _number;
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        style = _key;
                    } else {
                        style = _string;
                    }
                } else if (/true|false/.test(match)) {
                    style = _boolean;
                } else if (/null/.test(match)) {
                    style = _null;
                }
                arr.push(style);
                arr.push('');
                return '%c' + match + '%c';
            }
        );

        arr.unshift(json);

        return arr;
    }
}
