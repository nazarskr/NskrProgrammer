import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../shared/services/contacts.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-contacts',
  templateUrl: './admin-contacts.component.html',
  styleUrls: ['./admin-contacts.component.scss']
})
export class AdminContactsComponent implements OnInit {
  contactsData: any;
  constructor(private contactsService: ContactsService) {
    this.getContacts();
  }

  ngOnInit() {
  }
  getContacts() {
    this.contactsService
    .getContacts()
    .snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    )
    .subscribe(res => (this.contactsData = res));
  }
  deleteContact(contact) {
    this.contactsService.deleteContact(contact.id);
  }
}
