import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonLabel } from "@ionic/angular/standalone";

@Component({
  selector: 'app-session-timer',
  standalone: true,
  templateUrl: './session-timer.component.html',
  styleUrls: ['./session-timer.component.scss'],
    imports: [IonLabel]
})
export class SessionTimerComponent implements OnInit, OnDestroy {
  totalSeconds = 5 * 60;
  intervalId: any;
  warned = false;

  get minutes() {
    return Math.floor(this.totalSeconds / 60);
  }

  get seconds() {
    return this.totalSeconds % 60;
  }

  constructor(private alertCtrl: AlertController, private router: Router) {}

  ngOnInit() {
    this.restartTimer();
  }

  restartTimer() {
    this.totalSeconds = 5 * 60;
    this.warned = false;

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(async () => {
      this.totalSeconds--;

      if (this.totalSeconds === 60 && !this.warned) {
        this.warned = true;
        const alert = await this.alertCtrl.create({
          header: '¡Atención!',
          message: 'Tu sesión expirará en 1 minuto.',
          buttons: ['Ok'],
        });
        await alert.present();
      }

      if (this.totalSeconds <= 0) {
        clearInterval(this.intervalId);
        const alert = await this.alertCtrl.create({
          header: 'Sesión expirada',
          message: 'Has sido desconectado por inactividad.',
          buttons: ['Aceptar'],
        });
        await alert.present();
        this.router.navigate(['/login']);
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

