const withErrorHandling = WrappedComponent => ({
  showError,
  children,
  message
}) => {
  return (
    <WrappedComponent>
      <style jsx>{`
        background-color: #ff7272;
        color: white;
        padding: 1em;
        z-index: 1;
      `}</style>
      {showError && <div className="error-message">{message}</div>}
      {children}
    </WrappedComponent>
  );
};

const DivWithErrorHandling = withErrorHandling(({ children }) => (
  <div>{children}</div>
));

export default DivWithErrorHandling;
