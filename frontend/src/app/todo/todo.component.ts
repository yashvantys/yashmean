import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { TodoService } from '../services/todo.service'
import { Observable } from 'rxjs/Observable'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ajaxDelete } from 'rxjs/observable/dom/AjaxObservable'
import { Http } from '@angular/http'
import * as decode from 'jwt-decode'
declare var bootbox: any;
class TodosData {
  _id: string
  title: string
  description: string
}
class DataTablesResponse {
  data: any[]
  draw: number
  recordsFiltered: number
  recordsTotal: number
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  dtOptions: DataTables.Settings = {}
  path = environment.path
  error: boolean = false
  todosdata: TodosData[]
  dataTable: any
  todoForm: FormGroup
  userId: string = null
  title: string = null
  description: string = null


  constructor(private http: HttpClient, private todosservice: TodoService, private todoFormBuilder: FormBuilder) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token)
  }

  ajaxList(loggedInUserId, loggedInUserRole) {
    this.dtOptions = {
      responsive: true,
      pageLength: 10,
      lengthChange: false,
      serverSide: true,
      processing: true,
      searching: true,
      "language": {
        "emptyTable": "No data available in Todos",
        "processing": '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>'
      },
      order: [[2, 'asc']],
      ajax: (dataTablesParameters: any, callback) => {
        this.http
          .post<DataTablesResponse>(this.path + '/todo', dataTablesParameters)
          .map((resp: any) => resp)
          .subscribe((resp: any) => {
            this.todosdata = resp.todos
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsTotal,
              data: this.todosdata,
            })
          })
      },
      columns: [
        { data: "title" },
        { data: "description" },
        {
          data: null, render: function (data, type, row) {
            var html = ''

            html = `<button type="button" class="btn btn-primary editbutton" >Edit</button>
                                    <button type="button" class="btn btn-danger deletebutton" >Delete</button>`

            return html
          },
          "orderable": false
        }
      ],
    }



  }

}
