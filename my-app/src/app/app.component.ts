import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  constructor(private appService: AppService) {}

  title = 'angular-nodejs-example';

  userForm = new FormGroup({
    date: new FormControl('', Validators.nullValidator && Validators.required),
    description: new FormControl('', Validators.nullValidator && Validators.required),
    amount: new FormControl('', Validators.nullValidator && Validators.required)
  });

  users: any[] = [];
  userCount = 0;
  balance = 5000;

  destroy$: Subject<boolean> = new Subject<boolean>();

  onSubmit() {

    this.appService.addUser(this.userForm.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message::::', data);
      this.userCount = this.userCount + 1;
      this.balance += this.userForm.value.amount;
      console.log(this.balance);
      this.userForm.reset();
    });
  }

  getAllUsers() {
    this.appService.getUsers().pipe(takeUntil(this.destroy$)).subscribe((users: any[]) => {
        this.users = users;
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
