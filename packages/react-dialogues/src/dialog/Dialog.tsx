/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  type ForwardedRef,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { Fragment } from 'react/jsx-runtime';
import { cls } from '../utils/string';
import { AnyComponentType, NotificationType } from '../utils/types';
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
    footerEl = (
      <Footer>
        {buttons.map((button, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={i}>{button}</Fragment>
        ))}
      </Footer>
    );
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

export interface DialogProps<P = any>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  body?: ReactNode;
  buttons?: ReactNode[];
  close?: ReactNode;
  component?: AnyComponentType<P>;
  element?: React.ReactNode;
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
