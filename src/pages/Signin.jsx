import { Alert, Button, Col, Container, Grid, Icon, Panel, Row } from 'rsuite';
import { auth, database } from '../misc/firebase';
import firebase from "firebase/app";


export default function Signin() {

  const signInWithProvider= async (provider)=>{
    
    try {
      const {additionalUserInfo,user}= await auth.signInWithPopup(provider);
      if(additionalUserInfo.isNewUser){
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      Alert.success('Signed in',4000);
      
    } catch (err) {

      Alert.error(err.message,4000);
    }
  }

  const onGoogleSignin=()=>{
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
    
  }
  const onGitHubSignin=()=>{
    signInWithProvider(new firebase.auth.GithubAuthProvider());
    
  }
  return (
    <Container>
      <Grid className='mt-page'>
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welocome to chat</h2>
                <p>Progressive chat platform</p>
              </div>
              <div className="mt-3">
                <Button
                onClick={onGoogleSignin}
                  color="green" block> 
                  <Icon icon="google"/>   Continue With Google
                </Button>
                <Button
                onClick={onGitHubSignin}
                  color="cyan" block> 
                  <Icon icon="github"/>   Continue With Github
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
}
