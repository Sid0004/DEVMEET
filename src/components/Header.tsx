"use client"

import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown, User, Sun, Moon } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const Header = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const DefaultAvatar = () => (
    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border-2 border-white">
      <User className="w-5 h-5 text-white" />
    </div>
  );

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg h-[75px] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            DevMeet
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          <Link href="/room/create-room" className="text-sm hover:text-blue-200 transition-colors">
            Create Room
          </Link>
          <Link href="/community" className="text-sm hover:text-blue-200 transition-colors">
            Community
          </Link>
          <Link href="/dashboard" className="text-sm hover:text-blue-200 transition-colors">
            Dashboard
          </Link>
        </nav>

        {/* Auth, Profile, and Theme Toggle Section */}
        <div className="flex items-center gap-4 flex-shrink-0">
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
                <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-xl shadow-2xl py-4 z-50 border border-gray-100 animate-fade-in">
                  <div className="flex flex-col items-center px-6 pb-4">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="Profile picture"
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-blue-600 mb-2"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-600 mb-2">
                        <User className="w-7 h-7 text-blue-600" />
                      </div>
                    )}
                    <p className="font-semibold text-base text-gray-900">{session.user?.name}</p>
                    <p className="text-xs text-gray-500">{session.user?.email}</p>
                  </div>
                  <div className="border-t border-gray-200 my-2" />
                  <button
                    className="w-full text-left px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors rounded-b-xl"
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
                <Button className="text-white hover:text-blue-200 hover:bg-blue-700 transition-colors w-20 h-9">
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="text-white hover:text-blue-200 hover:bg-blue-700 transition-colors w-20 h-9">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-white hover:text-blue-200 hover:bg-blue-700 w-9 h-9 px-[10px]"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-blue-700 transition-colors w-9 h-9"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 py-4 absolute top-[75px] left-0 right-0 z-50">
          <nav className="flex flex-col gap-4 px-4">
            <Link href="/room/create-room" className="text-sm hover:text-blue-200 transition-colors" onClick={toggleMenu}>
              Create Room
            </Link>
            <Link href="/community" className="text-sm hover:text-blue-200 transition-colors" onClick={toggleMenu}>
              Community
            </Link>
            <Link href="/dashboard" className="text-sm hover:text-blue-200 transition-colors" onClick={toggleMenu}>
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