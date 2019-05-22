import { Inject, Injectable } from '@angular/core';
import { CSS_CLASS_MAP, LABEL_COLORS, LINE_STYLE } from '../logger.interfaces';
import { LoggerLevel } from '../logger.config';

@Injectable()
export class CssFactory {
    private lineStyle: string;

    constructor(
        @Inject(LINE_STYLE) public readonly globalLineStyle: string,
        @Inject(LABEL_COLORS) public readonly labelColors: any,
        @Inject(CSS_CLASS_MAP) public readonly cssClassMap: any
    ) {}

    public set style(css: string) {
        this.lineStyle = `${this.globalStyles}${css}`;
    }

    public get style(): string {
        const style: string = this.lineStyle || '';
        this.lineStyle = '';
        return style;
    }

    public getStyleLabel(level: LoggerLevel): string {
        const color: string = this.labelColors[level];
        return `color: ${color}; font-weight: bold`;
    }

    public setClass(cssClassName: string): void {
        const classList: string[] = cssClassName.split(/\s+/g);
        const styles: string[] = [];

        classList.forEach((className: string) => {
            const style: string = this.cssClassMap[className];
            if (style) {
                styles.push(style);
            }
        });

        const localStyles: string = styles.length ? styles.join('; ') : '';
        this.lineStyle = `${this.globalStyles}${localStyles}`;
    }

    private get globalStyles(): string {
        return this.globalLineStyle ? `${this.globalLineStyle};` : '';
    }
}
