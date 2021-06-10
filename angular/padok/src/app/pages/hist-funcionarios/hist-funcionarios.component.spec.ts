import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistFuncionariosComponent } from './hist-funcionarios.component';

describe('HistFuncionariosComponent', () => {
  let component: HistFuncionariosComponent;
  let fixture: ComponentFixture<HistFuncionariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistFuncionariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
