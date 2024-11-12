import type { DialogProps } from '../dialog/Dialog';
import type { AnyComponentType } from '../utils/types';

const OK_ACTIONS = ['ok', 'enter'];
const CLOSE_ACTIONS = [
  'cancel',
  'close',
  'closeOthers',
  'destroyAll',
  'esc',
  'mask',
];

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

  add<
    TProps extends DialogProps = DialogProps,
    TResult extends [string, unknown] = [string, unknown],
  >(elementInitOptions: RdItemInit<TProps>) {
    this.lastItemId += 1;
    const id = elementInitOptions.id || this.lastItemId.toString();

    let resolve: (result: TResult) => void;
    const promise = new Promise<TResult>((r) => {
      resolve = r;
    });

    const element = {
      ...elementInitOptions,
      id: this.lastItemId.toString(),
      result: undefined,
      then: promise.then.bind(promise),
      catch: promise.catch.bind(promise),

      destroy: (action: TResult[0], result: TResult[1] = element.result) => {
        this.remove(id);

        resolve([
          transformAction(action, element.actionMode),
          result,
        ] as TResult);
        element.props.onClose?.([action, result]);
      },

      setResult: (result: TResult[1]) => {
        element.result = result;
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

function transformAction(action: string, mode: ActionMode): string {
  switch (mode) {
    case 'okClose': {
      return CLOSE_ACTIONS.includes(action) ? 'close' : 'ok';
    }

    case 'simplified': {
      if (OK_ACTIONS.includes(action)) {
        return 'ok';
      }

      if (CLOSE_ACTIONS.includes(action) || !action) {
        return 'close';
      }

      return action;
    }

    default: {
      return action;
    }
  }
}

export interface RdItemInit<TProps = DialogProps> {
  actionMode: ActionMode;
  id?: string;
  component: AnyComponentType;
  props?: TProps;
  itemType: ItemType;
}

export interface RdItem<
  TProps = DialogProps,
  TResult extends [string, unknown] = [string, unknown],
> extends RdItemInit<TProps>,
    Promise<TResult> {
  id: string;
  result: TResult[1];
  destroy: (action: TResult[0], result?: TResult[1]) => void;
  update: (data: Partial<TProps> | ((old: TProps) => Partial<TProps>)) => void;
  props: TProps;
  setResult: (result: TResult[1]) => void;
}

export type ItemType = 'modal' | 'notification';

export type ActionMode = 'okClose' | 'simplified' | 'full';
