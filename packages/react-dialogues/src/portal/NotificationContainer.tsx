import { ControllerContext } from '../core/controllerContext';
import type { RdController } from '../core/RdState';
import type {
  NotificationPlacement,
  NotificationProps,
} from '../notification/Notification';

export function NotificationContainer({
  controllers,
}: {
  controllers: RdController<NotificationProps>[];
}) {
  if (controllers.length < 0) {
    return null;
  }

  const groups = groupByPlacement(controllers);
  return (
    <>
      {Object.entries(groups).map(([placement, grouped]) => (
        <div
          key={placement}
          className={`rd-notification-container ${placement}`}
        >
          {grouped.map((controller) => {
            const { id, component: Component, props } = controller;
            return (
              <ControllerContext.Provider value={controller} key={id}>
                <Component {...props} />
              </ControllerContext.Provider>
            );
          })}
        </div>
      ))}
    </>
  );
}

function groupByPlacement(items: RdController<NotificationProps>[]) {
  const placements = {} as Record<NotificationPlacement, RdController[]>;
  for (const item of items) {
    const placement = item.props.placement!;
    if (!Array.isArray(placements[placement])) {
      placements[placement] = [];
    }

    placements[placement].push(item);
  }

  return placements;
}
