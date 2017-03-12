import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Group } from '../models/group';


@Injectable()
export class GoogleGroupsService {
  private API_PATH = 'https://www.googleapis.com/groups/v1/volumes';

  constructor(private http: Http) {}

  searchGroups(queryTitle: string): Observable<Group[]> {
    return this.http.get(`${this.API_PATH}?q=${queryTitle}`)
      .map(res => res.json().items || []);
  }

  retrieveGroup(volumeId: string): Observable<Group> {
    return this.http.get(`${this.API_PATH}/${volumeId}`)
      .map(res => res.json());
  }
}
