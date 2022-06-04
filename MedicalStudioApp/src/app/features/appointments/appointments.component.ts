import {Component, OnInit} from '@angular/core';
import {PatientService} from "../../core/services/patient.service";
import {Patient} from "../../model/patient";
import {Appointment} from "../../model/appointment";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {

  appointmentData: any;
  patientData: any;
  appointmentBkpList: any[] = [];
  visitTypeData: any;
  placeData: any;
  officeData: any;
  displayedColumns: string[] = ['color', 'aTime', 'aDate', 'p', 'vType', 'g', 'pFC', 'aN', 'aP', 'ico1', 'ico2', 'placeIco'];
  string: any;

  constructor(private patientService: PatientService) {
  }

  ngOnInit(): void {
    this.getAllPatients();
    this.getAllAppointments();
    this.getAllVisitTypes();
    this.getAllPlaces();
    this.getAllOffices();
  }

  getAllAppointments() {
    this.patientService.getAllAppointments().subscribe(data => {
      this.appointmentData = data;
    });
  }

  getAllPatients() {
    this.patientService.getAllPatients().subscribe(data => {
      this.patientData = data;
    });
  }

  getAllVisitTypes() {
    this.patientService.getAllVisitTypes().subscribe(data => {
      this.visitTypeData = data;
    });
  }

  getAllPlaces() {
    this.patientService.getAllPlaces().subscribe(data => {
      this.placeData = data;
    });
  }

  getAllOffices() {
    this.patientService.getAllOffices().subscribe(data => {
      this.officeData = data;
    });
  }

  search(value: KeyboardEvent) {
    if (this.appointmentBkpList.length > 0) {
      this.appointmentData = this.appointmentBkpList;
    }
    this.string = (<HTMLInputElement>value.target).value;
    this.appointmentBkpList = this.appointmentData;
    this.appointmentData = this.appointmentData.filter((appointment: Appointment) => appointment.patient.name.toLowerCase().includes(this.string.toLowerCase()));
  }

  filterByVisit($event: MatSelectChange) {
    if (this.appointmentBkpList.length > 0) {
      this.appointmentData = this.appointmentBkpList;
    }
    this.string = $event.value;
    this.appointmentBkpList = this.appointmentData;
    this.appointmentData = this.appointmentData.filter((appointment: Appointment) => appointment.medicalService.name.toLowerCase().includes(this.string.toLowerCase()));
    if (this.string === 'All') {
      this.getAllAppointments();
    }
  }

  filterByPlace($event: MatSelectChange) {
    if (this.appointmentBkpList.length > 0) {
      this.appointmentData = this.appointmentBkpList;
    }
    this.string = $event.value;
    this.appointmentBkpList = this.appointmentData;
    this.appointmentData = this.appointmentData.filter((appointment: Appointment) => appointment.place.name.toLowerCase().includes(this.string.toLowerCase()));
    if (this.string === 'All') {
      this.getAllAppointments();
    }
  }

  filterByDate($event: Event) {
    if (this.appointmentBkpList.length > 0) {
      this.appointmentData = this.appointmentBkpList;
    }
    this.string = (<HTMLInputElement>$event.target).value;
    this.appointmentBkpList = this.appointmentData;
    this.appointmentData = this.appointmentData.filter((appointment: Appointment) => appointment.date == this.string);
    console.log(this.string);
  }
}
