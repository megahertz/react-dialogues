import { Button } from './controls/Button';
import { Notification } from './notification/Notification';

Button.defaults.onErrorHandler = function onErrorHandler(
  error,
  message,
  { errorAction },
) {
  if (errorAction === 'console') {
    // eslint-disable-next-line no-console
    console.error('Error in button handler', error);
    return;
  }

  if (errorAction === 'none') {
    return;
  }

  Notification.error({ children: message });
};
