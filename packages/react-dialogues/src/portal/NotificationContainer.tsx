import { ItemContext } from '../core/itemContext';
import type { RdItem } from '../core/RdState';
import type {
  NotificationPlacement,
  NotificationProps,
} from '../notification/Notification';

export function NotificationContainer({
  items,
}: {
  items: RdItem<NotificationProps>[];
}) {
  if (items.length < 0) {
    return null;
  }

  const groups = groupByPlacement(items);
  return (
    <>
      {Object.entries(groups).map(([placement, grouped]) => (
        <div
          key={placement}
          className={`rd-notification-container ${placement}`}
        >
          {grouped.map((item) => {
            const { id, component: Component, props } = item;
            return (
              <ItemContext.Provider value={item} key={id}>
                <Component {...props} />
              </ItemContext.Provider>
            );
          })}
        </div>
      ))}
    </>
  );
}

function groupByPlacement(items: RdItem<NotificationProps>[]) {
  const placements = {} as Record<NotificationPlacement, RdItem[]>;
  for (const item of items) {
    const placement = item.props.placement!;
    if (!Array.isArray(placements[placement])) {
      placements[placement] = [];
    }

    placements[placement].push(item);
  }

  return placements;
}
