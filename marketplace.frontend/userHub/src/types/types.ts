export type Chapter = {
    title: string;
    description: string;
    files: File[];
    content: string;
  };
  
  export type Course = {
    id: string;
    title: string;
    description: string;
    img: string;
    chapters: Chapter[];
  };