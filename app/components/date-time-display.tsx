interface DateTimeDisplayProps {
  value: Date;
  dateStyle?: 'full' | 'long' | 'medium' | 'short';
}

export function DateTimeDisplay({ dateStyle = 'short', value }: DateTimeDisplayProps) {
  return <time dateTime={value.toISOString()}>{value.toLocaleDateString('en-US', { dateStyle })}</time>;
}
