import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistFornecedoresComponent } from './hist-fornecedores.component';

describe('HistFornecedoresComponent', () => {
  let component: HistFornecedoresComponent;
  let fixture: ComponentFixture<HistFornecedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistFornecedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistFornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
