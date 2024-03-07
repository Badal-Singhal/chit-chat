import React, { useState } from 'react';
import { auth } from '../../misc/firebase';
import { Alert, Button, Icon, Tag } from 'rsuite';
import firebase from "firebase/app";

export default function ProviderBlock() {
  const [isConnected, setIsConnected] = useState({
    'google.com': auth.currentUser.providerData.some(
      data => data.providerId === 'google.com'
    ),
    'github.com': auth.currentUser.providerData.some(
      data => data.providerId === 'github.com'
    ),
  });

  const updateIsConnected=(providerId,value)=>{
    setIsConnected(p=>{
        return {
            ...p,
            [providerId]:value
        }
    })
  }

  const unlink= async providerId=> {
    try {
        if(auth.currentUser.providerData.length === 1){
            throw new Error(`You can not disconnect from ${providerId}`);
        }

        await auth.currentUser.unlink(providerId);
        updateIsConnected(providerId,false);
        Alert.info(`Disconnected from ${providerId}`,4000);
        
    } catch (err) {
        Alert.error(err.message,4000);
    }
  }

  const unLinkGoogle=()=>{
    unlink('google.com');
  };
  const unLinkGitHub=()=>{
    unlink('github.com');
  };

  const link= async (provider)=>{

    try {
       await auth.currentUser.linkWithPopup(provider); 
       Alert.info(`connected successfully with ${provider.providerId}`);
       updateIsConnected(provider.providerId,true);
    } catch (err) {
        Alert.error(err.message,4000);
    }
  }
  const linkGoogle=()=>{

    link( new firebase.auth.GoogleAuthProvider()); 
  };
  const linkGitHub=()=>{
    link( new firebase.auth.GithubAuthProvider()); 
  };

  return (
    <div>
      {isConnected['google.com'] && (
        <Tag color="green" closable onClose={unLinkGoogle}>
          <Icon icon={'google'} /> Connected
        </Tag>
      )}

      {isConnected['github.com'] && (
        <Tag color="cyan" closable onClose={unLinkGitHub}>
          <Icon icon={'github'} /> Connected
        </Tag>
      )}

      <div className="mt-2">
        {!isConnected['google.com'] && (
          <Button block color="green" onClick={linkGoogle}>
            <Icon icon={'google'} /> Link to Google
          </Button>
        )}
        {!isConnected['github.com'] && (
          <Button block color="cyan" onClick={linkGitHub}>
            <Icon icon={'github'} /> Link to Github
          </Button>
        )}
      </div>
    </div>
  );
}
