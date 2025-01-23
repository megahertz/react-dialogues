import type { RdController } from '../core/RdState';
import type { ToastPlacement, ToastProps } from '../toast/Toast';
import { UniversalContainer } from './UniversalContainer';

export function ToastContainer({
  controllers,
}: {
  controllers: RdController<ToastProps>[];
}) {
  if (controllers.length < 0) {
    return null;
  }

  const groups = groupByPlacement(controllers);
  return (
    <>
      {Object.entries(groups).map(([placement, grouped]) => (
        <div key={placement} className={`rd-toast-container ${placement}`}>
          <UniversalContainer controllers={grouped} />
        </div>
      ))}
    </>
  );
}

function groupByPlacement(items: RdController<ToastProps>[]) {
  const placements = {} as Record<ToastPlacement, RdController[]>;
  for (const item of items) {
    const placement = item.props.placement!;
    if (!Array.isArray(placements[placement])) {
      placements[placement] = [];
    }

    placements[placement].push(item);
  }

  return placements;
}
