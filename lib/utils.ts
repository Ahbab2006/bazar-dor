// সংখ্যা বাংলায় রূপান্তর
export const toBengali = (num: number | string) => {
  const bn = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => bn[+d]);
};

// একক বাংলায় রূপান্তর
export const formatUnit = (unit: string) => {
  switch (unit?.toLowerCase()) {
    case 'kg':
      return 'প্রতি কেজি';
    case 'liter':
    case 'litre':
      return 'প্রতি লিটার';
    case 'dozen':
      return 'প্রতি ডজন';
    case 'pc':
    case 'piece':
      return 'প্রতি পিস';
    default:
      return unit ? `প্রতি ${unit}` : 'প্রতি কেজি';
  }
};