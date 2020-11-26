import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentUser = {
    name:'',
    email:''
  };
  constructor( private _authService: AuthService,
               private _route: ActivatedRoute) { 
                 let id = this._route.snapshot.paramMap.get('id');
                 this._authService.getUserProfileById(id).subscribe((res)=>{
                   console.log(res);
                 this.currentUser = res; 
                 })
               }

  ngOnInit(): void {
  }

}
