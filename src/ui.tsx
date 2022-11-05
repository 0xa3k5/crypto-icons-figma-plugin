import "!prismjs/themes/prism.css";

import icons from "../icon-paths.json";
import {
  Button,
  Stack,
  Container,
  RadioButtons,
  render,
  SelectableItem,
  Text,
  Textbox,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import CryptoIcon from "./components/CryptoIcon";

import styles from "./styles.css";
import { CreateSvgFrame, ICryptoIcon } from "./types";

function Plugin() {
  const [shownIcons, setShownIcons] = useState<ICryptoIcon[]>(
    icons.slice(0, 20)
  );

  const [state, setState] = useState<ICryptoIcon>(icons[0]);

  const handleCreateSvg = useCallback(
    function() {
      emit<CreateSvgFrame>("CREATE_SVG_FRAME", state);
    },
    [state]
  );

  return (
    <Container space="medium">
      <Text>Hello there</Text>
      <VerticalSpace space="large" />
      {shownIcons.map((i: ICryptoIcon) => {
        return (
          <div
            style={{
              display: "grid",
            }}
          >
            <Stack space="large" style={{ backgroundColor: "#000" }}>
              <button onClick={() => setState(i)}>
                <CryptoIcon icon={i} />
              </button>
            </Stack>
          </div>
        );
      })}
      <Button fullWidth onClick={handleCreateSvg}>
        Create
      </Button>

      <VerticalSpace space="large" />
      <VerticalSpace space="small" />
    </Container>
  );
}

export default render(Plugin);
