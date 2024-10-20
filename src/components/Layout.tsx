import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Hammer } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <Hammer className="h-6 w-6 text-green-600" />
              <span className="hidden font-bold sm:inline-block">
                Irish Tradesmen Directory
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/trades">Trades</Link>
              <Link href="/locations">Locations</Link>
              <Link href="/reviews">Reviews</Link>
              <Link href="/blog">Blog</Link>
            </nav>
          </div>
          <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 py-2 mr-2 px-3 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </button>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search for a tradesman..."
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  />
                </div>
              </form>
            </div>
            <Button className="hidden sm:flex">List Your Trade</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="w-full py-12 md:py-24 lg:py-32 border-t bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <h4 className="text-lg font-bold">About Us</h4>
              <p className="text-sm text-gray-500">
                Irish Tradesmen Directory connects skilled professionals with customers across Ireland.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/advertise">Advertise</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +353 1 234 5678</li>
                <li className="flex items-center"><Mail className="w-4 h-4 mr-2" /> info@irishtradesmendirectory.ie</li>
                <li className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> Dublin, Ireland</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold">Follow Us</h4>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-500 hover:text-gray-600">
                  <Facebook className="w-6 h-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-600">
                  <Twitter className="w-6 h-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-600">
                  <Instagram className="w-6 h-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center text-sm text-gray-500">
            © 2024 Irish Tradesmen Directory. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;