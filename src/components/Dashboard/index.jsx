import { Alert, Avatar, Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../context/profile.context';
import EditableInputs from './EditableInputs';
import { database } from '../../misc/firebase';
import ProviderBlock from './ProviderBlock';
import AvatarUploadBtn from './AvatarUploadBtn';
import { getUserUpdate } from '../../misc/Helper';

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();

  const onSave = async newData => {
    // const userNickNameRef=database.ref(`/profiles/${profile.uid}`).child('name');

    try {
      // await userNickNameRef.set(newData);

      const updates = await getUserUpdate(
        profile.uid,
        'name',
        newData,
        database
      );
      database.ref().update(updates);
      Alert.success('Nickname has been updated', 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <ProviderBlock />
        <Divider />
        <EditableInputs
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
        <AvatarUploadBtn />
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          Sign out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
