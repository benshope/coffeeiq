export interface IGroup {
  $key?: string;
  createdAt: number;
  name: string;
  location: string;
  memberIds: string[];
}

export interface Group {
  id: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishDate: string;
    description: string;
    averageRating: number;
    ratingsCount: number;
    imageLinks: {
      thumbnail: string;
      smallThumbnail: string;
    };
  };
}
