export class DateUtil {
  static getFormattedDate(date: Date | number | string): string {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  }
}
