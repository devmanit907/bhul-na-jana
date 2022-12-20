import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Card, Col, Row } from 'antd';
const Dashboard = () => {

    const loggedInUser = useSelector(state => state.auth.loggedInUser)
    const events = useSelector((state) => state.event.events)

    const rowStyle = {

    }

    const cardHeaderStyle = {
        backgroundColor: "#b4b8bb",
        marginBottom: "10px"
    }

    return (
        <>
            <div className="site-card-wrapper">
                <Row gutter={16}>
                {
                    events.map((event, i) => {
                        console.log(i, event)
                        if (event.user_id == loggedInUser.id){
                            return (
                                <Col span={8} key={i}>
                                    <Card title={event.name} bordered={false} style={cardHeaderStyle}>
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