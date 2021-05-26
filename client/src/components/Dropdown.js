import React from 'react';
import {Button,Menu,MenuItem} from '@material-ui/core';

export default function SimpleMenu({buttonText,menus}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * 
   * buttonText : 메뉴 리스트 펼침 트리거
   * menus : [ 
   *            { id : unique형태의 id , menuName : menu 내부에 들어갈 텍스트 , onClickMenu : () => {} 형태의 클릭기 콜백 함수 }
   *         ]
   */
  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {buttonText}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >{menus.map(x => <MenuItem onClick={x.onClickMenu} key={x.id}>{x.menuName}</MenuItem>)}
      </Menu>
    </div>
  );
}
