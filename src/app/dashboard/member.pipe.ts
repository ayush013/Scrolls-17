import { Pipe, PipeTransform } from "@angular/core"; 

@Pipe({ name: 'transformarray',  pure: false })
export class MemberPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value);
    }
}