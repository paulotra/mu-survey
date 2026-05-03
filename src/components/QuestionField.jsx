export default function QuestionField({ question, value, onChange }) {
  const { id, label, type, options, required, placeholder, hint } = question

  function handleCheckbox(option) {
    const current = Array.isArray(value) ? value : []
    const next = current.includes(option)
      ? current.filter((v) => v !== option)
      : [...current, option]
    onChange(id, next)
  }

  return (
    <div className="question-block">
      <label className="question-label" htmlFor={id}>
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      {hint && <p className="question-hint">{hint}</p>}

      {type === 'select' && (
        <select
          id={id}
          className="field-select"
          value={value || ''}
          onChange={(e) => onChange(id, e.target.value)}
        >
          <option value="" disabled>
            — select one —
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {type === 'multi_select' && (
        <div className="checkbox-grid">
          {options.map((opt) => {
            const checked = Array.isArray(value) && value.includes(opt)
            return (
              <label key={opt} className={`checkbox-option${checked ? ' checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleCheckbox(opt)}
                />
                <span className="checkbox-label">{opt}</span>
              </label>
            )
          })}
        </div>
      )}

      {type === 'email' && (
        <input
          id={id}
          type="email"
          className="field-input"
          value={value || ''}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder={placeholder || ''}
          autoComplete="email"
        />
      )}

      {type === 'text' && (
        <textarea
          id={id}
          className="field-text"
          value={value || ''}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder={placeholder || ''}
          rows={3}
        />
      )}
    </div>
  )
}
