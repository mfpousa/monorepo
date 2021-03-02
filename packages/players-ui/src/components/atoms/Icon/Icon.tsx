import React, { Suspense } from "react";
import classnames from "classnames";

const FallbackIcon = require("./svg/fallback.svg").default;

const Icon = ({ children: name, size = 2, ...otherProps }) => {
  const iconProps = {
    ...otherProps,
    className: classnames("Icon", otherProps.className),
    style: { width: convertRemToPixels(size), ...otherProps.style },
  };
  const IconAsync = React.useCallback(
    React.lazy(() =>
      import(`./svg/icon-${name}.svg`).catch(() =>
        console.warn(
          `Icon "${name}" could not be found. Please create the file "atoms/Icon/svg/icon-${name}.svg" or check for typos in the name`
        )
      )
    ),
    [name]
  );
  return (
    <Suspense fallback={<FallbackIcon {...iconProps} />}>
      <IconAsync {...iconProps} />
    </Suspense>
  );
};

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export default Icon;
