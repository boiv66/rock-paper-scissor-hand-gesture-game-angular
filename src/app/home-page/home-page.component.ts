import { Component, OnInit } from "@angular/core";
import { PredictionEvent } from "../prediction-event";
import { randomizeComputerChoice, youWin } from "../game-logistic";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit {
  gesture: string = "";
  constructor() {}
  startGame: boolean = true;
  yourChoice: string = "";
  computerChoice: string = "";
  computerScore: number = 0;
  yourScore: number = 0;
  result: string = "";
  interval: any = null;
  isPlaying: boolean = true;

  ngOnInit(): void {}


  handleEvent(event: PredictionEvent){
   
  }
  prediction(event: PredictionEvent) {
    this.gesture = event.getPrediction();
    if(this.gesture == "Two Open Hands") {
      this.isPlaying = true;
    }
    if (
      (this.gesture == "Open Hand" ||
      this.gesture == "Closed Hand" ||
      this.gesture == "Hand Pointing" ) && this.isPlaying
    ) {                   
      this.isPlaying = false;
      this.computerChoice = randomizeComputerChoice();
      this.yourChoice = this.analyzeHandGestureChoice(this.gesture);
      if (youWin(this.yourChoice, this.computerChoice) == "tie") {
        this.result = "Tie";
      } else if (youWin(this.yourChoice, this.computerChoice)) {
        this.result = "You Won";
        this.yourScore++;
      } else if (!youWin(this.yourChoice, this.computerChoice)){
        this.result = "Computer Won";
        this.computerScore++;
      }
      this.isPlaying = false;
    }
    if (this.gesture == 'swipe left' && !this.isPlaying){
      this.restartGame(); 
    }
  }

  analyzeHandGestureChoice(yourChoice: string): string {
    if (yourChoice == "Open Hand") {
      return "paper";
    } else if (yourChoice == "Closed Hand") {
      return "rock";
    }
    return "scissors";
  }
   
  restartGame(){
     this.computerScore = 0; 
     this.yourScore = 0;
     this.computerChoice = ""; 
     this.yourChoice = ""; 
     this.result = ""; 

  }
}
