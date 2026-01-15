import { Footer, Spinner } from 'react-dialogues';

export function SpinnerSample() {
  return (
    <Footer align="left">
      <Spinner size={24} />
      <Spinner size={24} bgColor="" />
      <Spinner size={24} bgColor="rgba(0,0,0,.05)" color="#52c41a" />
      <Spinner size={24} thickness={8} />
      <Spinner size={24} speed="3s" />
    </Footer>
  );
}
