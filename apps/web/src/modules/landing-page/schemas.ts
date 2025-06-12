export type LatestUser = {
  imageUrl: string;
  firstName: string;
};

export type LatestUsersResponse = {
  data: {
    total: number;
    users: LatestUser[];
  };
};