// The intro plays once per browser session. Home reads INTRO_DELAY so its own
// reveal starts as the overlay lifts instead of underneath it.
let played = false
try { played = sessionStorage.getItem('mdl-intro') === '1' } catch { /* storage blocked */ }

export const introAlreadyPlayed = played
export const INTRO_DELAY = played ? 0 : 1.6
export const markIntroPlayed = () => {
  try { sessionStorage.setItem('mdl-intro', '1') } catch { /* storage blocked */ }
}

// Hide the header wordmark from first paint; the intro lands its copy on top of it.
if (!played && typeof document !== 'undefined') {
  document.documentElement.classList.add('intro-active')
}
