import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUrlService } from '../../shared/services/app-url.service';
import { GlobalService } from '../../shared/services/global-services.service';
import { GLOBAL } from '../../shared/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private appURL: AppUrlService,
    private http: HttpClient,
    private globalService: GlobalService,
    private fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      Username: [null, Validators.required],
      Password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ])
      ]
    });
  }

  ngOnInit() {
    // this.login();
  }

  onFormSubmit(data) {
    const loginData = {
      UserName: data.Username,
      Password: data.Password
    };
    this.globalService
      .post(this.appURL.getApiUrl() + GLOBAL.API_Login_Auth_Url, loginData)
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe(data => {
        localStorage.setItem('authenticationtoken', data.data.Token);
        this.router.navigate(['']);
      });
  }
}
