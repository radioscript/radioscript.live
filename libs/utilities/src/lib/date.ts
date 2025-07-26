import { parseISO } from 'date-fns';
import { format, formatDistanceToNow } from 'date-fns-jalali';
import { faIR } from 'date-fns-jalali/locale';

export function convertISOToJalali(isoDate: string, dateFormat = 'yyyy MMMM dd') {
  try {
    const date = parseISO(isoDate);
    return format(date, dateFormat);
  } catch (error) {
    console.error('خطا در تبدیل تاریخ:', error);
    return 'تاریخ نامعتبر';
  }
}

export function convertToTimeAgo(date: string | Date) {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return formatDistanceToNow(parsedDate, {
      addSuffix: true,
      locale: faIR,
    });
  } catch (error) {
    console.error('خطا در محاسبه زمان:', error);
    return 'زبان نامعتبر';
  }
}
