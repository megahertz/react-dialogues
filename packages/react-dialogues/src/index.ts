import './styles.css';
import { dialogues } from './core/dialogues';

export { CancelButton } from './controls/CancelButton';
export { Button, type ButtonProps } from './controls/Button';
export { OkButton } from './controls/OkButton';
export { TextField, type TextFieldProps } from './controls/TextField';
export { dialogues } from './core/dialogues';
export { ItemContext, useUiItem } from './core/itemContext';
export { type RdItem } from './core/RdState';
export { Body, Header, Title } from './dialog/components';
export { Dialog } from './dialog/Dialog';
export { Footer, type FooterProps } from './dialog/Footer';
export { Modal, type ModalProps } from './modal/Modal';
export {
  Notification,
  type NotificationProps,
} from './notification/Notification';
export { Portal } from './portal/Portal';
export * from './utils/types';

(window as unknown as Record<string, object>).dialogues = dialogues;
