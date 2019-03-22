import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import 'rxjs/add/operator/map'
import 'rxjs/Rx'

@Injectable()
export class TodoService {
    path = environment.path + '/'
    constructor(private http: HttpClient) { }

    getTodos() {
        const response = this.http.get(this.path).map(res => res)
        return response
    }
}