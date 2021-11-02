import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';
import { GitRepository, User } from '../_models';
import { Observable } from 'rxjs/internal/Observable';
import { FormControl } from '@angular/forms';
import { HomeService } from './home.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchFormControl = new FormControl();
  filteredOptions: Observable<GitRepository[]> | undefined;
  favoritesRepositories: GitRepository[] =[];
  loading = false;
  currentUser: User=new User();

  constructor(private snackBar: MatSnackBar,
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
      this.getFavoritesRepositories();
  }
  addRepository(){
    if(this.searchFormControl.value && this.searchFormControl.value.id){
   const gitRepository : GitRepository = new GitRepository()
   gitRepository.id=this.searchFormControl.value.id;
   gitRepository.name=this.searchFormControl.value.name;
   debugger;
   if(this.favoritesRepositories.find(l=>l.name==gitRepository.name)){
    this.snackBar.open('Repo Contain In Db',
    'Close', {
      duration: 2000,
      panelClass: 'error-dialog'
    });
   }else{

    this.homeService.addRepository(gitRepository).subscribe(
      data=>{
        this.getFavoritesRepositories();
        this.snackBar.open('Repository Added Sucees',
        'Close', {
          duration: 2000,
          panelClass: 'sucees-dialog'
        });
      },
      error=>{
        this.snackBar.open('Repository Added Faild',
        'Close', {
          duration: 2000,
          panelClass: 'error-dialog'
        });
      },
      ()=>{},
    );
    }
  }
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
  getFavoritesRepositories() {
    this.homeService.getFavoritesRepositories().subscribe(
      data=>{this.favoritesRepositories=data},
      error=>{},
      ()=>{}
    );
   }

}
