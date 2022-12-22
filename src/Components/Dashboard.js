import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Card, Col, Row, Button } from 'antd';
import {useNavigate} from 'react-router-dom';

const Dashboard = (props) => {

    const loggedInUser = useSelector(state => state.auth.loggedInUser)
    const events = useSelector((state) => state.event.events)
    const navigate = useNavigate();
    
    const rowStyle = {

    }

    const cardHeaderStyle = {
        backgroundColor: "#b4b8bb",
        marginBottom: "10px"
    }

    const handleEditClick = (event_id) => {
        console.log(event_id);
        navigate('/edit-event/'+event_id)
        props.setSelectedKeys(["add-event"])
    }


    return (
        <>
            <div className="site-card-wrapper">
                <Row gutter={16}>
                {
                    events && events.map((event, i) => {
                        console.log(i, event)
                        if (event.user_id == loggedInUser.id){
                            return (
                                <Col span={8} key={i}>
                                    <Card title={event.name} bordered={false} style={cardHeaderStyle} 
                                    extra={<Button onClick={() => handleEditClick(event.id)}>Edit</Button>}>
                                    <p>{event.name}'s {event.event_type}</p>
                                    <p>{moment(event.event_date).format('DD-MMM-YYYY')}</p>
                                    </Card>
                                </Col>
                            )
                        }
                    })
                }
                </Row>
            </div>
        </>
        
    )
    
  
};
export default Dashboard;