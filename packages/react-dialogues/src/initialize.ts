import { Button } from './controls/Button';
import { Toast } from './toast/Toast';

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

  Toast.error({ children: message });
};
