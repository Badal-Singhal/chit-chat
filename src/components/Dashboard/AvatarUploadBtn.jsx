import { Alert, Button, Modal } from 'rsuite';
import ModalBody from 'rsuite/lib/Modal/ModalBody';
import AvatarEditor from 'react-avatar-editor';
import { useModalState } from '../../misc/Custom-hooks';
import { useRef, useState } from 'react';
import { database, storage } from '../../misc/firebase';
import { useProfile } from '../context/profile.context';
import ProfileAvatar from './ProfileAvatar';
import { getUserUpdate } from '../../misc/Helper';

export default function AvatarUploadBtn() {
  const avatarInputType = ' .png, .jpeg, .jpg';

  const { isOpen, open, close } = useModalState();

  const acceptedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
  const isvalidFile = file => acceptedFileTypes.includes(file.type);

  const getBlob=(canvas)=>{
      return new Promise((resolve,reject)=>{
        canvas.toBlob(blob=>{
          if(blob){
            resolve(blob);
          }else{
            reject(new Error('File processed error'));
          }
        })
      })
  }

  const [img, setImg] = useState(null);
  const avatarEditorRef = useRef();
  const {profile}=useProfile();
  const [isLoading,setIsLoading]=useState(false);

  const onFileInputChange = ev => {
    const currFiles = ev.target.files;
    if (currFiles.length === 1) {
      const file = currFiles[0];

      if (isvalidFile(file)) {
        setImg(file);
        open();
      } else {
        Alert.warning(`wrong file type ${file.type}`, 4000);
      }
    }
  };

  const onUploadClick=async ()=>{
      const canvas=avatarEditorRef.current.getImageScaledToCanvas();
      setIsLoading(true);
      
      try {
        const blob=await getBlob(canvas);
        const avatarRef=storage.ref(`/profiles/${profile.uid}`).child('avatar');
        const uploadAvatarResult= await avatarRef.put(blob,{
          cacheControl:`public,mqax-age=${3600*24*3}`
        });
        const downloadUrl= await uploadAvatarResult.ref.getDownloadURL();

        const updates = await getUserUpdate(
          profile.uid,
          'avatar',
          downloadUrl,
          database
        );
        database.ref().update(updates);

        // const userAvatarRef = database.ref(`/profiles/${profile.uid}`).child('avatar');
        // userAvatarRef.set(downloadUrl);
        setIsLoading(false);
        Alert.info('Avatar has been uploaded',4000);
        close();
        

      } catch (err) {
        Alert.error(err.message,4000);
        setIsLoading(false);
        
      }
  }

  return (
    <div className="mt-3 text-center">
      <ProfileAvatar className="width-200 height-200 img-fullsize font-huge" src={profile.avatar} name={profile.name}/>
      <div>
        <label
          className="d-block cursor-pointer padded"
          htmlFor="avatar-upload"
        >
          Select new Avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={avatarInputType}
            onChange={onFileInputChange}
          />
        </label> 

        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and upload new Avatar</Modal.Title>
          </Modal.Header>
          <ModalBody>
            <div className="d-flex justify-content-center align-items-center h-100">
              {img && (
                <AvatarEditor
                ref={avatarEditorRef}
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </ModalBody>
          <Modal.Footer>
            <Button block appearance="ghost" onClick={onUploadClick} disabled={isLoading}>
              Upload New Avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
