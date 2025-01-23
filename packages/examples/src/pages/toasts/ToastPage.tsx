import { ToastCustomComponentSample } from './samples/ToastCustomComponentSample';
import { ToastTypesSample } from './samples/ToastTypesSample';
import { ToastItemMethodsSample } from './samples/ToastItemMethodsSample';
import { ToastShowSample } from './samples/ToastShowSample';

export default function ToastPage() {
  return (
    <>
      <h1>Toasts</h1>

      <h2>Show toast through Toast.show</h2>
      <ToastShowSample />

      <h2>Control toast instance</h2>
      <ToastItemMethodsSample />

      <h2>Toast types</h2>
      <ToastTypesSample />

      <h2>Custom component</h2>
      <ToastCustomComponentSample />
    </>
  );
}
