import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavSxComponent } from './sidenav-sx.component';

describe('SidenavSxComponent', () => {
  let component: SidenavSxComponent;
  let fixture: ComponentFixture<SidenavSxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavSxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavSxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
