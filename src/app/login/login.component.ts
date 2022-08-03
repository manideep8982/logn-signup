import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginform ! :FormGroup
  constructor(private formbuilder:FormBuilder, private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.loginform=this.formbuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
    })
  }
login(){
  this.http.get<any>(" http://localhost:3000/signUpusers")
  .subscribe(res=>{
    const user = res.find((a:any)=>{
    return a.email === this.loginform.value.email && a.password === this.loginform.value.password
    });
    if(user){
      alert("login successful");
      this.loginform.reset();
      this.router.navigate(['dashboard'])
    }else{
      alert("user not found!!")
    }
  
  },err=>{
    alert("something went wrong!")
  })
}
}