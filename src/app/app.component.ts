import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, NgForm } from '@angular/forms';
import { ServerService } from './server.service';
import { animate, state, transition, trigger, style, keyframes } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

declare var jQuery:any;

@Component({
  selector: 'app-scrolls',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [ '.pwd_mismatch { border-bottom: 2px solid #c0392b !important; }' ],
	animations:[ trigger('load', [
	        transition(':enter', [
	            style({ opacity: 0 }),
	            animate(600, style({ opacity: 1 }))
	        ]),
	        transition(':leave', [
	            style({ opacity: 1 }),
	            animate(300, style({ opacity: 0 }))
	        ]),

	    ]),
trigger('visibilityChanged', [
        transition(':enter', [
            style({ opacity: 0, transform: 'translateX(-40px)' }),
            animate(600, style({ opacity: 1, transform: 'translateX(0)' }))
        ]),
        transition(':leave', [
            style({ opacity: 1, transform: 'translateX(0)' }),
            animate(600, style({ opacity: 0, transform: 'translateX(-40px)' }))
      ]),
      ]) 
    ]
})

export class AppComponent {

  constructor(private serverService: ServerService, private router: Router) {}

  @ViewChild('successmodal') successmodal;
  @ViewChild('errormodal') errormodal;
  @ViewChild('modalcloser') modalcloser;

  emailerror = "Please Enter a valid Email!";
  studenterror = 'Please Enter a valid Student No.!';

  courses = ['B. Tech', 'M. Tech', 'MBA', 'MCA', 'PGDM', 'B. Sc'];
  course = '';

  showcontrol = [true, false, false, false];
  nextvalid = false;
  i = 0;

  teamid = '';
  APIdomains = [];
  APItitles = [];
  SubmitResponse;
  LoginResponse;
  errormsg = '';
  loggedin = false;  

  regForm : FormGroup;


ngOnInit() {

	this.regForm = new FormGroup({
  		'team_name' : new FormControl(null),
  		'domain_id' : new FormControl(null),
  		'topic_id' : new FormControl(null),
  		'password' : new FormControl(null),
  		'password_confirmation' : new FormControl(null, this.passwordConfirm.bind(this)),
  		'noofmembers' : new FormControl(null),
		'members' : new FormArray([])
	});

 // console.log(this.regForm);

this.serverService.getDomain()
 .subscribe(
   (response) => this.APIdomains = response.json().data,

   (error) => console.log(error)
 );

 if (this.serverService.isAuthenticated() == true) {
   this.loggedin = true;
 }

 this.LoginResponse = this.serverService.RefreshResponse(); 
 
}

  initMember(l) {
  	if (this.regForm.contains('members')) {
  		this.regForm.removeControl('members')
  	}
  	this.showcontrol = [true];
  	var members = new FormArray([]);
  	this.regForm.addControl('members', members);
  	for (var i = 0; i < l; i++) {
   		(<FormArray>this.regForm.get('members')).push(this.getmember(i));
   		this.showcontrol.push(false);

  	}
  	this.i = 0;
  	}

  getmember(i) {
  	  	 var member = new FormGroup({
	  	'name' : new FormControl(null),
  		'email' : new FormControl(null, [Validators.email, Validators.required, this.emailREGEX.bind(this), this.EmailRedundant.bind(this)], [this.emailValidator.bind(this)]),
  		'course' : new FormControl(null),
  		'year' : new FormControl(null),
  		'college_name' : new FormControl(null),
  		'college_name_entry' : new FormControl(null),
  		'student_no' : new FormControl(null, [this.StudentREGEX.bind(this), this.StudentRedundant.bind(this)], [this.studentValidator.bind(this)]),
  		'contact_no' : new FormControl(null),
  		'accomodation' : new FormControl(null),
  		'teamlead' : new FormControl(0)
  	});

  	 if (i==0) {
   			member.controls.teamlead.setValue(1) ;
   		}

   	return member;

 }

nextChecker() {

if (this.i==0) {
	this.nextvalid = this.regForm.get('team_name').valid && this.regForm.get('noofmembers').valid && this.regForm.get('domain_id').valid && this.regForm.get('topic_id').valid && this.regForm.get('password').valid && this.regForm.get('password_confirmation').valid;
}

else if (this.i== this.regForm.get('noofmembers').value) {
	return false;
}
else {
	this.nextvalid = (<FormArray>this.regForm.get('members')).at(this.i-1).valid;
}

	return this.nextvalid;
   		
 }

 previous() {
	this.showcontrol[this.i-1] = true;
	this.showcontrol[this.i]= false;
	this.i--;
 }

