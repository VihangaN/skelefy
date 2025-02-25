import React, {
  Children,
  useLayoutEffect,
  useState,
  isValidElement,
  cloneElement,
} from "react";
import PropTypes from "prop-types";

const traverseChildren = (children, isLoading) => {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    const isVoidElement = ["br", "hr", "input", "img"].includes(
      typeof child.type === "string" ? child.type.toLowerCase() : ""
    );

    if (isVoidElement && child.type !== "img") {
      return child;
    }

    const hasChildElements = Children.toArray(child.props.children).some(
      isValidElement
    );
    const isImage =
      child.type === "img" ||
      (typeof child.type === "string" && child.type.toLowerCase() === "image");
    const shouldApplyLoading = isLoading && !hasChildElements;

    return cloneElement(child, {
      className: `${child.props.className || ""} ${
        shouldApplyLoading
          ? isImage
            ? "skelefy-loading-image"
            : "skelefy-loading"
          : ""
      }`.trim(),
      children: child.props.children
        ? traverseChildren(child.props.children, isLoading)
        : child.props.children,
    });
  });
};

const Placeholder = ({ children, isLoading, animationConfig = {} }) => {
  const [processedChildren, setProcessedChildren] = useState(children);
  const defaultConfig = {
    speed: "1.5s",
    timing: "linear",
    colors: ["#e0e0e0", "#f0f0f0", "#e0e0e0"],
  };

  const config = { ...defaultConfig, ...animationConfig };

  useLayoutEffect(() => {
    setProcessedChildren(traverseChildren(children, isLoading));
  }, [children, isLoading]);

  const animationStyles = `
    .skelefy-loading {
      background: linear-gradient(
        90deg,
        ${config.colors[0]} 25%,
        ${config.colors[1]} 50%,
        ${config.colors[2]} 75%
      );
      background-size: 200% 100%;
      animation: shimmer ${config.speed} infinite ${config.timing};
      color: transparent;
      user-select: none;
      pointer-events: none;
    }

    .skelefy-loading-image {
      background: linear-gradient(
        90deg,
        ${config.colors[0]} 25%,
        ${config.colors[1]} 50%,
        ${config.colors[2]} 75%
      );
      background-size: 200% 100%;
      animation: shimmer ${config.speed} infinite ${config.timing};
      object-fit: cover;
      content-visibility: hidden;
      user-select: none;
      pointer-events: none;
    }

    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      {processedChildren}
    </>
  );
};

Placeholder.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool.isRequired,
  animationConfig: PropTypes.shape({
    speed: PropTypes.string,
    timing: PropTypes.oneOf([
      "linear",
      "ease",
      "ease-in",
      "ease-out",
      "ease-in-out",
      "step-start",
      "step-end",
      "steps(1,start)",
      "steps(1,end)",
      "cubic-bezier",
    ]),
    colors: PropTypes.arrayOf(PropTypes.string),
  }),
};

Placeholder.defaultProps = {
  animationConfig: {
    speed: "1.5s",
    timing: "linear",
    colors: ["#e0e0e0", "#f0f0f0", "#e0e0e0"],
  },
};

export default Placeholder;