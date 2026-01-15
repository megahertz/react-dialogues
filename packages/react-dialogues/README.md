# react-dialogues

[![Tests](https://github.com/megahertz/react-dialogues/workflows/Tests/badge.svg)](https://github.com/megahertz/react-dialogues/actions?query=workflow%3ATests)
[![npm version](https://img.shields.io/npm/v/react-dialogues?color=brightgreen)](https://www.npmjs.com/package/react-dialogues)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-dialogues.svg?color=rgb%2868%2C%20204%2C%2017%29)](https://bundlephobia.com/result?p=react-dialogues)

Lightweight React library for modals, toasts, and popovers with an imperative
API.

## Installation

```bash
npm install react-dialogues
```

## Modal

Show dialogs with a single function call. Get user responses via Promises.

```tsx
import { Button, Modal, Toast } from 'react-dialogues';

// Basic modal
Modal.show('Hello!', { title: 'Welcome' });

// Async/await for user response
const [action] = await Modal.show({
  title: 'Unsaved Changes',
  content: 'Save before closing?',
  buttons: [
    'Cancel',
    <Button value="discard" type="secondary">
      Discard
    </Button>,
    <Button value="save">Save</Button>,
  ],
});

if (action === 'save') {
  Toast.success('Changes saved!');
}

// Notification types
Modal.info({ title: 'Info', content: '...' });
Modal.success({ title: 'Success', content: '...' });
Modal.warning({ title: 'Warning', content: '...' });
Modal.error({ title: 'Error', content: '...' });

// Prompt for input
const [action, value] = await Modal.prompt({
  title: 'Enter your name',
  label: 'Name',
});
```

## Toast

Display notifications with auto-dismiss, progress bars, and placements.

```tsx
import { Toast } from 'react-dialogues';

// Notification types
Toast.show('Hello!');
Toast.success('Operation completed!');
Toast.error('Something went wrong');
Toast.warning('Please check your input');
Toast.info('Did you know?');

// With options
Toast.show({
  title: 'Upload Complete',
  content: 'Your file has been uploaded.',
  placement: 'topRight',
  duration: 3000,
});
```

## Tooltip & Popover

Add contextual hints with tooltips or rich content with popovers.

```tsx
import { Tooltip, Popover, Button } from 'react-dialogues';

// Tooltip on hover
<Tooltip content="Helpful hint">
  <Button>Hover me</Button>
</Tooltip>

// Tooltip with placement
<Tooltip content="Bottom tooltip" placement="bottom">
  <Button>Bottom</Button>
</Tooltip>

// Click trigger
<Tooltip content="Click triggered" triggers={['click']}>
  <Button>Click me</Button>
</Tooltip>

// Popover with rich content
<Popover
  content={<Dialog title="Edit" buttons={['Cancel', 'Save']}>...</Dialog>}
  triggers={['click']}
>
  <Button>Open Popover</Button>
</Popover>
```

## Features

- **Imperative API** - Call `Modal.show()`, `Toast.show()` directly without JSX
- **Promise-based** - Await user responses with
  `const [action] = await Modal.show(...)`
- **Lightweight** - Small bundle size, minimal dependencies
- **Customizable** - Full control over content, styling, and behavior
- **TypeScript** - Full type definitions included

## License

MIT
