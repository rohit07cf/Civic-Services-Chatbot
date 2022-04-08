import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatQuickrepliesComponent } from './chat-quickreplies.component';

describe('ChatQuickrepliesComponent', () => {
  let component: ChatQuickrepliesComponent;
  let fixture: ComponentFixture<ChatQuickrepliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatQuickrepliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatQuickrepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
