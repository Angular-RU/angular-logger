import { Inject, Injectable } from '@angular/core';
import { CSS_CLASS_MAP, LINE_STYLE } from '../logger.interfaces';

@Injectable()
export class CssFactory {
    constructor(
        @Inject(LINE_STYLE) public readonly globalLineStyle: string,
        @Inject(CSS_CLASS_MAP) public readonly cssMap
    ) {}

    private lineStyle: string;
    public cssClassMap: object = this.cssMap;

    public set style(css: string) {
        this.lineStyle = `${this.globalLineStyle}; ${css}`;
    }

    public get style(): string {
        const style: string = this.lineStyle || '';
        this.lineStyle = '';
        return style;
    }

    public getStyleLabelByColor(color: string): string {
        return `color: ${color}; font-weight: bold`;
    }

    public setClass(cssClassName: string): void {
        const classList: string[] = cssClassName.split(/\s+/g);
        const styles: string[] = [];
        for (let i: number = 0; i < classList.length; i++) {
            styles.push(this.cssClassMap[classList[i]]);
        }
        this.lineStyle = `${this.globalLineStyle}; ${styles.join(' ;')}`;
    }
}
