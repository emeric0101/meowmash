import { TestBed, async } from '@angular/core/testing';

import { Vote } from './vote.component';
import { HttpModule }    from '@angular/http';

describe('VoteComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        Vote
      ],
      imports: [
          HttpModule
      ]
    }).compileComponents();
  }));

  it('should generate random sentence', async(async () => {
    const fixture = TestBed.createComponent(Vote);
    const controller : Vote = fixture.debugElement.componentInstance;
    for (let i = 0; i< 1000; i++) {
        expect(controller.randomSentence() != "").toBe(true);
    }

  }));


});
