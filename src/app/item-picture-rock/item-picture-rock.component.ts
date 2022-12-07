import { Component, Input, OnChanges, ViewChild, ElementRef, OnDestroy } from "@angular/core";

@Component({
  selector: "app-item-picture-rock",
  templateUrl: "./item-picture-rock.component.html",
  styleUrls: ["./item-picture-rock.component.css"],
})
export class ItemPictureRockComponent implements OnChanges, OnDestroy {
  @ViewChild('pictureContainer') pictureContainer: ElementRef; 
  @Input() computerChoice: string;
  interval:any = null
  ngOnChanges() {
    if (this.pictureContainer && this.computerChoice){
      this.pictureContainer.nativeElement.classList.add('hovered')
      this.interval = setTimeout(() => this.pictureContainer.nativeElement.classList.remove('hovered'), 1000)
    }
    
    
  }
   ngOnDestroy(): void {
     
    clearInterval(this.interval); 
   }
}
