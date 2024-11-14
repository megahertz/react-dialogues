/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  type ForwardedRef,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { Fragment } from 'react/jsx-runtime';
import { Button } from '../controls/Button';
import { CancelButton } from '../controls/CancelButton';
import { OkButton } from '../controls/OkButton';
import { ActionMode } from '../core/RdState';
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
    classNames = {},
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
    headerEl = <Header className={classNames?.header}>{title}</Header>;
  }
  let bodyEl = body;
  if (body === undefined && children) {
    bodyEl = <Body className={classNames?.body}>{children}</Body>;
  }

  let headerAndBodyEl = (
    <>
      {headerEl}
      {bodyEl}
    </>
  );

  const iconEl =
    icon || (type && <NotificationIcon className={classNames?.icon} />);
  if (iconEl) {
    headerAndBodyEl = (
      <div className={cls('rd-iconbox', classNames?.iconBox)}>
        {iconEl}
        <div className={cls('rd-iconbox-content', classNames?.iconBoxContent)}>
          {headerAndBodyEl}
        </div>
      </div>
    );
  }

  let footerEl = footer;
  if (footer === undefined && Array.isArray(buttons) && buttons.length > 0) {
    footerEl = (
      <Footer className={classNames?.footer}>
        {buttons.map((button, i) => {
          const key = i;

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

          return <Fragment key={key}>{button}</Fragment>;
        })}
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
  actionMode?: ActionMode;
  body?: ReactNode;
  buttons?: ReactNode[];
  classNames?: Partial<Record<DialogSlots, string>>;
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

export type DialogSlots =
  | 'body'
  | 'footer'
  | 'header'
  | 'icon'
  | 'iconBox'
  | 'iconBoxContent';
