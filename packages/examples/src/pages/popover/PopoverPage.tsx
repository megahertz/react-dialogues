import { ComplexTargetsSample } from './samples/ComplexTargetsSample';
import { PlacementSample } from './samples/PlacementSample';
import { PopoverSample } from './samples/PopoverSample';
import { ScrollSample } from './samples/ScrollSample';
import { TooltipSample } from './samples/TooltipSample';

export default function PopoverPage() {
  return (
    <>
      <h1>Popover components</h1>

      <h2>Basic</h2>
      <TooltipSample />

      <h2>Placement</h2>
      <PlacementSample />

      <h2>Scroll</h2>
      <ScrollSample />

      <h2>Popover</h2>
      <PopoverSample />

      <h2>Complex targets</h2>
      <ComplexTargetsSample />
    </>
  );
}
