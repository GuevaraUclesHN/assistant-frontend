import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event-form',
  templateUrl: './add-event-form.component.html',
  styleUrls: ['./add-event-form.component.css']
})
export class AddEventFormComponent implements OnInit{
  enabled: boolean = false;
  formAgendar !: FormGroup;

  constructor() {

  }

  ngOnInit(): void {

  }

  initForm(): FormGroup {
    return new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.email),
      phone: new FormControl("", Validators.required),
      title: new FormControl("")
    });
  }

  get formControls() {
    return this.formAgendar.controls;
  }

  enableForm() {
    this.enabled = !this.enabled;
  }

}
