import { ButtonsSample } from './samples/ButtonsSample';
import { SpinnersSample } from './samples/SpinnersSample';
import { ThemeSample } from './samples/ThemeSample';

export default function OtherPage() {
  return (
    <>
      <h1>Other components</h1>

      <h2>Buttons</h2>
      <ButtonsSample />

      <h2>Spinners</h2>
      <SpinnersSample />

      <h2>Theme</h2>
      <ThemeSample />
    </>
  );
}
