const {
  CardNumberField,
  TextField,
  CardSecurityCodeField,
  CardExpirationDateField,
  useForterCollect,
  ForterCollect,
  ErrorMessage,
} = window.collectReact;

const { useCallback } = window.React;
const ReactAppFromCDN = () => {
  const forterCollect = useForterCollect();
  const submitForm = useCallback(async () => {
    if (!forterCollect) {
      return;
    }

    const results = await forterCollect.submit();
    console.log('payment form submitted successfully!', results);
  }, []);

  return (
    <div>
      <form onSubmit={submitForm}>
        <label>
          Card
          <CardNumberField
            name="card-number"
            onReady={() => {
              console.log('field is ready');
            }}
            onBlur={() => {
              console.log('field blur');
            }}
            onFocus={() => {
              console.log('field focused');
            }}
          />
        </label>
        <ErrorMessage name="card-number" />
        <label>
          CVC
          <CardSecurityCodeField name="card-cvc" style={{ display: 'inline-box' }} />
        </label>
        <ErrorMessage name="card-cvc" />
        <label>
          Expiration date
          <CardExpirationDateField name="card-expiration" />
        </label>
        <ErrorMessage name="card-expiration" />
        <button
          disabled={!forterCollect.isReady || forterCollect.isSubmitting}
          isLoading={forterCollect.isSubmitting}>
          Pay
        </button>{' '}
      </form>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ReactAppFromCDN />);
