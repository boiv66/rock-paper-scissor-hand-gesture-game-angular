;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiComponent } from './ui/ui.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HandtrackerComponent } from './handtracker/handtracker.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { ItemPictureScissorComponent } from './item-picture-scissor/item-picture-scissor.component';
import { ItemPictureRockComponent } from './item-picture-rock/item-picture-rock.component';
import { ItemPicturePaperComponent } from './item-picture-paper/item-picture-paper.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    UiComponent,
    HomePageComponent,
    HandtrackerComponent,
    ScoreboardComponent, ScoreboardComponent, ItemPictureScissorComponent, ItemPictureRockComponent, ItemPicturePaperComponent, MenuPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
