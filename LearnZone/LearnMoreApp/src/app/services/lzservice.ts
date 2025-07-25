import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Iuser } from '../Interfaces/Iuser';
import { ICourse } from '../Interfaces/crs';




@Injectable({
  providedIn: 'root'
})
export class Lzservice {

  constructor(private http: HttpClient) { }


  Login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    console.log('Login called with params:', params.toString());
    return this.http.get<Iuser>('https://localhost:7158/api/LearnMoreServices/Login', { params }).pipe(catchError(this.handleError)
      );


  }



  Register(name: string, email: string, passwordHash: string): Observable<any> {
    const params = new HttpParams()
      .set('name', name)
      .set('email', email)
      .set('passwordHash', passwordHash);

    // Replace with your real API endpoint
    return this.http.post('https://localhost:7158/api/LearnMoreServices/register', null, { params })
      .pipe(catchError(this.handleError));
  }

  //viewAllCourse
  viewAllCourse(): Observable<any> {
    return this.http.get('https://localhost:7158/api/LearnMoreServices/viewAllCourse')
      .pipe(catchError(this.handleError));
  }

  //viewAllUser
  viewAllUser(): Observable<any> {
    return this.http.get('https://localhost:7158/api/LearnMoreServices/viewAllUser')
      .pipe(catchError(this.handleError));
  }

  //View AllInstructor
  viewAllInstructor(): Observable<any> {
    return this.http.get('https://localhost:7158/api/LearnMoreServices/viewAllInstructor')
      .pipe(catchError(this.handleError));

  }

  viewAllFeedback(): Observable<any[]> {
    return this.http.get<any>('https://localhost:7158/api/LearnMoreServices/viewAllFeedback').pipe(
      map((response) => response.$values || [])
    );
  }

  //Allfeedbacks
  //viewAllFeedback(): Observable<any> {
  //  return this.http.get('https://localhost:7158/api/LearnMoreServices/viewAllFeedback')
  //    .pipe(catchError(this.handleError));
  //}


  numberOfEnrollments(courseId: number): Observable<any> {
    const params = new HttpParams().set('courseId', courseId.toString());

    return this.http.get('https://localhost:7158/api/LearnMoreServices/numberOfEnrollments', { params })
      .pipe(catchError(this.handleError));
  }


  //AddCourse
  addCourse(courseName: string, courseDescription: string, instructorId: number): Observable<any> {
    const course = {
      title: courseName,
      description: courseDescription,
      instructorId: instructorId
    };

    return this.http.post('https://localhost:7158/api/LearnMoreServices/addCourse', course)
      .pipe(catchError(this.handleError));
  }

  //getAllCourse
  getAllCourse(): Observable<any> {
    return this.http.get<ICourse[]>('https://localhost:7158/api/LearnMoreServices/getAllCourse')
      .pipe(catchError(this.handleError));
  }



   handleError(error: any): Observable<never> {
    // Handle the error here, e.g., log it or show a message
    console.error('An error occurred:', error);
    throw error; // Rethrow the error for further handling


  }
}
