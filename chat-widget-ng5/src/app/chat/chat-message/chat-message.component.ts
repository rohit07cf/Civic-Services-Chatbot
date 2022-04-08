import { Component, OnInit, Input } from '@angular/core';
import { Message, UiMessage } from '../shared/model/message';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'chat-message',
  template: '<div   [innerHtml]="htmlData" ></div>',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: UiMessage
  htmlData: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit() {
    if (this.message.text) {
      this.htmlData = this.sanitizer.bypassSecurityTrustHtml(this.message.text);
    }
  }
}
