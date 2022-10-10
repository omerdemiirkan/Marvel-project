export class DeleteComment {
  static readonly type = '[Main Page] DeleteComment';
  constructor(public readonly prodOfferId: number) { }
}
