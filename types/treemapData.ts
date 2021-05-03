export type TreemapData = {
  name: "category";
  children: {
    name: string;
    children: {
      name: string;
      value: string | number;
    }[];
  }[];
};
