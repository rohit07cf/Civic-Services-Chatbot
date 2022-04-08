import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { ChatAvatarComponent } from './chat-avatar/chat-avatar.component'
import { ChatInputComponent } from './chat-input/chat-input.component'
import { ChatConfigComponent } from './chat-config/chat-config.component'
import { ChatQuickrepliesComponent } from './chat-quickreplies/chat-quickreplies.component'
import { GeolocationService } from './services/geolocation.service'
import { EditableDivDirective } from './chat-widget/EditableDivDirective';
import { ChatMessageComponent } from './chat-message/chat-message.component'
import { FileUploaderService } from './services/fileuploader/file-uploader.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule , MatCardModule } from '@angular/material';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AccessTokenService } from './services/esb/access-token.service';
import { BustopsService } from './services/itms/bustops.service';
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';
import { ConveseUploaderService } from './services/convsationservice/convese-uploader.service';
import { CommonService } from './services/common-services/common.service';
import { MessageService } from './services/message/message.service';
import { RasaConnectorService } from './services/rasaconnector/rasa-connector.service';
import { HttpClientService } from './services/http-client/http-client.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, HttpModule,//NoopAnimationsModule,//BrowserAnimationsModule,
    MatAutocompleteModule , MatFormFieldModule , MatCardModule ,FormsModule, ReactiveFormsModule],

  declarations: [ChatAvatarComponent, ChatWidgetComponent, ChatInputComponent,
     ChatConfigComponent, ChatQuickrepliesComponent, EditableDivDirective, ChatMessageComponent],

  exports: [ChatWidgetComponent, ChatConfigComponent],

  entryComponents: [ChatWidgetComponent, ChatConfigComponent],

  providers: [GeolocationService, FileUploaderService ,
     AccessTokenService , BustopsService , ConveseUploaderService, 
     CommonService, HttpClientService, MessageService, RasaConnectorService]
})
export class ChatModule {}
