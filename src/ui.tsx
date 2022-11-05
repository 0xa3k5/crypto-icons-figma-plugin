import "!prismjs/themes/prism.css";

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
  SearchTextbox,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState, useEffect } from "preact/hooks";
import CryptoIcon from "./components/CryptoIcon";

import styles from "./styles.css";
import icons from "../icon-paths.json";
import { CreateSvgFrame, ICryptoIcon } from "./types";

function Plugin() {
  const [shownIcons, setShownIcons] = useState<ICryptoIcon[] | null>(
    icons.slice(0, 20)
  );
  const [searchValue, setSearchValue] = useState("");

  const [selectedIcon, setSelectedIcon] = useState<ICryptoIcon>(icons[0]);

  const handleCreateSvg = useCallback(
    function() {
      emit<CreateSvgFrame>("CREATE_SVG_FRAME", selectedIcon);
    },
    [selectedIcon]
  );

  const handleSearch = (input: string) => {
    setSearchValue(input);

    const filteredIcons = icons.filter((icon: ICryptoIcon) => {
      return (
        icon.name.toLowerCase().includes(input) ||
        icon.symbol.toLowerCase().includes(input)
      );
    });

    setShownIcons(filteredIcons);
  };

  return (
    <Container space="medium">
      <Text>Hello there</Text>
      <VerticalSpace space="large" />
      <SearchTextbox
        value={searchValue}
        placeholder="search"
        onValueInput={(input) => handleSearch(input.toLowerCase())}
      />
      {shownIcons &&
        shownIcons.map((i: ICryptoIcon) => {
          return (
            <div
              style={{
                display: "grid",
              }}
            >
              <Stack space="large" style={{ backgroundColor: "#000" }}>
                <button onClick={() => setSelectedIcon(i)}>
                  <CryptoIcon icon={i} />
                  {i.name}
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