 next() {
 	this.i++;
 	this.showcontrol[this.i-1] = false;
 	this.showcontrol[this.i] = true;
 }


emailValidator(control: FormControl){
	return   this.serverService.asyncEmailCheck({ email : control.value})

	.map(
			res =>
				{
						
						if(res.status == 200 ) {
				    	console.log("Available");
						return null;
						} 

						// If request fails, return the response
						else {
					//	console.log("Fail");
						this.emailerror= "Email Already Exists!";
						return { "duplicate": true };
						}

				}
		);


}

studentValidator(control: FormControl){

	if (this.i==0) {
		return Observable.of(null);
	}

	if (control.parent.get('college_name').value == 'other') {
		return Observable.of(null);
	}
	return   this.serverService.asyncStudentNo({ student_no : control.value})
	.map(
			res =>
				{
						
						if(res.status == 200 ) {
					//	console.log("Available");
						return null;
						} 
						// If request fails, return the response
						else {
					//	console.log("Fail");
						return { "duplicate": true };
						}
					
				}
		);
	
}

emailREGEX(control: FormControl) {
  var REGEXP = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

if (this.i==0) {
  return null;
}

  return REGEXP.test(control.value) ? null : {
    validateemailREGEX: {
      valid: false
    }}  

}



StudentREGEX(control: FormControl) {
  var REGEXP = new RegExp(/^[1][4-7]\d{5}[Dd]{0,1}$/);

  if (this.i==0) {
  	return null;
  }

	if (control.parent.get('college_name').value == 'akg') {
  return REGEXP.test(control.value) ? null : {
    validateStudentREGEX: {
      valid: false
    }}  }

    else return null;

}

StudentRedundant(control: FormControl) {

if (this.i <= 1) {
	return null;
}

else if (this.i == 2) {
return ( (<FormArray>(this.regForm.get('members'))).at(this.i-2).value.student_no != control.value) ? null : {
    validateStudentRedundant: {
      valid: false
    }}
}

else if (this.i == 3) {
return ( (<FormArray>(this.regForm.get('members'))).at(this.i-3).value.student_no != control.value
	|| (<FormArray>(this.regForm.get('members'))).at(this.i-2).value.student_no != control.value) ? null : {
    validateStudentRedundant: {
      valid: false
    }}
}
else return null;

}


EmailRedundant(control: FormControl) {

if (this.i <= 1) {
	return null;
}

else if (this.i == 2) {
return ( (<FormArray>(this.regForm.get('members'))).at(this.i-2).value.email != control.value) ? null : {
    validateStudentRedundant: {
      valid: false
    }}
}

else if (this.i == 3) {
return ( (<FormArray>(this.regForm.get('members'))).at(this.i-3).value.email != control.value
	|| (<FormArray>(this.regForm.get('members'))).at(this.i-2).value.email != control.value) ? null : {
    validateStudentRedundant: {
      valid: false
    }}
}
else return null;

}
 
 getTopics(){
   	var id = this.regForm.get('domain_id').value;
  this.serverService.getTopic(id)
   .subscribe(
     (response) => this.APItitles = response.json().data,
     
     (error) => console.log(error)
   );
   }

 passwordConfirm(control: FormControl): {[s: string]: boolean} {

    if ((control.root.get('password') == null) || (control.value != control.root.get('password').value)) {
        return { mismatch: true };

    }
    return null;
}


onSubmit() {


for (var i = 0; i < (<FormArray>this.regForm.get('members')).length; i++) {
  if ((<FormArray>this.regForm.get('members')).at(i).value.college_name == "other") {
    (<FormArray>this.regForm.get('members')).at(i).value.college_name = (<FormArray>this.regForm.get('members')).at(i).value.college_name_entry;
  }  
} 

console.log(JSON.stringify(this.regForm.value));

 this.serverService.submitForm(JSON.stringify(this.regForm.value))
  .subscribe(
    (response) => { // console.log(response.json()),
    	this.SubmitResponse = response.json();
    	if (this.SubmitResponse.success == true) {
    		this.regForm.reset();
		  	this.i = 0;
  			this.showcontrol = [true];
   			this.teamid = (<string>(response.json().data));
     	jQuery(this.modalcloser.nativeElement).modal('hide'); 
     	jQuery(this.successmodal.nativeElement).modal('show'); 

    	}

    },

    (error) => {console.log(error.json()),
     jQuery(this.modalcloser.nativeElement).modal('hide'); 
     jQuery(this.errormodal.nativeElement).modal('show'); 
     	var keys = Object.keys(error.json().error);
     	for (var key in keys) {
     		this.errormsg += (error.json().error[key]+"\n");
     	}
    }
  );
 }

onLogin(form: NgForm) {
    this.serverService.Login(JSON.stringify(form.value))
      .subscribe(
        (response) => { 
        form.reset();
        this.LoginResponse = response.json().data;
        jQuery(this.modalcloser.nativeElement).modal('hide'); 
        this.serverService.onLogin(this.LoginResponse);
        this.loggedin = true;
        this.router.navigate(['/dashboard']);
        },
        (error) => {console.log(error.json()),
     jQuery(this.modalcloser.nativeElement).modal('hide'); 
     jQuery(this.errormodal.nativeElement).modal('show'); 
         this.errormsg = (error.json().error);
    }
   );
  }


  logOut() {
    this.serverService.logOut(this.LoginResponse.token)
   .subscribe(
     (response) => { // console.log(response);
          jQuery(this.modalcloser.nativeElement).modal('hide'); 
           this.LoginResponse = null;
           this.router.navigate(['/']);
           this.loggedin = false;
           return this.serverService.onLogin(this.LoginResponse);
         },

     (error) => {console.log(error),
     jQuery(this.modalcloser.nativeElement).modal('hide'); 
     jQuery(this.errormodal.nativeElement).modal('show'); 
         this.errormsg = (error.json().error);
           this.router.navigate(['/']);
    }
   );
  }

}
