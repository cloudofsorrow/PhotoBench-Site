export type Score = {
    model: string;
    [metric: string]: number | string;
  };
  
  export type CategoryData = {
    cn: Score[];
    en: Score[];
  };
  
  export type LeaderboardData = {
    embedding: CategoryData;
    caption: CategoryData;
    agent: CategoryData;
  };
  
  export const metrics = ["R@1", "R@5", "R@10", "R@20", "N@1", "N@5", "N@10", "N@20"];
  