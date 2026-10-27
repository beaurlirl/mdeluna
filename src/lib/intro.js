// The intro plays once per browser session. Home reads INTRO_DELAY so its own
// reveal starts as the overlay lifts instead of underneath it.
let played = false
try { played = sessionStorage.getItem('mdl-intro') === '1' } catch { /* storage blocked */ }

export const introAlreadyPlayed = played
export const INTRO_DELAY = played ? 0 : 1.1
export const markIntroPlayed = () => {
  try { sessionStorage.setItem('mdl-intro', '1') } catch { /* storage blocked */ }
}
