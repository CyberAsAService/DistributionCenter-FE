import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private httpClient: HttpClient) { }

  getStatus(taskId: number) {
    return this.httpClient.get(`${environment.backendAddress}/task` + taskId);
  }
}
