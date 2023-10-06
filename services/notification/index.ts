/* eslint-disable class-methods-use-this */
import PushNotification from 'react-native-push-notification'

class Notifications {
    constructor() {
        PushNotification.configure({
            onRegister: (token) => {
                console.log(token)
            },
            onNotification: (notification) => {
                console.log(`NOTIFICATION: ${notification}`)
            },
            popInitialNotification: true,
            requestPermissions: false,
        })

        PushNotification.createChannel(
            {
                channelId: 'pichichiz',
                channelName: 'Task reminder notification',
                channelDescription: 'Reminder for any tasks',
            },
            () => {}
        )

        PushNotification.getScheduledLocalNotifications((rn) => {
            console.log(`SN --- ${rn}`)
        })
    }

    public scheduleNotification = () => {
        PushNotification.localNotificationSchedule({
            channelId: 'pichichiz',
            title: '🛎️ Reminders !',
            message: 'test notification',
            date: new Date(),
        })
    }

    public friendNotification = () => {
        PushNotification.localNotificationSchedule({
            channelId: 'pichichiz',
            title: '👥 Amis',
            message: `Vous avez reçu une nouvelle demande d'ami !`,
            date: new Date(),
        })
    }

    public duelNotification = () => {
        PushNotification.localNotificationSchedule({
            channelId: 'pichichiz',
            title: '🛡️ Duel',
            message: `À vous de jouer, jetez un œil à vos duels !`,
            date: new Date(),
        })
    }

    public bonusNotification = () => {
        PushNotification.localNotificationSchedule({
            channelId: 'pichichiz',
            title: '🎁 Bonus',
            message: `Vous avez gagnez un nouveau bonus !`,
            date: new Date(),
        })
    }

    public dailyNotification = () => {
        PushNotification.localNotificationSchedule({
            channelId: 'pichichiz',
            title: '🕹️ Jouons !',
            message: `Connectez-vous pour gagner des bonus gratuit!`,
            date: new Date(),
        })
    }
}

export default new Notifications()
