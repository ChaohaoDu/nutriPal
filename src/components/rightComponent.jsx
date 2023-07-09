import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import MealEntry from "./mealEntry";
import ChatBox from "./chatBox";
import {MEAL_CATEGORY} from "../constants/mealCategory";


const MealNav = ({activeButton, setActiveButton}) => {
    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
        console.log(buttonName);
    };

    return (
        <ButtonGroup>
            {Object.values(MEAL_CATEGORY).map((buttonName) => (
                <Button
                    key={buttonName}
                    variant={activeButton === buttonName ? 'primary' : 'secondary'}
                    onClick={() => handleClick(buttonName)}
                >
                    {buttonName}
                </Button>
            ))}

        </ButtonGroup>
    );
}

const RightComponent = () => {
    const [activeButton, setActiveButton] = useState(MEAL_CATEGORY.WHOLE_DAY);

    return (
        <Container className="vh-100 d-flex flex-column" style={{ backgroundColor: '#ffc107' }}>
            <Row className="flex-grow-1">
                <Col>
                    <MealNav activeButton={activeButton} setActiveButton={setActiveButton}/>
                    <MealEntry mealName="Chow Mein" grams={100} onDelete={() => console.log('delete')} onEdit={() => console.log('onEdit')} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <ChatBox />
                </Col>
            </Row>
        </Container>

    );
};

export default RightComponent;
