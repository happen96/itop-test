import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AppService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  postForm(formData: any): Promise<any> {
    const url = 'https//google.com';

    return this.http
      .post(url, JSON.stringify(formData), { headers: this.headers })
      .toPromise()
      .then((res: any) => res)
      .catch((error: any) => error = {
        text: 'Incorrect password',
      });
  }

}
