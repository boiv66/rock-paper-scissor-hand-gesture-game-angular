import { Component, ElementRef, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-item-picture-scissor',
  templateUrl: './item-picture-scissor.component.html',
  styleUrls: ['./item-picture-scissor.component.css']
})
export class ItemPictureScissorComponent implements OnChanges, OnDestroy{
  @ViewChild('pictureContainer') pictureContainer: ElementRef; 
  @Input() yourChoice: string; 
  interval: any = null; 

  ngOnChanges(){
    if(this.pictureContainer && this.yourChoice ){
      this.pictureContainer.nativeElement.classList.add('hovered')
      this.interval = setTimeout(() => this.pictureContainer.nativeElement.classList.remove('hovered'), 1000)
    }
   

  }
  ngOnDestroy(): void {
     
    clearInterval(this.interval); 
   }


}
