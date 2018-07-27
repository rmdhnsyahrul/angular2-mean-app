import { Component, OnInit } from '@angular/core';
import { User } from './user.interface';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})

export class FormTemplateComponent implements OnInit {
  user: User = {
    name: 'admin',
    email: 'eadmin@admin.com',
    username: 'admin7879',
    avatar: ''
  };

  constructor() { }

  ngOnInit() {
  }

}
