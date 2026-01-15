import {
  Button,
  Modal,
  OkButton,
  Toast,
  useRdController,
} from 'react-dialogues';
import { type ChangeEvent, useEffect, useState } from 'react';

function ColorPicker() {
  const controller = useRdController();
  const [color, setColor] = useState('#3b82f6');

  useEffect(() => {
    controller.setResult(color);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setColor(e.target.value);
    controller.setResult(e.target.value);
  }

  return (
    <Modal title="Pick a Color" buttons={['Cancel', 'OK']}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <input type="color" value={color} onChange={handleChange} />
        <span>{color}</span>
      </div>
    </Modal>
  );
}

export function ModalShowCustomSample() {
  async function handleClick() {
    const [action, color] = await Modal.showCustom(ColorPicker);
    if (action === 'ok') {
      Toast.info(`Selected color: ${color}`);
    }
  }

  return <Button onClick={handleClick}>Pick Color</Button>;
}
