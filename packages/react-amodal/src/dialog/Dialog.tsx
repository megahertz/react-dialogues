import type { HTMLAttributes, ReactNode } from 'react';
import './styles.css';
import { Button } from '../controls/Button';
import { Body, DialogContainer, Header } from './components';
import { DialogCloseButton } from './DialogCloseButton';
import { Footer } from './Footer';

export function Dialog({
  body,
  buttons,
  close,
  children = null,
  footer,
  header,
  title = null,
  ...props
}: DialogProps) {
  const closeEl = close !== undefined ? close : <DialogCloseButton />;
  const headerEl = header !== undefined ? header : <Header>{title}</Header>;
  const bodyEl = body !== undefined ? body : <Body>{children}</Body>;

  let footerEl = null;
  if (footer === undefined) {
    if (Array.isArray(buttons) && buttons.length > 0) {
      footerEl = <Footer>{buttons}</Footer>;
    } else {
      footerEl = (
        <Footer>
          <Button>OK</Button>
        </Footer>
      );
    }
  }

  return (
    <DialogContainer {...props}>
      {closeEl}
      {headerEl}
      {bodyEl}
      {footerEl}
    </DialogContainer>
  );
}

export interface DialogProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  body?: ReactNode;
  buttons?: ReactNode[];
  close?: ReactNode;
  footer?: ReactNode;
  header?: ReactNode;
  title?: ReactNode;
}
