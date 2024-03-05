import { Col, Grid, Row } from "rsuite";
import Sidebar from "../components/Sidebar";


export default function Home() {
  return (
    <Grid fluid className='h-100'>
    <Row>
      <Col xs={24} md={8}>
        <Sidebar/>
      </Col>
    </Row>

    </Grid>
  )
}
