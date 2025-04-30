/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  type ForwardedRef,
  forwardRef,
  type HTMLAttributes,
  isValidElement,
  type ReactNode,
} from 'react';
import { Fragment } from 'react/jsx-runtime';
import { Button, type ButtonProps } from '../controls/Button';
import { CancelButton } from '../controls/CancelButton';
import { OkButton } from '../controls/OkButton';
import type { ActionMode } from '../core/RdState';
import { renderContent } from '../utils/helpers';
import { cls } from '../utils/string';
import type { AnyComponentType, NotificationType } from '../utils/types';
import { Body, DialogContainer, Header, NotificationIcon } from './components';
import { DialogCloseButton } from './DialogCloseButton';
import { Footer } from './Footer';

export const Dialog = forwardRef(function Dialog(
  {
    actionMode,
    body,
    buttons,
    children,
    className,
    classNames = {},
    close,
    component,
    content = children,
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
    headerEl = <Header className={classNames?.header}>{title}</Header>;
  }
  let bodyEl = body;
  if (body === undefined && content) {
    bodyEl = (
      <Body className={classNames?.body}>
        {renderContent(content, { processArray: content !== children })}
      </Body>
    );
  }

  const iconEl =
    icon || (type && <NotificationIcon className={classNames?.icon} />);
  const iconWrap = iconEl ? (
    <div className={cls('rd-icon-wrap', classNames?.iconWrap)}>{iconEl}</div>
  ) : null;

  let footerEl = footer;
  if (footer === undefined && Array.isArray(buttons) && buttons.length > 0) {
    footerEl = (
      <Footer className={classNames?.footer}>
        {buttons.map((button, i) => renderButton(button, i))}
      </Footer>
    );
  }

  const cssClass = cls(className, type ? `rd-${type}` : undefined);

  if (empty) {
    return (
      <DialogContainer className={cssClass} ref={ref} {...props}>
        {firstChild}
        {closeEl}
        {content}
        {lastChild}
      </DialogContainer>
    );
  }

  return (
    <DialogContainer className={cssClass} ref={ref} {...props}>
      {firstChild}
      {iconWrap}
      {closeEl}
      {headerEl}
      {bodyEl}
      {footerEl}
      {lastChild}
    </DialogContainer>
  );
});

function renderButton(button: DialogButton, key: number) {
  if (typeof button === 'string') {
    const value = button.toLowerCase();
    if (value === 'cancel') {
      return <CancelButton key={key}>{button}</CancelButton>;
    }

    if (value === 'ok') {
      return <OkButton key={key}>{button}</OkButton>;
    }

    return (
      <Button key={key} value={value}>
        {button}
      </Button>
    );
  }

  if (typeof button === 'object' && !isValidElement(button)) {
    return <Button key={key} {...(button as ButtonProps)} />;
  }

  return <Fragment key={key}>{button}</Fragment>;
}

export interface DialogProps<P = any>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'content'> {
  actionMode?: ActionMode;
  body?: ReactNode;
  buttons?: DialogButton[];
  classNames?: Partial<Record<DialogSlots, string>>;
  close?: ReactNode;
  component?: AnyComponentType<P>;
  content?: ReactNode;
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

export type DialogSlots = 'body' | 'footer' | 'header' | 'icon' | 'iconWrap';
export type DialogButton = ReactNode | ButtonProps;
