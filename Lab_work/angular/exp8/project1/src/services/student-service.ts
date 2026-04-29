import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students = [
    { name: 'Suraj', roll: '101', course: 'AIML' },
    { name: 'Rahul', roll: '102', course: 'CSE' }
  ];

  getStudents() {
    return this.students;
  }
}