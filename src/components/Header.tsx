'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const Header = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
  
 <header
  className="sticky top-0  z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg h-[75px] "
>
  <div className="max-w mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          DevMeet
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/features" className="text-sm hover:text-blue-200 transition-colors">
            Features
          </Link>
          <Link href="/community" className="text-sm hover:text-blue-200 transition-colors">
            Community
          </Link>
          <Link href="/events" className="text-sm hover:text-blue-200 transition-colors">
          Dashboard
          </Link>
        </nav>

        {/* Auth and Profile Section */}
        <div className="flex items-center gap-4">
          {session ? (
            <div className="relative">
              <button
                className="flex items-center gap-2"
                onClick={toggleUserMenu}
                aria-label="User menu"
              >
                <Image
                  src={session.user?.image || '/default-avatar.png'}
                  alt="Profile picture"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white"
                />
                <span className="hidden md:inline text-sm font-medium">
                  {session.user?.name || session.user?.email}
                </span>
                <ChevronDown size={16} className="hidden md:inline" />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2 z-50">
                  <div className="px-4 py-2 text-sm border-b">
                    <p className="font-medium">{session.user?.name}</p>
                    <p className="text-xs text-gray-500">{session.user?.email}</p>
                  </div>
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      signOut();
                      setIsUserMenuOpen(false);
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Button
               
                className="text-white hover:text-blue-200 hover:bg-blue-700 transition-colors px-8 py-2"
                onClick={() => signIn('github')}
              >
                Sign in
              </Button>
              <Button
             
                className="text-white hover:text-blue-200 hover:bg-blue-700 transition-colors"
                onClick={() => signIn('github')}
              >
                Sign up
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-blue-700 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 py-4">
          <nav className="flex flex-col items-center gap-4">
            <Link
              href="/features"
              className="text-sm hover:text-blue-200 transition-colors"
              onClick={toggleMenu}
            >
              Features
            </Link>
            <Link
              href="/community"
              className="text-sm hover:text-blue-200 transition-colors"
              onClick={toggleMenu}
            >
              Community
            </Link>
            <Link
              href="/events"
              className="text-sm hover:text-blue-200 transition-colors"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            {session ? (
              <>
                <div className="flex items-center gap-2">
                  <Image
                    src={session.user?.image || '/default-avatar.png'}
                    alt="Profile picture"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-white"
                  />
                  <span className="text-sm font-medium">
                    {session.user?.name || session.user?.email}
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-blue-600 transition-colors"
                  onClick={() => {
                    signOut();
                    toggleMenu();
                  }}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-white hover:text-blue-200 hover:bg-blue-800 transition-colors"
                  onClick={() => {
                    signIn('github');
                    toggleMenu();
                  }}
                >
                  Sign in
                </Button>
                <Button
                  className="bg-white text-blue-600 hover:bg-blue-100 transition-colors"
                  onClick={() => {
                    signIn('github');
                    toggleMenu();
                  }}
                >
                  Sign up
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
