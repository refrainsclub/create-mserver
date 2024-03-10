export interface VersionInfo {
  build: number;
  hash: string;
}

export type Version = "1.8.8" | "1.12.2" | "1.20.4";

const versionInfo: Record<Version, VersionInfo> = {
  "1.20.4": {
    build: 450,
    hash: "487a871ded3ebadc5dbf6c1f64e7a29013404df707549e5f3042f88cf5e6a295",
  },
  "1.12.2": {
    build: 1620,
    hash: "3a2041807f492dcdc34ebb324a287414946e3e05ec3df6fd03f5b5f7d9afc210",
  },
  "1.8.8": {
    build: 445,
    hash: "7ff6d2cec671ef0d95b3723b5c92890118fb882d73b7f8fa0a2cd31d97c55f86",
  },
} as const;

export function getUrl(version: Version, build: number): string {
  return `https://api.papermc.io/v2/projects/paper/versions/${version}/builds/${build}/downloads/paper-${version}-${build}.jar`;
}

export function getVersionInfo(version: Version): VersionInfo {
  return versionInfo[version];
}
