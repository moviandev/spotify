import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatButtonModule,
  MatTabsModule
} from '@angular/material';
import { MusicsListComponent } from './musics-list/musics-list.component';
import { AlbunsListComponent } from './albuns-list/albuns-list.component';
import { UsersPerfilComponent } from './users-perfil/users-perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    MusicsListComponent,
    AlbunsListComponent,
    UsersPerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
