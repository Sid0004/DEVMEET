'use client';

import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown, User, Code2, Users, Calendar, Rocket } from 'lucide-react';
import Image from 'next/image';

const Header = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const DefaultAvatar = () => (
    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border-2 border-white">
      <User className="w-5 h-5 text-white" />
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg h-[75px]">
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
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile picture"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-white"
                  />
                ) : (
                  <DefaultAvatar />
                )}
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
              <Link href="/sign-in">
                <Button className="text-white hover:text-blue-200 hover:bg-blue-700 transition-colors px-8 py-2">
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="text-white hover:text-blue-200 hover:bg-blue-700 transition-colors">
                  Sign up
                </Button>
              </Link>
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
            <Link href="/features" className="text-sm hover:text-blue-200 transition-colors" onClick={toggleMenu}>
              Features
            </Link>
            <Link href="/community" className="text-sm hover:text-blue-200 transition-colors" onClick={toggleMenu}>
              Community
            </Link>
            <Link href="/events" className="text-sm hover:text-blue-200 transition-colors" onClick={toggleMenu}>
              Dashboard
            </Link>
            {session ? (
              <>
                <div className="flex items-center gap-2">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile picture"
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-white"
                    />
                  ) : (
                    <DefaultAvatar />
                  )}
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
                <Link href="/sign-in" onClick={toggleMenu}>
                  <Button
                    variant="ghost"
                    className="text-white hover:text-blue-200 hover:bg-blue-800 transition-colors w-full"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href="/sign-up" onClick={toggleMenu}>
                  <Button
                    className="bg-white text-blue-600 hover:bg-blue-100 transition-colors w-full"
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
