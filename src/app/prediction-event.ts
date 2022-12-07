
//TODO: If you would like to expose additional data from the handtracker component,
//extend this class with additional properties.

export class PredictionEvent {
    prediction: string = "None";
    xCoorArray: Array<number>; 
    stopVideoFunction: CallableFunction; 

    constructor(prediction:string, stopVideoFunction: CallableFunction){
        this.prediction = prediction;
        this.stopVideoFunction = stopVideoFunction; 
   
    }

    public getPrediction(){
        return this.prediction;
    }
    public stopVideo() {
        return this.stopVideoFunction;
    }
}
