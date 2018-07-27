import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { debounce } from 'rxjs/operator/debounce';

import { User } from '../../pages/form_test/form-template/user.interface';

// new upload images service
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService:AuthService,
    private router:Router,
    private toasterService:ToasterService,
    private profileService: ProfileService
  ) { }
  user: User = {
    _id: '',
    name: '',
    email: '',
    username: '',
    avatar: '',
  };
  profile: any; 
  imgUrl: String = "http://localhost:3000/upload/img";
  imageChange: Boolean = false;
  @ViewChild('imageupload') el:ElementRef;
  @Input() multiple: boolean = false;
  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.authService.getProfile().then((result) => {
      this.user = result['user'];
      if(!this.user.avatar){
        this.user.avatar = this.imgUrl + '/5b586b8a68656120681ab76c'
      }
      // this.profile = 'http://localhost:3000/upload/img/files_1530698768069.jpg'
    }, (err) => {
      this.toasterService.pop('error', err.status, err.statusText);
      // this.router.navigate(['/login']);
      console.log(err);
    })
  }

  onFileChange(fileInput: any){
    if(fileInput.target.files[0]){
      this.profile = this.user.avatar = fileInput.target.files[0];

      let reader = new FileReader();

      reader.onload = (e: any) => {
          this.user.avatar = e.target.result;
      }

      reader.readAsDataURL(fileInput.target.files[0]);
      this.imageChange = true;
    }
  }

  onSubmit({ value, valid }: { value: User, valid: boolean }) {
    // console.log(value, valid);
    if(this.imageChange){
      let inputEl = this.el.nativeElement;
      if (inputEl.files.length == 0) return;

      let files :FileList = inputEl.files;
      const formData = new FormData();
      for(var i = 0; i < files.length; i++){
        // console.log(files[i].name);
        formData.append('file', files[i], files[i].name);
        formData.append('userId', value._id);
      }

      this.profileService.uploadImage(formData).then(function(res){
        console.log(res);
        this.updateUserData(res);
        // this.user.avatar = res.toString();
      })
      
    } else {
      this.profileService.updateUser(this.user._id, this.user).then(function(res){
        // this.getUserProfile();
      })
    }
  }

  clickImage(ev){
    $('#imgupload').trigger('click');
  }

  updateUserData(data){
    this.profileService.setProfilePicture(this.user._id, data).then(function(res){
      // this.getUserProfile();
      console.log(res);
    })
  }
}
