import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 
  public signupForm!: FormGroup
  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      fullname: ['',Validators.required],
      mobilenumber: ['',Validators.required],
      dateofbirth: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      gender:['',Validators.required],
    })
  }
  signUp() {
    this.http.post<any>(" http://localhost:3000/signupusers",this.signupForm.value)
      .subscribe(res=>{
        alert("signup successfull");
        this.signupForm.reset();
        this.router.navigate(['login']);
      }),(err: any)=>{
        alert("something went wrong")
      }

      
       
  }
}