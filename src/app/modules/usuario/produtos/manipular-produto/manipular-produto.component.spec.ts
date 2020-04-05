import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipularProdutoComponent } from './manipular-produto.component';

describe('ManipularProdutoComponent', () => {
  let component: ManipularProdutoComponent;
  let fixture: ComponentFixture<ManipularProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManipularProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManipularProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
