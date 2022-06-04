import {Patient} from "./patient";
import {VisitType} from "./visit-type";
import {Place} from "./place";
import {Office} from "./office";

export interface Appointment{
  id: number;
  number: string;
  date: Date | string;
  startHour: Date | string;
  endHour: Date | string;
  medicalService: VisitType;
  place: Place;
  notes: string;
  patient: Patient;
  office: Office;
}
