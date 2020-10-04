import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;
  emailValidation = '^[a-zA-Z0-9]+@gmail\\.com$';
  counter: any;
  loginCounter = 3;
  submitDisable = false;

  constructor(
    fb: FormBuilder,
    private appService: AppService
  ) {

    this.form = fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailValidation)]],
      passwordCustomField: ['', [Validators.required, Validators.minLength(6) ]]
    });
    this.subscriptions();
  }

  formSubmit(): void {
    if (this.form.valid ) {
      this.appService.postForm(this.form.value).then((res) => {
        if (res) {
          this.setLoginCounter();
        }
      });
    }
    if (this.form.invalid) {
      this.form.setErrors({ ...this.form.errors, error: true });
      return;
    }
  }

  subscriptions(): void {
    this.email.valueChanges.subscribe((val) => {
      if (this.email.valid) {
        const key = new Date().getTime();
        localStorage.setItem(key.toString(), val);
      }
    });
  }

  setLoginCounter(): any {
    this.loginCounter += 1;
    localStorage.setItem('logCount', this.loginCounter.toString());

    if (this.loginCounter % 3 === 0) {
      this.counter = 10 * (Math.pow(2, (this.loginCounter / 3) - 1));
      this.submitDisable = !this.submitDisable;
      setInterval(() => {
        this.submitDisable = !this.submitDisable;
      }, Number(`${this.counter}000`));
    }
  }

  get email(): any {
    return this.form.get('email');
  }
}
