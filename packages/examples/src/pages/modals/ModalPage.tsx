import { ModalCustomComponentSample } from './samples/ModalCustomComponentSample';
import { ModalMultipleSample } from './samples/ModalMultipleSample';
import { ModalSizesAndPositionSample } from './samples/ModalSizesAndPositionSample';
import { ModalNotificationTypesSample } from './samples/ModalNotificationTypesSample';
import { ModalStaticMethods } from './samples/ModalStaticMethods';

export default function ModalPage() {
  return (
    <>
      <h1>Modals</h1>

      <h2>Static methods</h2>
      <ModalStaticMethods />

      <h2>Sizes</h2>
      <ModalSizesAndPositionSample />

      <h2>Notification types</h2>
      <ModalNotificationTypesSample />

      <h2>Multiple Modals</h2>
      <ModalMultipleSample />

      <h2>Custom component</h2>
      <ModalCustomComponentSample />
    </>
  );
}
