import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerService } from './../server.service';

declare var jQuery:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

   filename;
   showdropzone = true;

  @ViewChild('successupload') successupload;

  constructor(private serverService: ServerService) { }

  LoginResponse: {token: string, teamname: string, member1name: string, member2name: string, member3name: string };
  firstchar;
  dropzoneurl;

  ngOnInit() {

    if(this.serverService.RefreshResponse() != null) {
  	this.LoginResponse = this.serverService.RefreshResponse(); 
  	this.firstchar = this.LoginResponse.teamname.charAt(0);
    }


	  this.dropzoneurl = "http://akgec-scrolls.com/test/api/public/api/fileentry/add?token="+this.LoginResponse.token;

	this.serverService.SynopsisAlready(this.LoginResponse.token)
	 .subscribe(
	   (response) =>{ 
	   	if (response.json().code == 422) {
	   		this.showdropzone = false;
	   	}
	   },

	   (error) => {
	   	if (error.json().code == 422) {
	   		this.showdropzone = false;
	   	}
	   }
	 );
  }

  triggermodal(event) {

    jQuery(this.successupload.nativeElement).modal('show'); 
  }

}
