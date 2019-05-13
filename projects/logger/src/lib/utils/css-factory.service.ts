import { Injectable } from '@angular/core';

@Injectable()
export class CssFactory {
    private lineStyle: string;
    public set style(value: string) {
      this.lineStyle = value;
    }

    public get style(): string {
      const style = this.lineStyle || '';
      this.lineStyle = '';
      return style;
    }
}
