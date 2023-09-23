export interface DBBaseItem {
  id: number
  createdAt: Date
  updatedAt: Date
}

export enum QueryStatus {
  resting = 'resting',
  pending = 'pending',
  success = 'success',
  error = 'error'
}
