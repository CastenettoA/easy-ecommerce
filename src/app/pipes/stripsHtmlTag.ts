import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'stripsHtmlTag'
})
export class StripsHtmlTagPipe implements PipeTransform{ 
    transform(value: string) {
        return value.replace(/<[^>]*>/g, '');
    }
}