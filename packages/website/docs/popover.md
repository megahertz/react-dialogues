# Popover

### Integrate Floating UI

This library uses a pretty simple and small algorithm that positions the popover
relative to the target element. However, if you need more advanced positioning,
you can replace it with the Floating UI or any other library.

```typescript
import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { Popover, type PositionOptions } from 'react-dialogues';

Popover.defaults.positionFn = floatingUiPositionFn;

export function floatingUiPositionFn(props: PositionOptions) {
  for (const scrollable of props.getScrollableParents(props.targetEl)) {
    scrollable.addEventListener('scroll', () => positionFloat(props), {
      passive: true,
    });
  }

  positionFloat(props);

  function positionFloat({
    arrowEl,
    floatEl,
    offset: offsetProp,
    placement,
    targetEl,
  }: PositionOptions) {
    computePosition(targetEl, floatEl, {
      placement,
      middleware: [
        offset(offsetProp + 5),
        flip(),
        shift({ padding: 5 }),
        arrowEl && arrow({ element: arrowEl, padding: 5 }),
      ].filter(Boolean),
    }).then(({ x, y, middlewareData }) => {
      Object.assign(floatEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
      if (arrowEl) {
        const originalSide = placement.split('-')[0];
        const newSide = middlewareData.offset?.placement.split('-')[0];
        if (newSide && originalSide !== newSide) {
          arrowEl.classList.replace(
            `rd-float-arrow-${originalSide}`,
            `rd-float-arrow-${newSide}`,
          );
        }

        Object.assign(arrowEl.style, {
          left: `${middlewareData.arrow!.x}px`,
          top: `${middlewareData.arrow!.y}px`,
        });
      }
    });
  }
}
```
