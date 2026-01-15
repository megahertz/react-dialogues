import { Footer, Spinner } from 'react-dialogues';

export function SpinnerSizesSample() {
  return (
    <Footer align="left">
      <Spinner size={16} />
      <Spinner size={24} />
      <Spinner size={32} />
      <Spinner size={48} />
    </Footer>
  );
}
