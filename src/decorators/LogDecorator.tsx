export function log(
  _target: unknown,
  propertyName: string,
  propertyDescriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = propertyDescriptor.value;

  propertyDescriptor.value = function (...args: unknown[]) {
    console.log(`Calling`);

    console.log(`Calling ${propertyName} with args:`, args);
    return originalMethod.apply(this, args);
  };

  return propertyDescriptor;
}
