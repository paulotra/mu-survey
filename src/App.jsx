import { useState } from 'react'
import SurveyForm from './components/SurveyForm'
import ThankYou from './components/ThankYou'

export default function App() {
  const [done, setDone] = useState(false)
  return done ? <ThankYou /> : <SurveyForm onComplete={() => setDone(true)} />
}
