import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";
import { useProfile } from "./context/profile.context";
import { Container, Loader } from "rsuite";


export default function PublicRoute({children, ...Props}) {

  const {profile,isLoading}=useProfile();


  if(isLoading&&!profile){
    return <Container>
      <Loader center vertical size="md" content="loading" speed="slow"/>
    </Container>
  }

  if(profile && !isLoading){
    return <Redirect to="/"/>
  }

  return (
    <div>
      <Route {...Props}>{children}</Route>
    </div>
  )
}
