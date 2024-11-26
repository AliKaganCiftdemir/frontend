/* eslint-disable react/prop-types */
export function Input(props) {
  const { id, label, error, onChange, type } = props;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        onChange={onChange}
        className={error ? "form-control is-invalid" : "form-control"}
        type={type}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
}
