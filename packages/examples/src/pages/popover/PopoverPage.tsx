import { PlacementSample } from './samples/PlacementSample';
import { PopoverSample } from './samples/PopoverSample';
import { ScrollSample } from './samples/ScrollSample';
import { TooltipSample } from './samples/TooltipSample';

export default function PopoverPage() {
  return (
    <>
      <h1>Popover components</h1>

      <h2>Tooltip</h2>

      <h3>Basic</h3>
      <TooltipSample />

      <h3>Placement</h3>
      <PlacementSample />

      <h3>Scroll</h3>
      <ScrollSample />

      <h2>Popover</h2>
      <PopoverSample />
    </>
  );
}
