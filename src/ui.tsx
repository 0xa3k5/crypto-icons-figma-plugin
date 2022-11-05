import {
  Button,
  Container,
  render,
  Text,
  VerticalSpace,
  SearchTextbox,
  Divider,
  Toggle,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";

import styles from "./styles.css";
import icons from "../icon-paths.json";
import { CreateSvgFrame, ICryptoIcon, CreateAll } from "./types";
import CryptoIconCard from "./components/CryptoIconCard";

function Plugin() {
  const [shownIcons, setShownIcons] = useState<ICryptoIcon[] | null>(
    icons.slice(0, 100)
  );
  const [searchValue, setSearchValue] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<ICryptoIcon>(icons[0]);
  const [asComponent, setAsComponent] = useState(true);

  const handleCreateSvg = useCallback(() => {
    emit<CreateSvgFrame>("CREATE_SVG_FRAME", selectedIcon, asComponent);
  }, [selectedIcon, asComponent]);
  const handleCreateAll = useCallback(() => {
    emit<CreateAll>("CREATE_ALL", icons, asComponent);
  }, [asComponent]);

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
    <div>
      <SearchTextbox
        value={searchValue}
        placeholder="search"
        onValueInput={(input) => handleSearch(input.toLowerCase())}
      />
      <Divider />
      <VerticalSpace space="large" />
      <Container space="large" style={{ marginBottom: 40 }}>
        {shownIcons && (
          <div class={styles["icon-card-wrapper"]}>
            {shownIcons.map((i: ICryptoIcon) => {
              return (
                <CryptoIconCard
                  icon={i}
                  isSelected={selectedIcon === i}
                  setSelectedIcon={setSelectedIcon}
                />
              );
            })}
          </div>
        )}
      </Container>
      <VerticalSpace space="large" />
      <div class={styles.footer}>
        <Toggle
          value={asComponent}
          onChange={() => setAsComponent(!asComponent)}
          // onChange={(event) => setAsComponent(event.currentTarget.checked)}
        >
          <Text>As Components</Text>
        </Toggle>
        <div class={styles["button-group"]}>
          <Button secondary fullWidth onClick={handleCreateAll}>
            Create All
          </Button>
          <Button fullWidth onClick={handleCreateSvg}>
            Create Selected
          </Button>
        </div>
      </div>
    </div>
  );
}

export default render(Plugin);
