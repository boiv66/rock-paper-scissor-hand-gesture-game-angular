import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import * as handTrack from "handtrackjs";
import { PredictionEvent } from "../prediction-event";
import { ascendingSorted, descendingSorted } from "../game-logistic";

@Component({
  selector: "app-handtracker",
  templateUrl: "./handtracker.component.html",
  styleUrls: ["./handtracker.component.css"],
})
export class HandtrackerComponent implements OnInit {
  @Output() onPrediction = new EventEmitter<PredictionEvent>();
  @ViewChild("htvideo") video: ElementRef;

  /* 
  SAMPLERATE determines the rate at which detection occurs (in milliseconds)
  500, or one half second is about right, but feel free to experiment with faster
  or slower rates
  */

  xcoordinateArray: Array<number> = [];

  SAMPLERATE: number = 500;

  detectedGesture: string = "None";
  width: string = "400";
  height: string = "400";

  private model: any = null;
  private runInterval: any = null;
  private xRecordInterval: any = null;

  //handTracker model
  private modelParams = {
    flipHorizontal: true, // flip e.g for video
    maxNumBoxes: 20, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.6, // confidence threshold for predictions.
  };

  constructor() {}

  ngOnInit(): void {
    handTrack.load(this.modelParams).then((lmodel: any) => {
      this.model = lmodel;
      console.log("loaded");
    });
  }

  ngOnDestroy(): void {
    this.model.dispose();
    clearInterval(this.runInterval);
    clearInterval(this.xRecordInterval); 
    handTrack.stopVideo(this.video.nativeElement);
  }

  startVideo(): Promise<any> {
    return handTrack.startVideo(this.video.nativeElement).then(
      function (status: any) {
        return status;
      },
      (err: any) => {
        return err;
      }
    );
  }
  stopDetection() {
    console.log("stopping predictions");
    clearInterval(this.runInterval);
    clearInterval(this.xRecordInterval); 
    handTrack.stopVideo(this.video.nativeElement);
  }
  sleep(ms: number) {
    return new Promise(asynFunc => setTimeout(asynFunc, ms))
  }
  startDetection() {
    this.startVideo().then(
      () => {
        //The default size set in the library is 20px. Change here or use styling
        //to hide if video is not desired in UI.
        this.video.nativeElement.style.height = "200px";

        console.log("starting predictions");

        this.runInterval = setInterval( () => {
          this.runDetection();
        }, this.SAMPLERATE);

        this.xRecordInterval = setInterval( () =>{
          if (ascendingSorted(this.xcoordinateArray)){
            this.detectedGesture = "swipe right"; 
            console.log("swift right")
            this.onPrediction.emit(new PredictionEvent(this.detectedGesture, this.stopDetection));
            
          }
          else if(descendingSorted(this.xcoordinateArray)){
            this.detectedGesture = "swipe left"; 
            console.log("swift left")
            this.onPrediction.emit(new PredictionEvent(this.detectedGesture, this.stopDetection));
          }
          console.log(this.xcoordinateArray); 
          this.xcoordinateArray = [];

        }, 3000);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  

  /*
    runDetection demonstrates how to capture predictions from the handTrack library.
    It is not feature complete! Feel free to change/modify/delete whatever you need
    to meet your desired set of interactions
  */
  runDetection() {
    if (this.model != null) {
      let predictions = this.model.detect(this.video.nativeElement).then(
        async (predictions: any) => {
          if (predictions.length <= 0) return;

          let openhands = 0;
          let closedhands = 0;
          let pointing = 0;
          let pinching = 0;
          let openHandIndex = 0; 
          
          console.log("predictions: ", predictions);
          for (let p of predictions) {
            //uncomment to view label and position data
            console.log(
              p.label +
                " at X: " +
                p.bbox[0] +
                ", Y: " +
                p.bbox[1] +
                " at X: " +
                p.bbox[2] +
                ", Y: " +
                p.bbox[3]
            );

            if (p.label == "open") {
              openHandIndex = predictions.indexOf(p); 
              openhands++;
            }
            if (p.label == "closed") closedhands++;
            if (p.label == "point") pointing++;
            if (p.label == "pinch") pinching++;
          }

          // These are just a few options! What about one hand open and one hand closed!?

          if (openhands > 1) {
            this.detectedGesture = "Two Open Hands";
            this.onPrediction.emit(new PredictionEvent(this.detectedGesture, this.stopDetection));
            clearInterval(this.runInterval);
            await this.sleep(2000);
            this.runInterval = setInterval(async () => {
              this.runDetection();
            }, this.SAMPLERATE);
            return;
          }
          else if (openhands == 1) {
            this.detectedGesture = "Open Hand";
            this.xcoordinateArray.push(predictions[openHandIndex].bbox[0]); 

          }
          if (closedhands > 1) this.detectedGesture = "Two Closed Hands";
          else if (closedhands == 1) this.detectedGesture = "Closed Hand";

          if (pointing > 1) this.detectedGesture = "Two Hands Pointing";
          else if (pointing == 1) this.detectedGesture = "Hand Pointing";

          if (pinching > 1) this.detectedGesture = "Two Hands Pinching";
          else if (pinching == 1) this.detectedGesture = "Hand Pinching";

          if (
            openhands == 0 &&
            closedhands == 0 &&
            pointing == 0 &&
            pinching == 0
          )
            this.detectedGesture = "None";

          this.onPrediction.emit(new PredictionEvent(this.detectedGesture, this.stopDetection));
        },
        (err: any) => {
          console.log("ERROR");
          console.log(err);
        }
      );
    } else {
      console.log("no model");
    }
  }
}
