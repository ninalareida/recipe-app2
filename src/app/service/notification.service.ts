import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationIdCounter = 1;

  constructor() { }

  async requestLocalNotificationPermission(): Promise<boolean> {
    try {
      await LocalNotifications.requestPermissions();
      return true;
    } catch (error) {
      console.error('Error requesting local notification permission:', error);
      return false;
    }
  }

  sendLocalNotification(title: string, body: string): void {
    console.log('Sending notification...');
    const notification = {
      title: title,
      body: body,
      id: this.notificationIdCounter++, // Use a counter for a unique ID
      smallIcon: 'ic_stat_icon_config_sample', // Use the icon specified in your capacitor.config.ts
      iconColor: '#488AFF',
      sound: 'beep.wav',
    };

    LocalNotifications.schedule({
      notifications: [notification],
    }).then(() => {
      console.log('Notification sent successfully');
    }).catch((error) => {
      console.error('Error sending notification:', error);
    });
  }
}
