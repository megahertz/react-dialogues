import './styles.css';
import { amodal } from './core/amodal';

export { CancelButton } from './controls/CancelButton';
export { Button } from './controls/Button';
export { OkButton } from './controls/OkButton';
export { amodal } from './core/amodal';
export { Body, Header, Title } from './dialog/components';
export { Dialog } from './dialog/Dialog';
export { Footer, type FooterProps } from './dialog/Footer';
export { Modal } from './modal/Modal';

(window as unknown as Record<string, object>).amodal = amodal;
