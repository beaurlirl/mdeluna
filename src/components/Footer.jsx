import { Link } from 'react-router-dom'
import { contact, siteInfo } from '../data/siteContent'

function Footer() {
  return (
    <footer className="bg-paper-2 border-t border-paper-3">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="font-sans text-lg text-ink hover:text-red transition-colors duration-150">
              {siteInfo.name}, Architect
            </Link>
            <p className="mt-4 font-sans text-[0.5625rem] tracking-[0.14em] uppercase text-ink-4 leading-relaxed">
              Architecture · Zoning · Expediting<br />
              New York City · Est. 1994
            </p>
            <p className="mt-6 text-sm text-ink-3 max-w-xs leading-relaxed">
              Full-service architectural practice and DOB expediting across all five boroughs.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-[0.5625rem] tracking-[0.16em] uppercase text-ink-4 mb-5">Navigation</h4>
            <nav className="space-y-2.5">
              {[
                { label: 'Projects', to: '/projects' },
                { label: 'Services', to: '/services' },
                { label: 'About',    to: '/about' },
                { label: 'Contact',  to: '/contact' },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="block text-sm text-ink-3 hover:text-ink transition-colors duration-150">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-[0.5625rem] tracking-[0.16em] uppercase text-ink-4 mb-5">Contact</h4>
            <address className="not-italic space-y-2 text-sm text-ink-3">
              <p>{contact.address.street}</p>
              <p>{contact.address.city}, {contact.address.state} {contact.address.zip}</p>
              <p className="pt-2">
                <a href={`tel:${contact.phone.replace(/\./g, '')}`} className="hover:text-ink transition-colors duration-150">{contact.phone}</a>
                <span className="text-ink-4 mx-1.5">·</span>
                <a href={`tel:${contact.cell.replace(/\./g, '')}`} className="hover:text-ink transition-colors duration-150">{contact.cell}</a>
              </p>
              <p>
                <a href={`mailto:${contact.email}`} className="hover:text-ink transition-colors duration-150">{contact.email}</a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-paper-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="font-sans text-[0.5rem] tracking-[0.14em] uppercase text-ink-4">
            REG. № NYS-A-024891 · LICENSED ARCHITECT, STATE OF NEW YORK
          </p>
          <p className="font-sans text-[0.5rem] tracking-[0.14em] uppercase text-ink-4">
            © {new Date().getFullYear()} {siteInfo.name}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
