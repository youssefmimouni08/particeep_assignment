import React from 'react';
import HeaderItem from './HeaderItem';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import {
  HomeIcon,
  SearchIcon,
  BadgeCheckIcon,
  CollectionIcon,
  LightningBoltIcon,
  UserIcon,
} from '@heroicons/react/outline';
function Header() {
  return (
    <header className='flex flex-col sm:flex-row m-5  items-center'>
      <div className='flex flex-grow justify-evenly max-w-2xl'>
        <HeaderItem title='HOME' Icon={HomeIcon} />
        <HeaderItem title='ACCOUNT' Icon={UserIcon} />
        <HeaderItem title='SEARCH' Icon={SearchIcon} />
      </div>
      <div className=' flex w-full justify-center sm:justify-end'>
        <LazyLoadImage src='logo.png' width={200} />
      </div>
    </header>
  );
}

export default Header;
