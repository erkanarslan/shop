import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'search'
})
export class SearchPipe implements PipeTransform {

	transform(list: any[], property : string, searchText : string): any[] {
		return list.filter(item => {
			return item[property].toLowerCase().includes(searchText.toLowerCase());
		});
	}

}
