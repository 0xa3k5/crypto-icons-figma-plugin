import fs from "fs";
import fsPromises from "fs/promises";
import { ICryptoIcon } from "../types";

const generateSVGPaths = async () => {
  const iconsManifest = JSON.parse(
    fs
      .readFileSync("./node_modules/cryptocurrency-icons/manifest.json")
      .toString()
  );

  const checkAndFixSvgPaths = async (svgPath: string) => {
    if (!svgPath.includes('height="32"') || !svgPath.includes('width="32"')) {
      const replacedPath = svgPath.replace(
        '<svg xmlns="http://www.w3.org/2000/svg"',
        '<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg"'
      );
      return replacedPath;
    } else {
      return svgPath;
    }
  };

  const getPath = async (i: any) => {
    const asBlack = await checkAndFixSvgPaths(
      (
        await fsPromises.readFile(
          `./node_modules/cryptocurrency-icons/svg/black/${i.symbol.toLowerCase()}.svg`
        )
      ).toString()
    );

    const asColor = await checkAndFixSvgPaths(
      (
        await fsPromises.readFile(
          `./node_modules/cryptocurrency-icons/svg/color/${i.symbol.toLowerCase()}.svg`
        )
      ).toString()
    );

    const asIcon = await checkAndFixSvgPaths(
      (
        await fsPromises.readFile(
          `./node_modules/cryptocurrency-icons/svg/icon/${i.symbol.toLowerCase()}.svg`
        )
      ).toString()
    );

    const asWhite = await checkAndFixSvgPaths(
      (
        await fsPromises.readFile(
          `./node_modules/cryptocurrency-icons/svg/white/${i.symbol.toLowerCase()}.svg`
        )
      ).toString()
    );

    const item: ICryptoIcon = {
      ...i,
      path: {
        black: asBlack,
        color: asColor,
        icon: asIcon,
        white: asWhite,
      },
    };

    return item;
  };

  const arrWithPaths = await Promise.all(
    iconsManifest.map((i: any) => getPath(i))
  );

  fs.writeFile("icon-paths.json", JSON.stringify(arrWithPaths), function(err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });
};

generateSVGPaths();
