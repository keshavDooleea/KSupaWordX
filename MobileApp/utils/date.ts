export class DateUtil {
  static getFormattedDate(date: Date | number | string): string {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  }

  static getFormattedTime(date: Date | number | string): string {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  }
}
