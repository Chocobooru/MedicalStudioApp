import {Component, OnInit} from '@angular/core';
import {PatientService} from "../../core/services/patient.service";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

  formValuePatient: any;
  formValueAppointment: any;
  formValue: any;

  constructor(private patientService: PatientService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  patientData: any;
  appointmentData: any;
  medicalServiceData: any;
  placeData: any;
  officeData: any;
  patientImg: any;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(obs => {
      if (obs['id']) {
        const id = obs['id']
        this.getPatientById(id);
      }
    })
    this.getAllVisitTypes();
    this.getAllPlaces();
    this.getAllOffices();
    this.createForm();
  }

  getAllPlaces() {
    this.patientService.getAllPlaces().subscribe(data => {
      this.placeData = data;
    })
  }

  getAllVisitTypes() {
    this.patientService.getAllVisitTypes().subscribe(data => {
      this.medicalServiceData = data;
    })
  }

  getAllOffices() {
    this.patientService.getAllOffices().subscribe(data => {
        this.officeData = data;
      }
    );
  }

  createForm() {
    this.formValue = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formValuePatient = this.formBuilder.group({
          id: this.formBuilder.control(''),
          name: this.formBuilder.control('', [Validators.required]),
          surname: this.formBuilder.control('', [Validators.required]),
          age: this.formBuilder.control('', [Validators.required]),
          gender: this.formBuilder.control('', [Validators.required]),
          fiscalCode: this.formBuilder.control('', [Validators.required, Validators.pattern('^[A-Z]{6}[0-9]{2}$')]),
          phone: this.formBuilder.control('', [Validators.required, Validators.pattern('^[0-9]*$')]),
          address: this.formBuilder.control('', [Validators.required]),
          email: this.formBuilder.control('', [Validators.required, Validators.email]),
        }),
        this.formValueAppointment = this.formBuilder.group({
          date: this.formBuilder.control('', [Validators.required]),
          startHour: this.formBuilder.control('', [Validators.required]),
          endHour: this.formBuilder.control('', [Validators.required]),
          medicalService: this.formBuilder.control('', [Validators.required]),
          place: this.formBuilder.control('', [Validators.required]),
          notes: this.formBuilder.control(''),
          //TODO fix the problem with the notes in the html
        })
      ])
    });
  }

  get formArray(): FormArray {
    return this.formValue.get('formArray') as FormArray;
  }


  postPatient() {
    this.patientData = this.formValuePatient.value;
    // fruit.match(/^(banana|lemon|mango|pineapple)$/)
    if (this.patientData.name.toLowerCase().match(/^(bruno|caesar|dio|giorno|guido|iggy|jean pierre|joseph|killer|leone|za)$/)) {
      this.patientData.imgPath = '../../../../../assets/img/' + this.patientData.name.toLowerCase() + '.jpg';
    } else {
      this.patientData.imgPath = 'https://picsum.photos/id/' + Math.floor(Math.random() * 100 +1) + '/200/200';
    }

    this.patientService.postPatient(this.patientData).subscribe(
      () => {
        alert('Patient ' + this.patientData.name + ' ' + this.patientData.surname + ' successfully added');
        this.formValuePatient.reset();
      },
      () => {
      },
      () => {

        this.router.navigateByUrl('/appointments');
        window.location.reload();
      }
    );
  }

  getPatientById(id: number) {
    this.patientService.getPatientById(id).subscribe(observer => {
        this.patientData = {...observer};
        this.formValuePatient.patchValue(observer)
        this.patientImg = this.patientData.imgPath;
      },
      error => {
        console.error(error)
      },
      () => {
        console.log('complete')
        this.formValuePatient.disable();
      })
  }

  postAppointment() {
    if (!this.patientData) {
      this.postPatient();
    }
    this.appointmentData = this.formValueAppointment.value;
    this.appointmentData.patient = this.formValuePatient.value;
    this.appointmentData.patient.imgPath = this.patientImg;
    this.appointmentData.place = this.placeData.find((place: { name: any; }) => place.name === this.appointmentData.place);
    this.appointmentData.medicalService = this.medicalServiceData.find((medicalService: { name: any; }) => medicalService.name === this.appointmentData.medicalService);
    if (this.appointmentData.place.name == 'OFFICE') {
      this.appointmentData.office = this.pickRandomOffice();
    }
    this.appointmentData.number = this.generateThreeLetters() + this.generateThreeNumbers();
    this.patientService.postAppointment(this.appointmentData).subscribe(
      () => {
        alert('Appointment ' + this.appointmentData.number + ' successfully added');
        this.formValuePatient.reset();
      },
      () => {
      },
      () => {
        this.router.navigateByUrl('/appointments');
      }
    );
  }

  generateThreeLetters() {
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 3; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
  }

  generateThreeNumbers() {
    return Math.floor(Math.random() * (999 - 100) + 100);
  }

  pickRandomOffice() {
    return this.officeData[Math.floor(Math.random() * this.officeData.length)];
  }

  manageSubmit() {
  }
}

