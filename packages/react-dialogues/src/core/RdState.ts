import type { ComponentType } from 'react';
import type { DialogProps } from '../dialog/Dialog';

export default class RdState {
  changeListeners: Array<(state: RdState) => void> = [];
  item: RdItem[] = [];
  lastItemId = 0;

  constructor({
    items = [],
    lastItemId = 0,
  }: {
    items?: RdItem[];
    lastItemId?: number;
  } = {}) {
    this.item = items;
    this.lastItemId = lastItemId;

    this.add = this.add.bind(this);
    this.clone = this.clone.bind(this);
    this.remove = this.remove.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  add<TProps extends DialogProps = DialogProps, TResult = unknown>(
    elementInitOptions: RdItemInit<TProps>,
  ) {
    this.lastItemId += 1;
    const id = elementInitOptions.id || this.lastItemId.toString();

    let resolve: (result: TResult) => void;
    const promise = new Promise<TResult>((r) => {
      resolve = r;
    });

    const element = {
      ...elementInitOptions,
      id: this.lastItemId.toString(),
      then: promise.then.bind(promise),

      destroy: (result: TResult) => {
        this.remove(id);
        resolve(result);
        element.props.onClose?.(result);
      },

      update: (data: TProps | ((old: TProps) => TProps)) => {
        if (typeof data === 'function') {
          element.props = { ...data(element.props) };
        } else {
          element.props = { ...element.props, ...data };
        }
        this.emitOnChange();
      },
    } as RdItem<TProps, TResult>;

    this.item.push(element as unknown as RdItem);

    this.emitOnChange();

    return element;
  }

  clone() {
    return new RdState({
      items: this.item.slice(),
      lastItemId: this.lastItemId,
    });
  }

  getItemsByType(type: ItemType) {
    return this.item.filter((element) => element.type === type);
  }

  onChange(listener: (state: RdState) => void) {
    this.changeListeners.push(listener);
  }

  remove(id: string) {
    this.item = this.item.filter((element) => element.id !== id);
    this.emitOnChange();
  }

  private emitOnChange() {
    this.changeListeners.forEach((listener) => listener(this));
  }
}

export interface RdItemInit<TProps extends DialogProps = DialogProps> {
  id?: string;
  component: ComponentType;
  props?: TProps;
  type: ItemType;
}

export interface RdItem<
  TProps extends DialogProps = DialogProps,
  TResult = unknown,
> extends RdItemInit<TProps>,
    PromiseLike<TResult> {
  id: string;
  destroy: (result?: TResult) => void;
  update: (data: TProps | ((old: TProps) => TProps)) => void;
  props: TProps;
}

export type ItemType = 'modal' | 'notification';
