import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { Vote } from './Component/Vote/vote.component';

import { HttpModule }    from '@angular/http';

@NgModule({
  declarations: [
    AppComponent, Vote
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'vote',
        component: Vote
    },
     {
        path: '',
        redirectTo: '/vote',
        pathMatch: 'full'
    }
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
