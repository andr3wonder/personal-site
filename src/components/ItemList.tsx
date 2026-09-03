import { Fragment } from 'react';

/**
 * Renders a reading-list category. Each title is bound as one unit so a single
 * work never splits across two lines and reads as two separate entries
 * ("Startup / of You"), and the separator travels with the item before it so a
 * line can never begin with an interpunct.
 */
export function ItemList({
  items,
  className = '',
  separatorClassName = '',
}: {
  items: string[];
  className?: string;
  separatorClassName?: string;
}) {
  return (
    <span className={className}>
      {items.map((item, i) => (
        <Fragment key={item}>
          <span className="inline-block">
            {item}
            {i < items.length - 1 && (
              <span aria-hidden className={separatorClassName}>
                {' ·'}
              </span>
            )}
          </span>
          {i < items.length - 1 && ' '}
        </Fragment>
      ))}
    </span>
  );
}
