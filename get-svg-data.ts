import fs from "fs";
import fsPromises from "fs/promises";
import { ICryptoIcon } from "./src/types";

const getSVGData = async () => {
  const iconsManifest = JSON.parse(
    fs
      .readFileSync("./node_modules/cryptocurrency-icons/manifest.json")
      .toString()
  );

  async function getPath(i: any) {
    const path = (
      await fsPromises.readFile(
        `./node_modules/cryptocurrency-icons/svg/icon/${i.symbol.toLowerCase()}.svg`
      )
    ).toString();

    const item: ICryptoIcon = {
      ...i,
      path: path,
    };

    return item;
  }

  const arrWithPaths = await Promise.all(
    iconsManifest.map((i: any) => getPath(i))
  );

  fs.writeFile("icon-paths.json", JSON.stringify(arrWithPaths), function(err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });
};

getSVGData();

export default getSVGData;
