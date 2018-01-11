import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Profile } from '../../models/profile';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  profileData: FirebaseObjectObservable<Profile>

  constructor(private afAuth: AngularFireAuth,
              private afDatabase: AngularFireDatabase,
              private toast: ToastController,
              public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `You're logged in as: ${data.email}`,
          duration: 3000
        }).present();

        this.profileData = this.afDatabase.object(`profile/${data.uid}`);
      } else {
        this.toast.create({
          message: `Could not find authentication details`,
          duration: 3000
        }).present();
      }
    });
  }

  signOut(){
    this.afAuth.auth.signOut().then(res => {
      this.navCtrl.setRoot("LoginPage");
    });
  }

}
