import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }
  $function () {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
       isClosed = false;
  
      trigger.click(function () {
        hamburger_cross();      
      });
  
      function hamburger_cross() {
  
        if (isClosed == true) {          
          overlay.hide();
          trigger.removeClass('is-open');
          trigger.addClass('is-closed');
          isClosed = false;
        } else {   
          overlay.show();
          trigger.removeClass('is-closed');
          trigger.addClass('is-open');
          isClosed = true;
        }
    }
    
    $('[data-toggle="offcanvas"]').click(function () {
          $('#wrapper').toggleClass('toggled');
    });  
  };

}
