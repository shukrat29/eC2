import React from "react";

const Message = ({ variant, children }) => {
  const styles = {
    base: {
      padding: "1rem",
      margin: "1rem 0",
      borderRadius: "5px",
      fontSize: "1rem",
      border: "1px solid",
    },
    variants: {
      info: {
        backgroundColor: "#e7f3fe",
        color: "#3178c6",
        borderColor: "#b3d7ff",
      },
      success: {
        backgroundColor: "#dff0d8",
        color: "#3c763d",
        borderColor: "#d6e9c6",
      },
      danger: {
        backgroundColor: "#f8d7da",
        color: "#721c24",
        borderColor: "#f5c6cb",
      },
      warning: {
        backgroundColor: "#fff3cd",
        color: "#856404",
        borderColor: "#ffeeba",
      },
    },
  };

  const variantStyles = styles.variants[variant] || styles.variants.info;

  return <div style={{ ...styles.base, ...variantStyles }}>{children}</div>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
