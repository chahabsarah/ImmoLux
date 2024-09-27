import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false // Set to false to re-evaluate the pipe whenever change detection runs

})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText || searchText.trim().length === 0) {
      return items;
    }
    searchText = searchText.toLowerCase();

    return items.filter(it => {

      const itemStr = JSON.stringify(it).toLowerCase();
      return itemStr.includes(searchText);
    });
  }
}
