export default interface IInput {
  id (): string
  loadJson (filename: string): Promise<any>
}
