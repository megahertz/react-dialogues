import { CustomComponentSample } from './samples/CustomComponentSample';
import { MultipleSample } from './samples/MultipleSample';
import { SizesAndPositionSample } from './samples/SizesAndPositionSample';
import { NotificationTypesSample } from './samples/NotificationTypesSample';
import { ModalShowSample } from './samples/ModalShowSample';

export default function ModalPage() {
  return (
    <>
      <h1>Modals</h1>

      <h2>Show a modal through Modal.show</h2>
      <ModalShowSample />

      <h2>Sizes</h2>
      <SizesAndPositionSample />

      <h2>Notification types</h2>
      <NotificationTypesSample />

      <h2>Multiple Modals</h2>
      <MultipleSample />

      <h2>Custom component</h2>
      <CustomComponentSample />
    </>
  );
}
