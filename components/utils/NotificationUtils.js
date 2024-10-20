// notificationUtils.js
import notifee, { AndroidImportance } from '@notifee/react-native';

export const displayNotification = async () => {
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'Visitor-Request',
    name: 'Visitor Request',
    description: 'Visitor Request',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: 'Visitor Access',
    body: 'Visitor access',
    android: {
      channelId: channelId,
      smallIcon: 'ic_launcher',
      importance: AndroidImportance.HIGH,
      actions: [
        {
          title: 'Accept',
          pressAction: { id: 'acceptVisitor' },
        },
        {
          title: 'Decline',
          pressAction: { id: 'declineVisitor' },
        },
      ],
    },
  });
};
