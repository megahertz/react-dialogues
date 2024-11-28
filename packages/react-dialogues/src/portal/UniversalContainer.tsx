import { ControllerContext } from '../core/controllerContext';
import type { RdController } from '../core/RdState';

export function UniversalContainer({
  controllers,
}: {
  controllers: RdController[];
}) {
  return (
    <>
      {controllers.map((controller) => {
        const { id, component: Component, props } = controller;

        return (
          <ControllerContext.Provider key={id} value={controller}>
            <Component {...props} />
          </ControllerContext.Provider>
        );
      })}
    </>
  );
}
