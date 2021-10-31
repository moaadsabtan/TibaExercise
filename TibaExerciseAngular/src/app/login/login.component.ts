import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../_services';
import { MyErrorStateMatcher } from '../_helpers/error-state-matcher';

// s @Component({ templateUrl: 'login.component.html' })

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup = new FormGroup({
      username : new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
    });
    loading = false;
    submitted = false;
    returnUrl: string | undefined;
    matcher = new MyErrorStateMatcher();

    constructor(
        private route: ActivatedRoute,
        private router: Router, private snackBar: MatSnackBar,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.router.navigate([this.returnUrl]);
                  this.snackBar.open('Log In sucees', 'close', {
                    duration: 2000,
                    panelClass: 'sucees-dialog'
                  });
                },
                error => {
                    this.snackBar.open('Log In Faild', 'close', {
                      duration: 2000,
                      panelClass: 'error-dialog'
                    });
                    this.loading = false;
                });
    }
}
