import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component'
import { APP_BASE_HREF } from '@angular/common'
import { ChatModule, ChatWidgetComponent } from './chat';
import { RouterModule, Routes,  } from '@angular/router';

const Routes:Routes=[
  {path:'',redirectTo:'chat',pathMatch:'full'},
  {path:'chat/:username',component:ChatWidgetComponent},
// {
//   path:'chat',loadChildren:'./chat/chat.module#ChatModule'
// }
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpModule, ChatModule, RouterModule.forRoot([],{useHash:true})
  ],
  providers: [
   { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
