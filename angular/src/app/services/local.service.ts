import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, switchMap, throwError } from 'rxjs';
import { LocalWithImagesRequest } from '../models/LocalWithImagesRequest';
import { Local } from '../models/Local';
import { User } from '../models/User';
import { AccountValidationRequest } from '../models/AccountValidationRequest';

interface LocalUpdate {
  location?: string;
  localType?: string;
  rent?: number;
  sell?: number;
  bookingPrice?: number;
  localDescription?: string;
  amenities?: string;
  details?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private apiUrl = 'http://localhost:9095';

  constructor(private http: HttpClient) { }

  addLocal(localRequest: LocalWithImagesRequest, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const formData: FormData = new FormData();
    formData.append('local.localType', localRequest.local.localType);
    if (localRequest.local.rent) {
      formData.append('local.rent', localRequest.local.rent.toString());
    } else if (localRequest.local.sell) {
      formData.append('local.sell', localRequest.local.sell.toString());
    }
    formData.append('local.bookingPrice', localRequest.local.bookingPrice.toString());
    formData.append('local.localDescription', localRequest.local.localDescription);
    formData.append('local.amenities', localRequest.local.amenities);
    formData.append('local.details', localRequest.local.details);
    formData.append('local.visitDate', localRequest.local.visitDate);
    formData.append('local.location', localRequest.local.location);

    for (let i = 0; i < localRequest.images.length; i++) {
      formData.append('images', localRequest.images[i], localRequest.images[i].name);
    }

    return this.http.post(`${this.apiUrl}/user/add-local`, formData, { headers });
  }

  getAllLocals(token: string): Observable<Local[]>  {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Local[]>(`${this.apiUrl}/local/getAll`,{headers}).pipe(
      switchMap(locals => {
        const observables: Observable<string[]>[] = locals.map(local => {
          return this.getImagesByLocalId(local.localID, token);
        });
        return forkJoin(observables).pipe(
          map(imageUrlsArray => {
            locals.forEach((local, index) => {
              local.imageUrls = imageUrlsArray[index];
            });
            return locals;
          })
        );
      })
    );
  }

  getImagesByLocalId(localId: number, token: string): Observable<string[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<string[]>(`${this.apiUrl}/local/${localId}/images`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching images:', error);
        return throwError(error);
      })
    );
  }
  addLike(localId: number, userId: number, token: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/user/addLike`, null, {
      params: {
        localId: localId.toString(),
        userId: userId.toString()
      },
      responseType: 'text',
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }).pipe(
      map(response => response as string)
    );
  }

  removeLike(localId: number, userId: number, token: string): Observable<string> {
    return this.http.delete(`${this.apiUrl}/user/removeLike`, {
      params: {
        localId: localId.toString(),
        userId: userId.toString()
      },
      responseType: 'text',
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }).pipe(
      map(response => response as string)
    );
  }
  getLikedLocals(userId: number, token: string) {
    return this.http.get<number[]>(`${this.apiUrl}/user/users/${userId}/likes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getLocalsByUserId(userId: number, token: string): Observable<Local[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Local[]>(`${this.apiUrl}/local/myLocal/${userId}`, { headers })
      .pipe(
        switchMap(locals => {
          const observables: Observable<string[]>[] = locals.map(local => {
            return this.getImagesByLocalId(local.localID, token);
          });
          return forkJoin(observables).pipe(
            map(imageUrlsArray => {
              locals.forEach((local, index) => {
                local.imageUrls = imageUrlsArray[index];
              });
              return locals;
            })
          );
        })
      );
    }

    updateLocal(localId: number, updateData: LocalUpdate): Observable<any> {
      return this.http.put(`${this.apiUrl}/user/update/${localId}`, updateData);
    }

  getLocalById(id: number, token: string): Observable<Local> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Local>(`${this.apiUrl}/local/getById/${id}`, { headers }).pipe(
      switchMap(local => {
        return this.getImagesByLocalId(local.localID, token).pipe(
          map(imageUrls => {
            local.imageUrls = imageUrls;
            return local;
          })
        );
      })
    );
  }
    deleteLocal(localId: number, token: string): Observable<void> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.delete<void>(`${this.apiUrl}/local/delete/${localId}`, { headers });
    }
getUserInfo(userId: number, token: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/user/getUserById/${userId}`, {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  });
}
getAllUsers(token: string): Observable<User[]> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get<User[]>(`${this.apiUrl}/user/all`, { headers });
}
deleteUser(id: number, token: string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.delete(`${this.apiUrl}/user/${id}`, { headers });
}

changeUserStatus(request: AccountValidationRequest, token: string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.post(`${this.apiUrl}/user/validate`, request, { headers });
}

}
