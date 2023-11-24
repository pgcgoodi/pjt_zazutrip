import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import menuIcon from './assets/menu.png'; 
import logo from './assets/zazulogo.png';
import Drawer from '@mui/material/Drawer';
import Menu from './pages/Menu'; // Menu 컴포넌트를 임포트합니다

function Header() {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenuClick = () => {
    setIsDrawerOpen(true);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className={styles.header_t}>
      <img 
        src={menuIcon} 
        alt="메뉴 아이콘" 
        onClick={handleMenuClick} 
        className={styles.menuIcon} 
      />
      <img 
        src={logo} 
        alt="로고" 
        onClick={handleLogoClick} 
        className={styles.logo} 
      />

      <Drawer 
        anchor="right" 
        open={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
      >
        <Menu /> {/* Drawer 내부에서 Menu 컴포넌트를 렌더링합니다 */}
      </Drawer>
    </header>
  );
}

export default Header;
