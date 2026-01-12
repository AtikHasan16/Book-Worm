import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

const DashFooter = () => {
  return (
    <footer className="bg-bookNavy text-paper pt-16 pb-8 font-dm-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="invert">
              <Logo />
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Your personal sanctuary for discovering, tracking, and falling in
              love with books. Join our community of readers today.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-fraunses text-white text-lg mb-6">Discover</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/browse"
                  className="hover:text-white transition-colors"
                >
                  Browse Books
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-white transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/authors"
                  className="hover:text-white transition-colors"
                >
                  Authors
                </Link>
              </li>
              <li>
                <Link
                  href="/recommendations"
                  className="hover:text-white transition-colors"
                >
                  Recommendations
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-fraunses text-white text-lg mb-6">Community</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/reviews"
                  className="hover:text-white transition-colors"
                >
                  Write a Review
                </Link>
              </li>
              <li>
                <Link
                  href="/discussions"
                  className="hover:text-white transition-colors"
                >
                  Discussions
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials"
                  className="hover:text-white transition-colors"
                >
                  Book Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-fraunses text-white text-lg mb-6">
              Stay Connected
            </h4>
            <div className="flex gap-4 mb-6">
              <a
                href="#"
                className="hover:text-white transition-transform hover:-translate-y-1"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="hover:text-white transition-transform hover:-translate-y-1"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="hover:text-white transition-transform hover:-translate-y-1"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="hover:text-white transition-transform hover:-translate-y-1"
              >
                <Github size={20} />
              </a>
            </div>
            <div className="text-sm">
              <p>Subscribe to our newsletter</p>
              <div className="mt-3 flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/10 border-none rounded-l-lg px-4 py-2 text-white placeholder-white/40 focus:ring-1 focus:ring-shelfWood w-full"
                />
                <button className="bg-shelfWood text-white px-4 py-2 rounded-r-lg hover:bg-shelfWood/90 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs gap-4">
          <p>© {new Date().getFullYear()} BookWorm. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-white transition-colors"
            >
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashFooter;
