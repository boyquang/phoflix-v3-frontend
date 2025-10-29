interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}

type ColorName =
  | "Default"
  | "AquaWave"
  | "LavenderDream"
  | "RoseCine"
  | "Emerald"
  | "CobaltCine";

type ColorSystemConfig = {
  name: ColorName;
  color: string;
  label: string;
};

interface Tooltip {
  top: number;
  left: number;
  width: number;
  height: number;
  visible: boolean;
}
