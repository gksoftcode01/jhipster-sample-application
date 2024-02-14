export interface IAppUser {
  id?: number;
  userId?: string | null;
  name?: string | null;
  bdate?: Date | null;
}

export class AppUser implements IAppUser {
  constructor(
    public id?: number,
    public userId?: string | null,
    public name?: string | null,
    public bdate?: Date | null,
  ) {}
}
