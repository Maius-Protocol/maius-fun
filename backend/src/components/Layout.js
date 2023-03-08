import Image from 'next/image'
import Link from 'next/link'

export const Layout = ({ children }) => {
  return (
    <>
      <nav>
        <div className="row">
          <h2 style={{ fontFamily: 'DM Sans' }}>Maius Fun</h2>
        </div>
        <div className="row"></div>
      </nav>
      <main>{children}</main>
    </>
  )
}
