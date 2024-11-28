/* eslint-disable no-param-reassign,default-case,consistent-return */

/**
 * Inspired by https://www.youtube.com/watch?v=tBn0lVUzUbA
 */

import type { Placement, PositionOptions } from './Popover';

export default function defaultPositionFn(props: PositionOptions) {
  for (const scrollable of props.getScrollableParents(props.targetEl)) {
    scrollable.addEventListener('scroll', () => positionFloat(props), {
      passive: true,
    });
  }

  positionFloat(props);
}

function positionFloat({
  arrowEl,
  floatEl,
  offset,
  placement,
  targetEl,
}: PositionOptions) {
  let finalPlacement = placement;

  const viewport = getViewport();
  const target = getElementRect(targetEl);
  const float = getElementRect(floatEl);

  calculatePosition(float, target, placement, offset);

  // flip if needed
  const opposite = getOppositePosition(placement);
  if (!fits(float, viewport, placement) && fits(float, viewport, opposite)) {
    finalPlacement = opposite;
    calculatePosition(float, target, finalPlacement, offset);
  }

  if (arrowEl) {
    const [side] = finalPlacement.split('-');
    arrowEl.className = arrowEl.className.replace(
      /rd-float-arrow-\w+/,
      `rd-float-arrow-${side}`,
    );

    const arrow = getElementRect(arrowEl);
    calculateArrowPosition(arrow, float, target, finalPlacement);

    Object.assign(arrowEl.style, {
      left: arrow.left ? `${arrow.left}px` : undefined,
      top: arrow.top ? `${arrow.top}px` : undefined,
    });
  }

  Object.assign(floatEl.style, {
    left: `${float.left}px`,
    top: `${float.top}px`,
  });
}

function getElementRect(element: Element): Rect {
  const rect = element.getBoundingClientRect();
  const { width, height } = rect;

  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    width,
    height,
    get right() {
      return this.left + this.width;
    },
    get bottom() {
      return this.top + this.height;
    },
  };
}

function getViewport(): Rect {
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  return {
    top: window.scrollY,
    left: window.scrollX,
    right: width,
    bottom: height,
    width,
    height,
  };
}

function calculatePosition(
  float: Rect,
  target: Rect,
  placement: Placement,
  offset: number,
) {
  let x;
  let y;

  const offsetValue = 5 + offset;

  switch (placement) {
    case 'top-start':
    case 'bottom-start':
      x = target.left;
      break;
    case 'top':
    case 'bottom':
      x = target.left + target.width / 2 - float.width / 2;
      break;
    case 'top-end':
    case 'bottom-end':
      x = target.right - float.width;
      break;
    case 'left':
    case 'left-start':
    case 'left-end':
      x = target.left - float.width - offsetValue;
      break;
    case 'right':
    case 'right-start':
    case 'right-end':
      x = target.right + offsetValue;
      break;
  }

  switch (placement) {
    case 'left-start':
    case 'right-start':
      y = target.top;
      break;
    case 'left':
    case 'right':
      y = target.top + target.height / 2 - float.height / 2;
      break;
    case 'left-end':
    case 'right-end':
      y = target.bottom - float.height;
      break;
    case 'top':
    case 'top-start':
    case 'top-end':
      y = target.top - float.height - offsetValue;
      break;
    case 'bottom':
    case 'bottom-start':
    case 'bottom-end':
      y = target.bottom + offsetValue;
      break;
  }

  float.left = x;
  float.top = y;
}

function calculateArrowPosition(
  arrow: Rect,
  float: Rect,
  target: Rect,
  placement: Placement,
) {
  const padding = 5;

  switch (placement.split('-')[0]) {
    case 'top':
    case 'bottom': {
      const left =
        target.left + target.width / 2 - arrow.width / 2 - float.left;
      arrow.left = Math.max(
        padding,
        Math.min(float.width - arrow.width - padding, left),
      );
      arrow.top = 0;
      break;
    }
    case 'left':
    case 'right': {
      arrow.left = 0;
      const top = target.top + target.height / 2 - arrow.height / 2 - float.top;
      arrow.top = Math.max(
        padding,
        Math.min(float.height - arrow.height - padding, top),
      );
      break;
    }
  }
}

function getOppositePosition(placement: Placement) {
  const [side] = placement.split('-');

  const map: Record<string, string> = {
    bottom: 'top',
    left: 'right',
    right: 'left',
    top: 'bottom',
  };

  return placement.replace(side, map[side]) as Placement;
}

function fits(rect: Rect, viewport: Rect, placement: Placement) {
  switch (placement.split('-')[0]) {
    case 'top':
      return rect.top >= viewport.top;
    case 'bottom':
      return rect.bottom <= viewport.bottom;
    case 'left':
      return rect.left >= viewport.left;
    case 'right':
      return rect.right <= viewport.right;
  }
}

interface Size {
  height: number;
  width: number;
}

interface Rect extends Size {
  bottom: number;
  left: number;
  right: number;
  top: number;
}
