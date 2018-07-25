import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  @ViewChild('wrapper') wrapper;

  randomBackground(){
    const images = ["1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg","6.jpeg"];
    let rand = Math.floor(Math.random() * images.length);
    return images[rand];
  }
  setWrapperStyle(){
    this.wrapper.nativeElement.style.width='100vw';
    this.wrapper.nativeElement.style.height='100vh';
    this.wrapper.nativeElement.style.display='block';
    this.wrapper.nativeElement.style.backgroundImage='url(assets/images/background/'+this.randomBackground()+')';
    this.wrapper.nativeElement.style.backgroundRepeat='no-repeat';
    this.wrapper.nativeElement.style.backgroundSize='cover';
  }

  ngOnInit() {
    this.setWrapperStyle();

  }

}
