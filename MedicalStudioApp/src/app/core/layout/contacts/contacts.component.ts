import {Component, OnInit} from '@angular/core';
import {PatientService} from "../../services/patient.service";
import {Appointment} from "../../../model/appointment";
import {Patient} from "../../../model/patient";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  patientData: any;
  patientDataSorted: any;
  patientBkpList: any = [];
  letterArray: any = [];
  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  string: any;

  constructor(private patientService: PatientService) {
  }

  ngOnInit(): void {
    this.getAllPatients();

  }

  getAllPatients() {
    this.patientService.getAllPatients().subscribe(data => {
      this.patientData = data;
      this.sortPatients();
      this.addInitialLetters();
    });
  }

  private sortPatients() {
    this.patientDataSorted = this.patientData.sort(function (a: { name: string; }, b: { name: string; }) {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  private addInitialLetters() {
    for (let patient of this.patientDataSorted) {
      if (this.letterArray.includes(patient.name.charAt(0)))
        this.letterArray.push("");
      else
        this.letterArray.push(patient.name.charAt(0).toUpperCase());
    }
  }

  search(value: KeyboardEvent) {
    if (this.patientBkpList.length > 0) {
      this.patientDataSorted = this.patientBkpList;
    }
    this.string = (<HTMLInputElement>value.target).value;
    this.patientBkpList = this.patientDataSorted;
    this.patientDataSorted = this.patientDataSorted.filter((patient: Patient) => patient.name.toLowerCase().includes(this.string.toLowerCase()));
    this.letterArray = [];
    this.addInitialLetters();
  }

  scrollTo(letter: string) {
    let el = document.getElementById(letter);
    // @ts-ignore
    el.scrollIntoView();
  }
}
