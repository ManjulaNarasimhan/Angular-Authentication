import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(public fb: FormBuilder, private _authService: AuthService, private _router:Router) { 
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      mobile:[''],
      password:['']
    })
  }

  ngOnInit(): void {
  }

  registerUser(){
    this._authService.signUp(this.signupForm.value).subscribe((res)=>{
      console.log(res);
      if(res){
        this.signupForm.reset();
        this._router.navigate(['log-in']);
      }
    });
  }
}
