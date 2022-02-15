import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LuxandService {

  private url = environment.urlApi;

  private token = { token: environment.token };

  constructor(private http: HttpClient) { }

  postReconocimientoEdadGenero(formatData: any) {
    const url_completa = this.url + 'photo/detect';
    return this.http.post<any>(url_completa, formatData,{headers: this.token})
  }

}
