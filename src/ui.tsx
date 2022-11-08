import {
  Button,
  Container,
  render,
  Text,
  VerticalSpace,
  SearchTextbox,
  Divider,
  Toggle,
  Tabs,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState, useEffect } from "preact/hooks";

import { useCallback, useState } from "preact/hooks";
import styles from "./styles.css";
import icons from "../icon-paths.json";
import { CreateSvgFrame, ICryptoIcon, CreateAll } from "./types";
import CryptoIconCard from "./components/CryptoIconCard";
import IconContent from "./components/IconContent";

function Plugin() {
  const [variant, setVariant] = useState<"black" | "color" | "icon" | "white">(
    "color"
  );
  const [shownIcons, setShownIcons] = useState<ICryptoIcon[] | null>(
    icons.slice(0, 100)
  );
  const [searchValue, setSearchValue] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<ICryptoIcon>(icons[0]);
  const [asComponent, setAsComponent] = useState(true);

  const handleCreateSvg = useCallback(() => {
    emit<CreateSvgFrame>(
      "CREATE_SVG_FRAME",
      selectedIcon,
      asComponent,
      variant
    );
  }, [selectedIcon, asComponent, variant]);
  const handleCreateAll = useCallback(() => {
    emit<CreateAll>("CREATE_ALL", icons, asComponent, variant);
  }, [asComponent, variant]);

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

  const handleTabSwitch = (e: any) => {
    setVariant(e.target.value);
  };

  const displayShownIcons = () => {
    return (
      <div>
        <VerticalSpace space="large" />
        <div class={styles["icon-card-wrapper"]}>
          {shownIcons?.map((i: ICryptoIcon) => {
            return (
              <CryptoIconCard
                icon={i}
                variant={variant}
                isSelected={selectedIcon === i}
                setSelectedIcon={setSelectedIcon}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const tabOptions = [
    {
      children: (
        <IconContent
          variant={variant}
          shownIcons={shownIcons}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
      ),
      value: "color",
    },
    {
      children: (
        <IconContent
          variant={variant}
          shownIcons={shownIcons}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
      ),
      value: "black",
    },
    {
      children: (
        <IconContent
          variant={variant}
          shownIcons={shownIcons}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
      ),
      value: "white",
    },
    {
      children: (
        <IconContent
          variant={variant}
          shownIcons={shownIcons}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
      ),
      value: "icon",
    },
  ];

  return (
    <div>
      <SearchTextbox
        value={searchValue}
        placeholder="search"
        onValueInput={(input) => handleSearch(input.toLowerCase())}
      />
      <Divider />
      <Container space="large" style={{ marginBottom: 40 }}>
        <Tabs
          options={tabOptions}
          value={variant}
          onChange={(e) => handleTabSwitch(e)}
        />
        <VerticalSpace space="large" />
      </Container>
      <div class={styles.footer}>
        <Toggle
          value={asComponent}
          onChange={() => setAsComponent(!asComponent)}
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
