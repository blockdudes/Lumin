export type Chapter = {
  title: string;
  description: string;
  files: File[];
  content: string;
};

export type Course = {
  title: string;
  description: string;
  chapters: Chapter[];
};