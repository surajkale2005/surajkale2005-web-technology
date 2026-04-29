import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  student = {
    name: '',
    roll: '',
    course: ''
  };

  studentList: any[] = [];

  addStudent() {
    if (this.student.name && this.student.roll && this.student.course) {
      this.studentList.push({ ...this.student });

      this.student = {
        name: '',
        roll: '',
        course: ''
      };
    }
  }

  deleteStudent(index: number) {
    this.studentList.splice(index, 1);
  }
}