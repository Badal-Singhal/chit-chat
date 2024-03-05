
import { Button, Drawer, Icon } from 'rsuite'
import { useModalState } from '../../misc/Custom-hooks'
import Dashboard from '.';

export default function DashboardToggle() {

    const {isOpen,open,close}=useModalState();
  return (
    <>
      <Button block color='blue' onClick={open}>
        <Icon icon='dashboard'/>Dashboard
      </Button>
      <Drawer show={isOpen} onHide={close} placement='left'>
            <Dashboard/>
      </Drawer>
    </>
  )
}
