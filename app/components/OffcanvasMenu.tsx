"use client";

import Link from "next/link";

export function OffcanvasMenu() {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="offcanvas"
      aria-labelledby="offcanvasLabel"
      data-bs-scroll="true"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasLabel">
          Menu
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>

      <div className="offcanvas-body">
        <nav className="navbar-nav">
          <Link href="/" className="nav-link" data-bs-dismiss="offcanvas">
            Home
          </Link>
          <Link href="/about" className="nav-link" data-bs-dismiss="offcanvas">
            About
          </Link>
          <Link href="/project" className="nav-link" data-bs-dismiss="offcanvas">
            Project
          </Link>
          <Link
            href="/project-details"
            className="nav-link"
            data-bs-dismiss="offcanvas"
          >
            Project Details
          </Link>
          <Link href="/blog" className="nav-link" data-bs-dismiss="offcanvas">
            Blog
          </Link>
          <Link
            href="/blog-details"
            className="nav-link"
            data-bs-dismiss="offcanvas"
          >
            Blog Details
          </Link>
          <Link href="/contact" className="nav-link" data-bs-dismiss="offcanvas">
            Contact
          </Link>
        </nav>
      </div>
    </div>
  );
}
