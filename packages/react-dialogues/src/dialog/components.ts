import { HTMLAttributes } from 'react';
import { createDivComponent } from '../utils/constructors';

export const Body = createDivComponent('body');
export const DialogContainer = createDivComponent('dialog');
export const Header = createDivComponent('header');
export const NotificationIcon = createDivComponent('notification-icon');
export const Title = createDivComponent('title');

export type BodyProps = HTMLAttributes<HTMLDivElement>;
export type DialogContainerProps = HTMLAttributes<HTMLDivElement>;
export type HeaderProps = HTMLAttributes<HTMLDivElement>;
export type NotificationIconProps = HTMLAttributes<HTMLDivElement>;
export type TitleProps = HTMLAttributes<HTMLDivElement>;
