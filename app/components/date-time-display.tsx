interface DateTimeDisplayProps {
  value: Date;
}

export function DateTimeDisplay({ value }: DateTimeDisplayProps) {
  return (
    <time dateTime={value.toISOString()}>
      {value.toLocaleDateString('en-US', { dateStyle: 'short' })}{' '}
      {value.toLocaleTimeString('en-US', { timeStyle: 'short' })}
    </time>
  );
}
