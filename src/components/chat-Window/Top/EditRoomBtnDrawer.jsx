import React, { memo } from 'react';
import { Alert, Button, Drawer } from 'rsuite';
import { useMediaQuery, useModalState } from '../../../misc/Custom-hooks';
import EditableInputs from '../../Dashboard/EditableInputs';
import { useCurrentRoom } from '../../context/CurrentRoom.context';
import { database } from '../../../misc/firebase';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

const EditRoomBtnDrawer = () => {
  const { isOpen, open, close } = useModalState();
  const {chatId}=useParams();
  const name = useCurrentRoom(v => v.name);
  const description = useCurrentRoom(v => v.description);
  const isMobile=useMediaQuery('(max-width: 992px)');

  const updateData=(key,value)=>{
    database.ref(`rooms/${chatId}`).child(key).set(value).then(()=>{
      Alert.success('successfully updated',4000)
    }).catch(err=>{
      Alert.error(err.message,4000);
    })
  }

  const onNameSave = (newName) => {
      updateData('name',newName)
  };
  const onDescSave = (newDesc) => {
    updateData('description',newDesc)
  };

  return (
    <div>
      <Button className="br-circle" size="sm" color="red" onClick={open}>
        A
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="right">
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <EditableInputs
            initialValue={name}
            onSave={onNameSave}
            label={<h6 className="mb-2">Name</h6>}
            emptyMsg="Name can not be empty"
          />
          <EditableInputs
            componentClass="textarea"
            row={5}
            initialValue={description}
            onSave={onDescSave}
            label={<h6 className="mb-2 mt-2">Description</h6>}
            emptyMsg="Description can not be empty"
          />
        </Drawer.Body>
        <Drawer.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default memo(EditRoomBtnDrawer);
