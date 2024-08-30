import { CustomComponentSample } from './samples/CustomComponentSample';
import { NotificationTypesSample } from './samples/NotificationTypesSample';
import { ItemMethodsSample } from './samples/ItemMethodsSample';
import { NotificationShowSample } from './samples/NotificationShowSample';

export default function NotificationPage() {
  return (
    <>
      <h1>Notifications</h1>

      <h2>Show notification through Notification.show</h2>
      <NotificationShowSample />

      <h2>Control notification instance</h2>
      <ItemMethodsSample />

      <h2>Notification types</h2>
      <NotificationTypesSample />

      <h2>Custom component</h2>
      <CustomComponentSample />
    </>
  );
}
