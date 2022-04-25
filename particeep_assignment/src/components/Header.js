import React from 'react';
import HeaderItem from './HeaderItem';
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
    <header className='flex flex-col sm:flex-row m-5 justify-center items-center'>
      <div className='flex flex-grow justify-evenly max-w-2xl'>
        <HeaderItem title='HOME' Icon={HomeIcon} />
        <HeaderItem title='ACCOUNT' Icon={UserIcon} />
        <HeaderItem title='SEARCH' Icon={SearchIcon} />
      </div>
    </header>
  );
}

export default Header;
