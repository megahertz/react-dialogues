import type { DialogProps } from '../dialog/Dialog';
import { AnyComponentType } from '../utils/types';

export default class RdState {
  items: RdItem[] = [];

  private readonly changeListeners: Array<(state: RdState) => void> = [];
  private lastItemId = 0;

  constructor({
    items = [],
    lastItemId = 0,
  }: {
    items?: RdItem[];
    lastItemId?: number;
  } = {}) {
    this.items = items;
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
      catch: promise.catch.bind(promise),

      destroy: (result: TResult) => {
        this.remove(id);
        resolve(result);
        element.props.onClose?.(result);
      },

      update: (data: Partial<TProps> | ((old: TProps) => Partial<TProps>)) => {
        if (typeof data === 'function') {
          element.props = { ...(data(element.props) as TProps) };
        } else {
          element.props = { ...element.props, ...data };
        }
        this.emitOnChange();
      },
    } as RdItem<TProps, TResult>;

    this.items.push(element as unknown as RdItem);

    this.emitOnChange();

    return element;
  }

  clone() {
    return new RdState({
      items: this.items.slice(),
      lastItemId: this.lastItemId,
    });
  }

  getItemsByType(type: ItemType) {
    return this.items.filter((element) => element.itemType === type);
  }

  onChange(listener: (state: RdState) => void) {
    this.changeListeners.push(listener);
  }

  remove(id: string) {
    this.items = this.items.filter((element) => element.id !== id);
    this.emitOnChange();
  }

  private emitOnChange() {
    this.changeListeners.forEach((listener) => listener(this));
  }
}

export interface RdItemInit<TProps = DialogProps> {
  id?: string;
  component: AnyComponentType;
  props?: TProps;
  itemType: ItemType;
}

export interface RdItem<TProps = DialogProps, TResult = unknown>
  extends RdItemInit<TProps>,
    Promise<TResult> {
  id: string;
  destroy: (result?: TResult) => void;
  update: (data: Partial<TProps> | ((old: TProps) => Partial<TProps>)) => void;
  props: TProps;
}

export type ItemType = 'modal' | 'notification';
