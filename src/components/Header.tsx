'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-[#b185db] text-white h-16 md:h-20 lg:h-21 px-6 py-3   shadow-sm ">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          {/* <Image
            src="/DEVMEET.png"
            alt="DevMeet Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
            priority
          /> */}
          <span className="text-lg font-semibold">DevMeet</span>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Link href="/signin">
            <Button variant="ghost" className="text-white hover:bg-gray-800">
              Sign in
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-white text-black hover:bg-gray-200">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
