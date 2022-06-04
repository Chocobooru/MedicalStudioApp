import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Patient} from "../../model/patient";
import {Appointment} from "../../model/appointment";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  appUrl = 'http://localhost:3000/appointment/';
  patUrl = 'http://localhost:3000/patient';
  visUrl = 'http://localhost:3000/visittype';
  plaUrl = 'http://localhost:3000/place';
  offUrl = 'http://localhost:3000/office';

  constructor(private http: HttpClient) {
  }

  getAllAppointments() {
    return this.http.get(this.appUrl);
  }

  getAllPatients() {
    return this.http.get(this.patUrl);
  }

  postPatient(data: Patient) {
    return this.http.post(this.patUrl, data);
  }

  getPatientById(id: number) {
    return this.http.get(this.patUrl + '/' + id);
  }

  postAppointment(data: Appointment) {
    return this.http.post(this.appUrl, data);
  }

  getAllVisitTypes() {
    return this.http.get(this.visUrl);
  }

  getAllPlaces() {
    return this.http.get(this.plaUrl);
  }

  getAllOffices() {
    return this.http.get(this.offUrl);
  }
}
