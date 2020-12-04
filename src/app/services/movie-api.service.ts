import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import secrets from "../../environments/secrets";

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  private baseUrl : string = "https://api.themoviedb.org/3";
  private apiKey : string = secrets.movie_api_key_v3;
  constructor(private http : HttpClient) { }

  getPopulars(page : number) {
    return this.http.get(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`);
  }
}
