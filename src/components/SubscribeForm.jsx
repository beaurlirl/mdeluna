import { useState } from 'react'

function SubscribeForm({ tone = 'light', compact = false }) {
  const [state, setState] = useState('idle')
  const dark = tone === 'dark'

  if (state === 'success') {
    return (
      <p className={`font-sans text-sm ${dark ? 'text-paper' : 'text-ink'}`}>
        You're on the list. Watch for the next NYC filing update.
      </p>
    )
  }

  return (
    <form
      className={`flex w-full ${compact ? 'sm:w-auto sm:min-w-[22rem]' : 'max-w-md'}`}
      onSubmit={async (e) => {
        e.preventDefault()
        setState('loading')
        try {
          const email = new FormData(e.target).get('email')
          const res = await fetch('/api/subscribe', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' },
          })
          setState(res.ok ? 'success' : 'error')
        } catch { setState('error') }
      }}
    >
      <label htmlFor="subscribe-email" className="sr-only">Email address</label>
      <input
        id="subscribe-email"
        type="email"
        name="email"
        required
        placeholder={compact ? 'Email for NYC filing updates' : 'Your email'}
        className={`flex-1 min-w-0 px-3 py-1.5 text-sm bg-transparent border focus:outline-none ${
          dark
            ? 'border-paper text-paper placeholder:text-paper/80 focus:border-ink'
            : 'border-ink text-ink placeholder:text-ink-4'
        }`}
      />
      <button
        type="submit"
        disabled={state === 'loading'}
        className={`px-4 py-1.5 text-sm font-medium transition-colors duration-150 disabled:opacity-60 ${
          dark ? 'bg-paper text-ink hover:bg-ink hover:text-paper' : 'bg-ink text-paper hover:bg-red'
        }`}
      >
        {state === 'loading' ? 'Sending…' : 'Subscribe'}
      </button>
      {state === 'error' && (
        <span role="alert" className="sr-only">Something went wrong. Please try again.</span>
      )}
    </form>
  )
}

export default SubscribeForm
