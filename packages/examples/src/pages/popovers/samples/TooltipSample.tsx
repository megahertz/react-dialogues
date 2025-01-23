import { Button, Footer, Tooltip } from 'react-dialogues';

export function TooltipSample() {
  return (
    <>
      <Footer align="left">
        <Tooltip content="Button tooltip">
          <Button>Hover me</Button>
        </Tooltip>
        <Tooltip content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.">
          <Button>Large text</Button>
        </Tooltip>
        <Tooltip content="Green" color="#080">
          <Button>Colored</Button>
        </Tooltip>
        <Tooltip
          content="Animated"
          style={{ animation: 'rd-opacity .6s ease-in' }}
        >
          <Button>Animated</Button>
        </Tooltip>
        <Tooltip disabled>
          <Button>Disabled</Button>
        </Tooltip>
      </Footer>

      <Footer align="left">
        <Tooltip content="Tooltip" placement="top-start">
          <Button style={{ width: 200 }}>Long target width</Button>
        </Tooltip>
      </Footer>
      <Footer align="left">
        <Tooltip content="Tooltip" placement="right-start">
          <Button style={{ height: 100 }}>Long</Button>
        </Tooltip>
      </Footer>
    </>
  );
}
