export type AboutUsContent = {
  _id: string;
  img: string;
  title: string;
  titleFr: string;
  titleAr: string;
  text: string;
  textFr: string;
  textAr: string;
};

export type AboutUsInfo = {
  _id?: string;

  content: AboutUsContent[];
};
