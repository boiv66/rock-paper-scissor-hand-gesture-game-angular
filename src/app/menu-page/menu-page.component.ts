import { Component, ElementRef, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PredictionEvent } from '../prediction-event';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent {
  
  @ViewChild('startGame') startGameButton: ElementRef<HTMLInputElement>
  gesture: string; 
  instructionDialogRef: any = null;
  ruleDialogRef: any = null; 

  constructor(public dialog: MatDialog, private router: Router) {}
  openDialog(): void {
    if (this.instructionDialogRef == null){
      this.instructionDialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
        width: '1200px',
        height: '700px'
     
      });
    }
    
  }
  openRule(): void{
    if (this.ruleDialogRef == null){
      this.ruleDialogRef = this.dialog.open(RuleDialog, {
        width: '1000px',
        height: '850px',
      })
    }
   
  }

  onStartGame(){
    this.router.navigate(['/', 'home-page'])
  }
  prediction(event: PredictionEvent){
    console.log(1); 
    this.gesture = event.getPrediction();
    if (this.gesture == 'swipe right'){
      event.stopVideo(); 
      this.onStartGame(); 


    }
    if (this.gesture == "Hand Pointing"){
      this.openDialog(); 
    }

    if(this.gesture == "Two Hands Pointing"){
      this.openRule(); 
    }
    if(this.gesture == "Closed Hand"){
      if (this.instructionDialogRef != null){
        this.instructionDialogRef.close(); 
        this.instructionDialogRef = null; 
      }
      if (this.ruleDialogRef != null){
        this.ruleDialogRef.close(); 
        this.ruleDialogRef = null; 
      }
      
    }


  }

}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: './dialog/dialog-animations-example-dialog.html',
  styleUrls:['./dialog/dialog-style.css'], 
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
 
}


@Component({
  selector: 'rule-dialog',
  templateUrl: './dialog/rule-dialog.html',
  styleUrls:['./dialog/dialog-style.css'], 
})
export class RuleDialog{
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}