import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';
import { GitRepository, User } from '../_models';
import { Observable } from 'rxjs/internal/Observable';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { HomeService } from './home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchFormControl = new FormControl();
  filteredOptions: Observable<GitRepository[]> | undefined;
  loading = false;
  currentUser: User=new User();

  constructor(
              private router: Router, private authenticationService: AuthenticationService,
              private homeService:HomeService) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
    });

  }

  ngOnInit() {
      this.loading = true;
      this.searchFormControl.valueChanges.subscribe(x => {
        if(x&&x.id){
        this.filter(x.name);
        }else{
          this.filter(x);
        }
     })
      this.filter(this.searchFormControl.value);
  }


    logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
  displayFn(repository: GitRepository): string {
    return repository && repository.name ? repository.name : '';
  }
  filter(name: string) {
   this.filteredOptions = this.homeService.searchRepositories(name);
  }
}
