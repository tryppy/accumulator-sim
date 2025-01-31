import * as React from 'react';

const Alert = React.forwardRef(({ className, variant = 'default', ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={`rounded-lg border p-4 ${className}`}
    {...props}
  />
));
Alert.displayName = 'Alert';

export { Alert };