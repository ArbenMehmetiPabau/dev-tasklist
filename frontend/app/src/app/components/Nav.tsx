// Frontend/app/src/app/components/Nav.tsx
import Link from 'next/link';
import React from 'react';

const Nav: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/new-booking">New Booking</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;