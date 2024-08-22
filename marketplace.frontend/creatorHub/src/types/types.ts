export type Chapter = {
  title: string;
  description: string;
  file: File | null;
  content: string;
};

export type Course = {
  title: string;
  description: string;
  chapters: Chapter[];
};
