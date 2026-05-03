import { useState } from 'react'
import schema from '../data/surveySchema.json'
import QuestionField from './QuestionField'
import { submitSurvey } from '../api/submitSurvey'

function buildInitialState() {
  const state = {}
  for (const q of schema.questions) {
    state[q.id] = q.type === 'multi_select' ? [] : ''
  }
  return state
}

export default function SurveyForm({ onComplete }) {
  const [answers, setAnswers] = useState(buildInitialState)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(id, value) {
    setAnswers((prev) => ({ ...prev, [id]: value }))
    if (error) setError(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const unanswered = schema.questions
      .filter((q) => q.required)
      .filter((q) => {
        const val = answers[q.id]
        return q.type === 'multi_select' ? val.length === 0 : !val
      })

    if (unanswered.length > 0) {
      setError(`Please answer all required questions before submitting.`)
      return
    }

    setSubmitting(true)
    setError(null)

    const payload = {}
    for (const [key, val] of Object.entries(answers)) {
      payload[key] = Array.isArray(val) ? val.join(', ') : val
    }
    payload.submitted_at = new Date().toISOString()

    try {
      await submitSurvey(payload)
      onComplete()
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="survey-shell">
      <header className="survey-header">
        <h1>MU Blessingz</h1>
        <p>Help us build the server you actually want to play.</p>
      </header>

      <form className="survey-form" onSubmit={handleSubmit} noValidate>
        {schema.questions.map((q) => (
          <QuestionField
            key={q.id}
            question={q}
            value={answers[q.id]}
            onChange={handleChange}
          />
        ))}

        {error && <div className="error-banner">{error}</div>}

        <button className="btn btn-primary btn-submit" type="submit" disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
