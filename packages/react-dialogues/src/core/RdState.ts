import type { DialogProps } from '../dialog/Dialog';
import type { AnyComponentType } from '../utils/types';

const OK_ACTIONS = ['keyEnter', 'ok'];
const CLOSE_ACTIONS = [
  'cancel',
  'close',
  'closeOthers',
  'destroyAll',
  'keyEscape',
  'mask',
];

export default class RdState {
  controllers: RdController[] = [];

  private readonly changeListeners: Array<(state: RdState) => void> = [];
  private lastControllerId = 0;

  constructor({
    controllers = [],
    lastControllerId = 0,
  }: {
    controllers?: RdController[];
    lastControllerId?: number;
  } = {}) {
    this.controllers = controllers;
    this.lastControllerId = lastControllerId;

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  add<
    TProps extends DialogProps = DialogProps,
    TResult extends [string, unknown] = [string, unknown],
  >(elementInitOptions: RdControllerInit<TProps>) {
    this.lastControllerId += 1;
    const id = elementInitOptions.id || this.lastControllerId.toString();

    let resolve: (result: TResult) => void;
    const promise = new Promise<TResult>((r) => {
      resolve = r;
    });

    const controller = {
      ...elementInitOptions,
      destroyed: false,
      id: this.lastControllerId.toString(),
      result: undefined,
      then: promise.then.bind(promise),
      catch: promise.catch.bind(promise),

      destroy: (action: TResult[0], result: TResult[1] = controller.result) => {
        controller.destroyed = true;
        this.remove(id);

        resolve([
          transformAction(action, controller.actionMode),
          result,
        ] as TResult);
        controller.props.onClose?.([action, result]);
      },

      setResult: (result: TResult[1]) => {
        controller.result = result;
      },

      update: (data: Partial<TProps> | ((old: TProps) => Partial<TProps>)) => {
        if (typeof data === 'function') {
          controller.props = { ...(data(controller.props) as TProps) };
        } else {
          controller.props = { ...controller.props, ...data };
        }
        this.emitOnChange();
      },
    } as RdController<TProps, TResult>;

    this.controllers.push(controller as unknown as RdController);

    this.emitOnChange();

    return controller;
  }

  destroyAll() {
    this.controllers.forEach((controller) => controller.destroy('destroyAll'));
  }

  getControllersByType(type: ControllerType) {
    return this.controllers.filter((c) => c.controllerType === type);
  }

  onChange(listener: (state: RdState) => void) {
    this.changeListeners.push(listener);
  }

  remove(id: string) {
    this.controllers = this.controllers.filter((element) => element.id !== id);
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

export interface RdControllerInit<TProps = DialogProps> {
  actionMode: ActionMode;
  id?: string;
  component: AnyComponentType;
  props?: TProps;
  controllerType: ControllerType;
}

export interface RdController<
  TProps = DialogProps,
  TResult extends [string, unknown] = [string, unknown],
> extends RdControllerInit<TProps>,
    Promise<TResult> {
  destroyed: boolean;
  id: string;
  result: TResult[1];
  destroy: (action: TResult[0], result?: TResult[1]) => void;
  update: (data: Partial<TProps> | ((old: TProps) => Partial<TProps>)) => void;
  props: TProps;
  setResult: (result: TResult[1]) => void;
}

export type ControllerType = 'modal' | 'notification' | 'popover';

export type ActionMode = 'okClose' | 'simplified' | 'full';
