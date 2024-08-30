import React, {
  type ComponentType,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  ReactNode,
} from 'react';
import './styles.css';
import { cls } from '../utils/string';
import { NotificationType } from '../utils/types';
import { Body, DialogContainer, Header, NotificationIcon } from './components';
import { DialogCloseButton } from './DialogCloseButton';
import { Footer } from './Footer';

export const Dialog = forwardRef(function Dialog(
  {
    body,
    buttons,
    children,
    className,
    close,
    component,
    empty = false,
    firstChild,
    footer,
    header,
    icon,
    lastChild,
    onClose,
    title,
    type,
    ...props
  }: DialogProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const closeEl = close !== undefined ? close : <DialogCloseButton />;

  let headerEl = header;
  if (header === undefined && title) {
    headerEl = <Header>{title}</Header>;
  }
  let bodyEl = body;
  if (body === undefined && children) {
    bodyEl = <Body>{children}</Body>;
  }

  let headerAndBodyEl = (
    <>
      {headerEl}
      {bodyEl}
    </>
  );

  const iconEl = icon || (type && <NotificationIcon />);
  if (iconEl) {
    headerAndBodyEl = (
      <div className="rd-iconbox">
        {iconEl}
        <div className="rd-aftericon">{headerAndBodyEl}</div>
      </div>
    );
  }

  let footerEl = footer;
  if (footer === undefined && Array.isArray(buttons) && buttons.length > 0) {
    footerEl = <Footer>{buttons}</Footer>;
  }

  const cssClass = cls(className, type ? `rd-${type}` : undefined);

  if (empty) {
    return (
      <DialogContainer className={cssClass} ref={ref} {...props}>
        {firstChild}
        {closeEl}
        {children}
        {lastChild}
      </DialogContainer>
    );
  }

  return (
    <DialogContainer className={cssClass} ref={ref} {...props}>
      {firstChild}
      {closeEl}
      {headerAndBodyEl}
      {footerEl}
      {lastChild}
    </DialogContainer>
  );
});

export interface DialogProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  body?: ReactNode;
  buttons?: ReactNode[];
  close?: ReactNode;
  component?: ComponentType;
  empty?: boolean;
  firstChild?: ReactNode;
  footer?: ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
  lastChild?: ReactNode;
  onClose?: (result: unknown) => void;
  title?: ReactNode;
  type?: NotificationType;
}
