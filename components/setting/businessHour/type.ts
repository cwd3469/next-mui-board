export interface WeekendDto {
  openTime: string;
  closeTime: string;
  hasOperation: boolean;
}
export interface WeekDataBundle {
  [key: string]: WeekendDto;
  mon: WeekendDto;
  tue: WeekendDto;
  wed: WeekendDto;
  thu: WeekendDto;
  fri: WeekendDto;
  set: WeekendDto;
  sun: WeekendDto;
  holiday: WeekendDto;
}
