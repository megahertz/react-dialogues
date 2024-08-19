import { ComponentType } from 'react';

export default class AmodalState {
  changeListeners: Array<(state: AmodalState) => void> = [];
  item: AmItem<object, unknown>[] = [];
  lastItemId = 0;

  constructor({
    items = [],
    lastItemId = 0,
  }: {
    items?: AmItem<object, unknown>[];
    lastItemId?: number;
  } = {}) {
    this.item = items;
    this.lastItemId = lastItemId;

    this.add = this.add.bind(this);
    this.clone = this.clone.bind(this);
    this.remove = this.remove.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  add<TProps = object, TResult = unknown>(
    elementInitOptions: AmItemInit<TProps>,
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
      close: (result: TResult) => {
        this.remove(id);
        resolve(result);
        console.log('close', result);
      },
      then: promise.then.bind(promise),
    } as AmItem<TProps, TResult>;

    this.item.push(element as AmItem);

    this.emitOnChange();

    return element;
  }

  clone() {
    return new AmodalState({
      items: this.item.slice(),
      lastItemId: this.lastItemId,
    });
  }

  getItemsByType(type: ElementType) {
    return this.item.filter((element) => element.type === type);
  }

  onChange(listener: (state: AmodalState) => void) {
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

export interface AmItemInit<TProps = object> {
  id?: string;
  component: ComponentType;
  props?: TProps;
  type: ElementType;
}

export interface AmItem<TProps = object, TResult = unknown>
  extends AmItemInit<TProps>,
    PromiseLike<TResult> {
  id: string;
  close: (result?: TResult) => void;
  props: TProps;
}

export type ElementType = 'modal' | 'notification';
