import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterList'
})
export class FilterListPipe implements PipeTransform {
  transform(value: any, text: string): any {
    if (text === "") return []
    else
      return value.filter((x: { pvalue: string; }) => x.pvalue === text);


  }

}
