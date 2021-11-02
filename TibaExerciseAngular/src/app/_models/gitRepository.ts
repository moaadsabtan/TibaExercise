export class GitRepository {
  id!: number;
  name!: string;
}
export class SearchRepositoriesList {
  gitRepository!: GitRepository[];
  FavoritesRepository!: GitRepository[];
}

