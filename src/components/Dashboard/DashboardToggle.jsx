
import { Alert, Button, Drawer, Icon } from 'rsuite'
import { useMediaQuery, useModalState } from '../../misc/Custom-hooks'
import Dashboard from '.';
import { useCallback } from 'react';
import { auth } from '../../misc/firebase';

export default function DashboardToggle() {

    const {isOpen,open,close}=useModalState();
    const isMobile=useMediaQuery('(max-width: 992px)');

    const onSignOut=useCallback(()=>{

      auth.signOut();
      Alert.info('Signed out',4000);

      close();
    },[close])

  return (
    <>
      <Button block color='blue' onClick={open}>
        <Icon icon='dashboard'/>Dashboard
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement='left'>
            <Dashboard onSignOut={onSignOut}/>
      </Drawer>
    </>
  )
}
