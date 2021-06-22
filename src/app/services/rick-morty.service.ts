import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {

  private baseUrl: string = environment.baseUrl;

  private httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  getCharacters(page: number = 1, name: string = '', gender: string = ''){
    return this.http.get(`${this.baseUrl}/character?page=${page}&name=${name}&gender=${gender}`, this.httpOptions);
  }

  getOneCharacter(id:number){
    return this.http.get(`${this.baseUrl}/character/${id}`, this.httpOptions);
  }
}
