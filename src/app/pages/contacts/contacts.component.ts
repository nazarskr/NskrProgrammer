import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ContactsService } from '../../shared/services/contacts.service';
import { Contact } from '../../shared/classes/contacts.class';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contactsData: any;
  contactDate: Date;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nameFormControl = new FormControl('', [
    Validators.required,
  ]);
  messageFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();
  mailData: any;
  constructor(private contactsService: ContactsService,
              private router: Router) {}

  ngOnInit() {
  }
  createContact() {
    if (this.nameFormControl.value && this.emailFormControl.value && this.messageFormControl.value) {
      this.contactDate = new Date();
      const newContact = new Contact (
        this.contactDate,
        this.nameFormControl.value,
        this.emailFormControl.value,
        this.messageFormControl.value);
      this.contactsService.createContact(newContact)
          .then(() => {
              this.nameFormControl.setValue('');
              this.emailFormControl.setValue('');
              this.messageFormControl.setValue('');
      });
      alert('Successful!');
      this.router.navigate(['/home']);
    }
  }
}

