import { Component, OnInit, Input, OnChanges } from "@angular/core";

@Component({
  selector: "app-scoreboard",
  templateUrl: "./scoreboard.component.html",
  styleUrls: ["./scoreboard.component.css"],
})
export class ScoreboardComponent implements OnInit, OnChanges {
  @Input() yourScore: number;
  @Input() computerScore: number;

  yourCurrentScore: number = 0;
  computerCurrentScore: number = 0;
  ngOnInit(): void {
    this.computerCurrentScore = this.computerScore;
    this.yourCurrentScore = this.yourScore;
  }

  ngOnChanges() {
    this.computerCurrentScore = this.computerScore;
    this.yourCurrentScore = this.yourScore;
  }
}
