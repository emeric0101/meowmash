import { TestBed, async } from '@angular/core/testing';

import { Result } from './result.component';
import { HttpModule }    from '@angular/http';

describe('ResultComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        Result
      ],
      imports: [
          HttpModule
      ]
    }).compileComponents();
  }));

  it('should have cats', async(async () => {
    const fixture = TestBed.createComponent(Result);
    const controller : Result = fixture.debugElement.componentInstance;
    await controller.ngOnInit();
    expect(controller.catVoted.length).toBeGreaterThan(1);
  }));

  it('should render in a a tag', async(() => {
    const fixture = TestBed.createComponent(Result);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a').textContent).toContain('Précédent');
  }));
});
