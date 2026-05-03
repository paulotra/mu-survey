const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxf_F-aKnXnCT4_Q0g8vbO4zhQQFlm4U0Ks236H3TaokH-UxpvlwPKkbeo5k3ugFacDow/exec'

export async function submitSurvey(payload) {
  await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}
